import { describe, expect, it } from 'vitest';
import { Config, ConfigProvider, Effect, Redacted } from 'effect';
import { configurationBase } from './Database';

const read = <A>(
  config: Config.Config<A>,
  environment: Record<string, string>,
): Promise<A> =>
  Effect.runPromise(config.parse(ConfigProvider.fromUnknown(environment)));

const ADDON = {
  MYSQL_ADDON_HOST: 'bxxxxx.mysql.clever-cloud.com',
  MYSQL_ADDON_PORT: '3306',
  MYSQL_ADDON_DB: 'bxxxxx',
  MYSQL_ADDON_USER: 'uxxxxx',
  MYSQL_ADDON_PASSWORD: 'de-la-part-du-greffon',
};

describe('the database the administration and the API read', () => {
  describe('with nothing set', () => {
    it('points at the development container of docker-compose', async () => {
      expect(await read(configurationBase.host, {})).toBe('127.0.0.1');
      expect(await read(configurationBase.port, {})).toBe(3310);
      expect(await read(configurationBase.database, {})).toBe('dismoi');
      expect(await read(configurationBase.username, {})).toBe('root');
    });
  });

  describe('with a MySQL add-on linked', () => {
    it('reads the host and the port the platform injects', async () => {
      expect(await read(configurationBase.host, ADDON)).toBe(
        'bxxxxx.mysql.clever-cloud.com',
      );
      expect(await read(configurationBase.port, ADDON)).toBe(3306);
    });

    it('reads the database, the user and the password it injects', async () => {
      expect(await read(configurationBase.database, ADDON)).toBe('bxxxxx');
      expect(await read(configurationBase.username, ADDON)).toBe('uxxxxx');
      expect(
        Redacted.value(await read(configurationBase.password, ADDON)),
      ).toBe('de-la-part-du-greffon');
    });
  });

  describe('with both set', () => {
    it('lets DISMOI_DB_HOST override the add-on', async () => {
      expect(
        await read(configurationBase.host, {
          ...ADDON,
          DISMOI_DB_HOST: '127.0.0.1',
        }),
      ).toBe('127.0.0.1');
    });

    it('lets DISMOI_DB_NAME override the add-on', async () => {
      expect(
        await read(configurationBase.database, {
          ...ADDON,
          DISMOI_DB_NAME: 'dismoi_essai',
        }),
      ).toBe('dismoi_essai');
    });
  });
});
