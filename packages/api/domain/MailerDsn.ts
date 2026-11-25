export interface SmtpRelay {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly secure: boolean;
  readonly requireTls: boolean;
}

const IMPLICIT_TLS_PORT = 465;

// Our default, not Symfony's. A `smtp://` with no port means 25 to Symfony,
// which no relay asking for credentials listens on any more; the former
// backend always named its port. Choosing 587 here rather than 25 keeps the
// value usable when it does not, and DISMOI_SMTP_PORT still overrides it.
const DEFAULT_PORT = 587;

// The MAILER_DSN of config/packages/mailer.yaml, read so that the address
// already set on the PHP application can be moved over as it is, rather than
// taken apart by hand into three variables.
//
// Only the SMTP transports are read. Everything else — sendmail, native, the
// API bridges of the providers, the null transport — gives null: announcing
// a relay we cannot drive would lose the emails in silence, where null
// falls back on logging them.
export const relayFromDsn = (dsn: string): SmtpRelay | null => {
  let address: URL;

  try {
    address = new URL(dsn);
  } catch {
    return null;
  }

  if (address.protocol !== 'smtp:' && address.protocol !== 'smtps:') {
    return null;
  }

  if (address.hostname === '') return null;

  const port = address.port === '' ? DEFAULT_PORT : Number(address.port);

  return {
    host: address.hostname,
    // URL percent-decodes neither of these on its own.
    user: decodeURIComponent(address.username),
    password: decodeURIComponent(address.password),
    port,
    secure: address.protocol === 'smtps:' || port === IMPLICIT_TLS_PORT,
    requireTls: true,
  };
};
