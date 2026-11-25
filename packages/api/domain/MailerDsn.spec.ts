import { describe, expect, it } from 'vitest';
import { relayFromDsn } from './MailerDsn';

describe('the MAILER_DSN of the PHP backend', () => {
  it('reads the host, the port and the credentials', () => {
    expect(
      relayFromDsn('smtp://infra@dismoi.io:la-cle@smtp-relay.brevo.com:587'),
    ).toEqual({
      host: 'smtp-relay.brevo.com',
      port: 587,
      user: 'infra@dismoi.io',
      password: 'la-cle',
      secure: false,
      requireTls: true,
    });
  });

  it('decodes what the DSN had to escape', () => {
    const relay = relayFromDsn(
      'smtp://a%40b.fr:cl%2Fe%2Bbiz%3A1@smtp-relay.brevo.com:587',
    );

    expect(relay?.user).toBe('a@b.fr');
    expect(relay?.password).toBe('cl/e+biz:1');
  });

  it('turns smtps into implicit TLS', () => {
    const relay = relayFromDsn('smtps://u:p@relais.exemple.fr:465');

    expect(relay?.secure).toBe(true);
    expect(relay?.port).toBe(465);
  });

  it('infers implicit TLS from port 465 under the plain scheme', () => {
    expect(relayFromDsn('smtp://u:p@relais.exemple.fr:465')?.secure).toBe(true);
  });

  it('falls back on 587 when the DSN names no port', () => {
    expect(relayFromDsn('smtp://u:p@relais.exemple.fr')?.port).toBe(587);
  });

  it('accepts a relay that asks for no credentials', () => {
    const relay = relayFromDsn('smtp://relais.interne:25');

    expect(relay?.user).toBe('');
    expect(relay?.password).toBe('');
    expect(relay?.port).toBe(25);
  });

  describe('what it refuses, rather than half-configure a relay', () => {
    it('refuses the transports that are not SMTP', () => {
      expect(relayFromDsn('sendmail://default')).toBeNull();
      expect(relayFromDsn('native://default')).toBeNull();
      expect(relayFromDsn('brevo+api://KEY@default')).toBeNull();
    });

    it('refuses the null transport Symfony uses to send nothing', () => {
      expect(relayFromDsn('null://null')).toBeNull();
    });

    it('refuses what is not an address at all', () => {
      expect(relayFromDsn('smtp-relay.brevo.com')).toBeNull();
      expect(relayFromDsn('')).toBeNull();
    });

    it('refuses an address with no host', () => {
      expect(relayFromDsn('smtp://')).toBeNull();
    });
  });
});
