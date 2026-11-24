import { MysqlClient } from '@effect/sql-mysql2';
import { Config, Layer, Redacted } from 'effect';

// The schema is maintained by the 77 Doctrine migrations of the backend:
// this package reads it without ever changing it, and carries no migration
// layer of its own.

// Without dateStrings, mysql2 builds a Date by reading the wall-clock time
// in the timezone of the process: on a server in UTC, a notice created at
// 23:13:17 would come back as 21:13:17+02:00. The raw string is kept and the
// presentation decides, cf. http/v3/dateTime.ts.
const OPTIONS_PILOTE = { dateStrings: true } as const;

// The defaults point at the development container of docker-compose.yml,
// whose password is disposable and already public in this repository.
export const configurationBase = {
  host: Config.String('DISMOI_DB_HOST').pipe(Config.withDefault('127.0.0.1')),
  port: Config.Port('DISMOI_DB_PORT').pipe(Config.withDefault(3310)),
  database: Config.String('DISMOI_DB_NAME').pipe(Config.withDefault('dismoi')),
  username: Config.String('DISMOI_DB_USER').pipe(Config.withDefault('root')),
  password: Config.Redacted('DISMOI_DB_PASSWORD').pipe(
    Config.withDefault(Redacted.make('dev')),
  ),
  maxConnections: Config.Int('DISMOI_DB_MAX_CONNECTIONS').pipe(
    Config.withDefault(10),
  ),
  poolConfig: Config.succeed(OPTIONS_PILOTE),
};

export const DatabaseLive: Layer.Layer<
  MysqlClient.MysqlClient | import('effect/sql').SqlClient.SqlClient,
  Config.ConfigError | import('effect/sql').SqlError.SqlError
> = MysqlClient.layerConfig(configurationBase);
