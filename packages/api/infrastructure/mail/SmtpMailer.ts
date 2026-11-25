import { Config, Effect, Layer, Option, Redacted } from 'effect';
import nodemailer from 'nodemailer';
import { Mailer } from '../../application/Mailer';
import { relayFromDsn, type SmtpRelay } from '../../domain/MailerDsn';

export type { SmtpRelay };

const IMPLICIT_TLS_PORT = 465;

// The send is awaited inside the request that records the contribution:
// without these bounds, the nodemailer defaults would keep it waiting up to
// twelve minutes in front of a silent relay.
const TIMEOUTS = {
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
} as const;

// The three switches that apply whichever source named the relay.
const withOverrides = (relay: SmtpRelay) =>
  Effect.gen(function* () {
    const port = yield* Config.Port('DISMOI_SMTP_PORT').pipe(
      Config.withDefault(relay.port),
    );

    return {
      ...relay,
      port,
      secure: yield* Config.Boolean('DISMOI_SMTP_SECURE').pipe(
        Config.withDefault(
          port === relay.port ? relay.secure : port === IMPLICIT_TLS_PORT,
        ),
      ),
      requireTls: yield* Config.Boolean('DISMOI_SMTP_REQUIRE_TLS').pipe(
        Config.withDefault(relay.requireTls),
      ),
    } satisfies SmtpRelay;
  });

// Two sources. DISMOI_SMTP_HOST and its companions first, then MAILER_DSN,
// the address Symfony read in config/packages/mailer.yaml: the PHP
// application already carries one, and moving it over as it is beats taking
// it apart into three variables by hand.
export const configuredRelay = Effect.gen(function* () {
  const host = yield* Config.option(Config.String('DISMOI_SMTP_HOST'));

  if (Option.isSome(host)) {
    return yield* withOverrides({
      host: host.value,
      port: 587,
      user: yield* Config.String('DISMOI_SMTP_USER'),
      password: Redacted.value(yield* Config.Redacted('DISMOI_SMTP_PASSWORD')),
      secure: false,
      requireTls: true,
    });
  }

  const dsn = yield* Config.option(Config.Redacted('MAILER_DSN'));
  if (Option.isNone(dsn)) return null;

  const fromDsn = relayFromDsn(Redacted.value(dsn.value));
  if (fromDsn === null) {
    // Named without the address being readable: saying so beats falling
    // back on the log as though nothing had been configured.
    yield* Effect.logWarning(
      'MAILER_DSN names no SMTP relay: emails are logged, not sent',
    );
    return null;
  }

  return yield* withOverrides(fromDsn);
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
        'Neither DISMOI_SMTP_HOST nor MAILER_DSN: emails are logged, not sent',
      );
      return Mailer.log;
    }

    return service(relay);
  }),
);
