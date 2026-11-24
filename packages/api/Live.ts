import { Layer } from 'effect';
import { AdminSession } from './application/AdminSession';
import { CryptoRandomnessLive } from './infrastructure/randomness/CryptoRandomness';
import { AdministratorsSqlLive } from './infrastructure/sql/AdministratorsSql';
import { MailerLive } from './infrastructure/mail/SmtpMailer';
import { DatabaseLive } from './infrastructure/sql/Database';
import { V3WritesSqlLive } from './infrastructure/sql/V3WritesSql';
import { DiskFilesLive } from './infrastructure/files/DiskFiles';
import { ImagesSharpLive } from './infrastructure/images/ImagesSharp';
import { V3ReadsSqlLive } from './infrastructure/sql/V3ReadsSql';
import { ModerationSqlLive } from './infrastructure/sql/ModerationSql';
import { SupervisionSqlLive } from './infrastructure/sql/SupervisionSql';
import { ActivitySqlLive } from './infrastructure/sql/ActivitySql';
import { CatalogueSqlLive } from './infrastructure/sql/CatalogueSql';

// provideMerge leaves SqlClient visible: the admin reads the database
// directly for what the V3 ports do not expose, and without it a second
// connection pool would have to be opened.
export const ApiLive = Layer.mergeAll(
  V3WritesSqlLive.pipe(
    Layer.provide(MailerLive),
    Layer.provide(V3ReadsSqlLive),
  ),
  V3ReadsSqlLive,
  SupervisionSqlLive,
  ActivitySqlLive,
  ModerationSqlLive,
  CatalogueSqlLive,
  AdminSession.layer.pipe(Layer.provide(AdministratorsSqlLive)),
  AdministratorsSqlLive,
  ImagesSharpLive.pipe(Layer.provide(DiskFilesLive)),
  DiskFilesLive,
  CryptoRandomnessLive,
).pipe(Layer.provideMerge(DatabaseLive));
