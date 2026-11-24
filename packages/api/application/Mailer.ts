import { Context, Effect, Layer } from 'effect';

export interface Message {
  readonly from: string;
  readonly to: string;
  readonly replyTo: string;
  readonly subject: string;
  readonly html: string;
}

export class Mailer extends Context.Service<
  Mailer,
  {
    // A recorded contribution stays recorded even when its notification does
    // not go out: the failure is logged, never propagated to the caller.
    send(message: Message): Effect.Effect<void>;
  }
>()('api/application/Mailer') {
  static readonly log = Mailer.of({
    send: (message) =>
      Effect.logInfo('Email not sent (log implementation)', {
        to: message.to,
        subject: message.subject,
      }),
  });

  static readonly layerLog = Layer.succeed(Mailer, Mailer.log);
}
