import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { ConfigProvider, Effect } from 'effect';
import { SMTPServer } from 'smtp-server';
import { Mailer, type Message } from '../application/Mailer';
import {
  smtpLayer,
  configuredRelay,
  type SmtpRelay,
} from '../infrastructure/mail/SmtpMailer';

const USER = 'contribution@dismoi.io';
const PASSWORD = 'key-smtp-de-test';

let server: SMTPServer;
let port: number;
let received: string[];
let acceptedAccounts: string[];

const message: Message = {
  from: 'alice@exemple.fr',
  to: 'contribution@dismoi.io',
  replyTo: 'alice@exemple.fr',
  subject: '[DisMoi] New contribution from Alice',
  html: '<html lang="fr"><body><p>Un prix casse en magasin</p></body></html>',
};

const relay = (override: Partial<SmtpRelay> = {}): SmtpRelay => ({
  host: '127.0.0.1',
  port,
  user: USER,
  password: PASSWORD,
  secure: false,
  requireTls: false,
  ...override,
});

const send = (configuration: SmtpRelay) =>
  Effect.runPromise(
    Effect.gen(function* () {
      yield* (yield* Mailer).send(message);
    }).pipe(Effect.provide(smtpLayer(configuration))),
  );

beforeAll(
  () =>
    new Promise<void>((resolve) => {
      server = new SMTPServer({
        logger: false,
        hideSTARTTLS: true,
        authMethods: ['PLAIN', 'LOGIN'],
        onAuth(authentication, _session, answer) {
          if (
            authentication.username === USER &&
            authentication.password === PASSWORD
          ) {
            acceptedAccounts.push(authentication.username);
            answer(null, { user: authentication.username });
            return;
          }
          answer(new Error('Credentials refused'));
        },
        onData(stream, _session, answer) {
          const chunks: Buffer[] = [];
          stream.on('data', (chunk: Buffer) => chunks.push(chunk));
          stream.on('end', () => {
            received.push(Buffer.concat(chunks).toString('utf8'));
            answer();
          });
        },
      });
      server.listen(0, '127.0.0.1', () => {
        port = (server.server.address() as AddressInfo).port;
        resolve();
      });
    }),
);

afterAll(() => new Promise<void>((resolve) => server.close(() => resolve())));

beforeEach(() => {
  received = [];
  acceptedAccounts = [];
});

describe('delivery to the SMTP relay', () => {
  it('delivers the message with its sender, its recipient and its subject', async () => {
    await send(relay());

    expect(received).toHaveLength(1);
    expect(received[0]).toContain('From: alice@exemple.fr');
    expect(received[0]).toContain('To: contribution@dismoi.io');
    expect(received[0]).toContain(
      'Subject: [DisMoi] New contribution from Alice',
    );
  });

  it('sets a Reply-To on the address of the contributor', async () => {
    await send(relay());

    expect(received[0]).toContain('Reply-To: alice@exemple.fr');
  });

  it('carries the body as text/html', async () => {
    await send(relay());

    expect(received[0]).toContain('Content-Type: text/html');
    expect(received[0]).toContain('Un prix casse en magasin');
  });

  it('authenticates against the relay', async () => {
    await send(relay());

    expect(acceptedAccounts).toEqual([USER]);
  });

  it('returns without failing when the relay refuses the credentials', async () => {
    await send(relay({ password: 'mauvaise-key' }));

    expect(received).toEqual([]);
  });

  it('returns without failing when no relay is listening', async () => {
    await send(relay({ port: 1 }));

    expect(received).toEqual([]);
  });
});

describe('configuration of the relay', () => {
  const read = (variables: Readonly<Record<string, string>>) =>
    Effect.runPromise(
      configuredRelay.pipe(
        Effect.provide(
          ConfigProvider.layer(ConfigProvider.fromEnvRecord(variables)),
        ),
      ),
    );

  it('gives null when no host is declared, so that emails get logged', async () => {
    expect(await read({})).toBeNull();
  });

  it('demands STARTTLS and aims at port 587 by default', async () => {
    expect(
      await read({
        DISMOI_SMTP_HOST: 'smtp-relay.brevo.com',
        DISMOI_SMTP_USER: USER,
        DISMOI_SMTP_PASSWORD: PASSWORD,
      }),
    ).toEqual({
      host: 'smtp-relay.brevo.com',
      port: 587,
      user: USER,
      password: PASSWORD,
      secure: false,
      requireTls: true,
    });
  });

  it('infers implicit TLS from port 465', async () => {
    const configuration = await read({
      DISMOI_SMTP_HOST: 'smtp-relay.brevo.com',
      DISMOI_SMTP_PORT: '465',
      DISMOI_SMTP_USER: USER,
      DISMOI_SMTP_PASSWORD: PASSWORD,
    });

    expect(configuration?.secure).toBe(true);
  });
});
