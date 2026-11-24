import { describe, expect, it } from 'vitest';
import {
  accountViolations,
  canonical,
  isRole,
  passwordViolations,
  ROLES,
} from './AccountSubmission';

const account = {
  username: 'alice',
  email: 'alice@exemple.fr',
  roles: ['ROLE_ADMIN'] as ReadonlyArray<string>,
};

describe('an account submitted from the administration', () => {
  it('accepts a login, an address and a role', () => {
    expect(accountViolations(account)).toEqual([]);
  });

  it('refuses an empty login', () => {
    expect(accountViolations({ ...account, username: ' ' })).toEqual([
      'L’identifiant ne peut pas être vide.',
    ]);
  });

  it('refuses an address that is not one', () => {
    expect(accountViolations({ ...account, email: 'alice' })).toEqual([
      'L’adresse électronique n’est pas valide.',
    ]);
  });

  it('refuses an account with no role, which could not sign in', () => {
    expect(accountViolations({ ...account, roles: [] })).toEqual([
      'Un compte a besoin d’au moins un rôle.',
    ]);
  });

  it('refuses a role outside the vocabulary of the security layer', () => {
    expect(accountViolations({ ...account, roles: ['ROLE_INVENTED'] })).toEqual(
      ['Le rôle « ROLE_INVENTED » n’existe pas.'],
    );
  });

  it('knows the three roles the security layer defines', () => {
    expect([...ROLES]).toEqual(['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']);
  });

  it('tells a role from anything else', () => {
    expect(isRole('ROLE_ADMIN')).toBe(true);
    expect(isRole('ROLE_ADMIN ')).toBe(false);
  });
});

describe('the canonical form FOSUserBundle queries on', () => {
  it('trims and lowercases', () => {
    expect(canonical('  Alice@Exemple.FR ')).toBe('alice@exemple.fr');
  });
});

describe('a password submitted from the administration', () => {
  it('accepts twelve characters', () => {
    expect(passwordViolations('123456789012')).toEqual([]);
  });

  it('refuses eleven, as the command line does', () => {
    expect(passwordViolations('12345678901')).toEqual([
      'Le mot de passe fait moins de douze caractères.',
    ]);
  });

  it('refuses a password beyond what bcrypt reads', () => {
    expect(passwordViolations('a'.repeat(73))).toEqual([
      'Le mot de passe dépasse 72 octets : bcrypt ignorerait la fin.',
    ]);
  });

  it('counts bytes, not characters', () => {
    expect(passwordViolations('é'.repeat(37))).toEqual([
      'Le mot de passe dépasse 72 octets : bcrypt ignorerait la fin.',
    ]);
  });
});
