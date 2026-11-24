import { Config, Effect, Layer, Option, Redacted } from 'effect';
import nodemailer from 'nodemailer';
import { Mailer } from '../../application/Mailer';

export interface SmtpRelay {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly secure: boolean;
  readonly requireTls: boolean;
}

const IMPLICIT_TLS_PORT = 465;

// The send is awaited inside the request that records the contribution:
// without these bounds, the nodemailer defaults would keep it waiting up to
// twelve minutes in front of a silent relay.
const TIMEOUTS = {
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
} as const;

export const configuredRelay = Effect.gen(function* () {
  const host = yield* Config.option(Config.String('DISMOI_SMTP_HOST'));
  if (Option.isNone(host)) return null;

  const port = yield* Config.Port('DISMOI_SMTP_PORT').pipe(
    Config.withDefault(587),
  );

  return {
    host: host.value,
    port,
    user: yield* Config.String('DISMOI_SMTP_USER'),
    password: Redacted.value(yield* Config.Redacted('DISMOI_SMTP_PASSWORD')),
    secure: yield* Config.Boolean('DISMOI_SMTP_SECURE').pipe(
      Config.withDefault(port === IMPLICIT_TLS_PORT),
    ),
    requireTls: yield* Config.Boolean('DISMOI_SMTP_REQUIRE_TLS').pipe(
      Config.withDefault(true),
    ),
  } satisfies SmtpRelay;
});

const service = (relay: SmtpRelay) => {
  const transport = nodemailer.createTransport({
    host: relay.host,
    port: relay.port,
    secure: relay.secure,
    requireTLS: relay.requireTls,
    auth: { user: relay.user, pass: relay.password },
    ...TIMEOUTS,
  });

  return Mailer.of({
    send: (message) =>
      Effect.tryPromise(() =>
        transport.sendMail({
          from: message.from,
          to: message.to,
          replyTo: message.replyTo,
          subject: message.subject,
          html: message.html,
        }),
      ).pipe(
        Effect.tapError((failure) =>
          Effect.logError('Email not handed to the SMTP relay', {
            to: message.to,
            subject: message.subject,
            failure,
          }),
        ),
        Effect.ignore,
      ),
  });
};

export const smtpLayer = (relay: SmtpRelay): Layer.Layer<Mailer> =>
  Layer.effect(
    Mailer,
    Effect.sync(() => service(relay)),
  );

export const MailerLive = Layer.effect(
  Mailer,
  Effect.gen(function* () {
    const relay = yield* configuredRelay;
    if (relay === null) {
      yield* Effect.logWarning(
        'DISMOI_SMTP_HOST absent: emails are logged, not sent',
      );
      return Mailer.log;
    }

    return service(relay);
  }),
);
