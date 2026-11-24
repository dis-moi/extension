import { Config, Context, Effect, Layer, Redacted, Schema } from 'effect';
import { Mac, SecureRandom } from 'effect/crypto';
import { Jwk, Jwt } from 'effect/jose';
import { Administrators, type Administrator } from './Administrators';

// The token only carries the identifier of the account: the roles are read
// back from the database on every request, so that a disabled account is
// disabled at once rather than when its token expires.

const LIFETIME = '12h';

const DEVELOPMENT_SECRET = 'secret-de-developpement-a-remplacer';

const Claims = Schema.Struct({
  sub: Schema.String,
});

export class AdminSession extends Context.Service<
  AdminSession,
  {
    open(administrator: Administrator): Effect.Effect<string>;

    // A token that is absent, expired, badly signed or points at a vanished
    // account all give null: as far as the caller is concerned, nobody is
    // signed in.
    read(token: string | undefined): Effect.Effect<Administrator | null>;
  }
>()('api/application/AdminSession') {
  static readonly layer = Layer.effect(
    AdminSession,
    Effect.gen(function* () {
      const administrators = yield* Administrators;

      const secret = yield* Config.Redacted('DISMOI_ADMIN_SECRET').pipe(
        Config.withDefault(Redacted.make(DEVELOPMENT_SECRET)),
      );
      const environment = yield* Config.String('NODE_ENV').pipe(
        Config.withDefault('development'),
      );

      if (
        environment === 'production' &&
        Redacted.value(secret) === DEVELOPMENT_SECRET
      ) {
        return yield* Effect.die(
          new Error(
            'DISMOI_ADMIN_SECRET must be set in production: without it, ' +
              'anyone can forge an administration session.',
          ),
        );
      }

      // Layer.provide does not suffice: the dependency is not claimed when
      // the layer is built, but on every call of the functions it returns.
      const mac = yield* Mac.Mac;
      const withMac = Effect.provideService(Mac.Mac, mac);

      const key = yield* Jwk.importSecret(
        Redacted.make({
          kty: 'oct' as const,
          k: Buffer.from(Redacted.value(secret), 'utf8').toString('base64url'),
        }),
        'HS256',
      ).pipe(Effect.orDie);

      return AdminSession.of({
        open: Effect.fn('AdminSession.open')(function* (
          administrator: Administrator,
        ) {
          const token = yield* Jwt.sign(
            Claims,
            { sub: String(administrator.id) },
            key,
            { expiresIn: LIFETIME } as never,
          ).pipe(withMac, Effect.orDie);

          return Redacted.value(token);
        }),

        read: Effect.fn('AdminSession.read')(function* (
          token: string | undefined,
        ) {
          if (token === undefined || token === '') return null;

          const verified = yield* Jwt.verify(Claims, token, key).pipe(
            withMac,
            Effect.option,
          );
          if (verified._tag === 'None') return null;

          const id = Number(verified.value.claims.sub);
          if (!Number.isInteger(id)) return null;

          return yield* administrators.byId(id);
        }),
      });
    }),
  ).pipe(
    Layer.provide(Mac.layerWebCrypto),
    Layer.provide(SecureRandom.layerWebCrypto),
  );
}
