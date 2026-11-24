import { MysqlClient } from '@effect/sql-mysql2';
import { Config, Layer, Redacted } from 'effect';

// The schema is maintained by the 77 Doctrine migrations of the backend:
// this package reads it without ever changing it, and carries no migration
// layer of its own.

// Without dateStrings, mysql2 builds a Date by reading the wall-clock time
// in the timezone of the process: on a server in UTC, a notice created at
// 23:13:17 would come back as 21:13:17+02:00. The raw string is kept and the
// presentation decides, cf. http/v3/dateTime.ts.
const DRIVER_OPTIONS = { dateStrings: true } as const;

// Three sources, in this order.
//
// DISMOI_DB_* first, so that a run can be pointed at another database
// without touching the hosting. Then the MYSQL_ADDON_* variables the
// platform injects, read-only, when a MySQL add-on is linked: copying them
// into DISMOI_DB_* by hand would be work to redo the day the add-on is
// migrated, since a migration regenerates them. Then the development
// container of docker-compose.yml, whose password is disposable and already
// public in this repository.
//
// Config.orElse catches every ConfigError, not only an absent variable: a
// DISMOI_DB_PORT that is not a number falls through to the add-on rather
// than stopping the application. That is the behaviour of the combinator,
// and the alternative — failing on a typo — would leave the site down.
const fromEnvironment = <A>(
  own: Config.Config<A>,
  addon: Config.Config<A>,
  development: A,
): Config.Config<A> =>
  own.pipe(
    Config.orElse(() => addon),
    Config.withDefault(development),
  );

export const configurationBase = {
  host: fromEnvironment(
    Config.String('DISMOI_DB_HOST'),
    Config.String('MYSQL_ADDON_HOST'),
    '127.0.0.1',
  ),
  port: fromEnvironment(
    Config.Port('DISMOI_DB_PORT'),
    Config.Port('MYSQL_ADDON_PORT'),
    3310,
  ),
  // MYSQL_ADDON_DB, not _DATABASE nor _NAME: the spelling of the platform's
  // own reference table.
  database: fromEnvironment(
    Config.String('DISMOI_DB_NAME'),
    Config.String('MYSQL_ADDON_DB'),
    'dismoi',
  ),
  username: fromEnvironment(
    Config.String('DISMOI_DB_USER'),
    Config.String('MYSQL_ADDON_USER'),
    'root',
  ),
  password: fromEnvironment(
    Config.Redacted('DISMOI_DB_PASSWORD'),
    Config.Redacted('MYSQL_ADDON_PASSWORD'),
    Redacted.make('dev'),
  ),
  maxConnections: Config.Int('DISMOI_DB_MAX_CONNECTIONS').pipe(
    Config.withDefault(10),
  ),
  poolConfig: Config.succeed(DRIVER_OPTIONS),
};

export const DatabaseLive: Layer.Layer<
  MysqlClient.MysqlClient | import('effect/sql').SqlClient.SqlClient,
  Config.ConfigError | import('effect/sql').SqlError.SqlError
> = MysqlClient.layerConfig(configurationBase);
