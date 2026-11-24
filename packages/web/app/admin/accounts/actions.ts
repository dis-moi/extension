'use server';

import { revalidatePath } from 'next/cache';
import { Effect } from 'effect';
import {
  Administrators,
  type SubmittedAccount,
} from '@dismoi/api/application/Administrators';
import { run } from '../../../lib/effect';
import { checkbox, field, integerOrNull, type SaveResult } from '../form';
import { requireRole } from '../session';

export type { SaveResult };

// An account is not deleted: fos_user is referenced elsewhere, and a
// disabled account keeps the trace of what it did.
export const setAccountEnabled = async (form: FormData): Promise<void> => {
  const me = await requireRole('ROLE_ADMIN');

  const id = Number(form.get('id'));
  const enabled = form.get('enabled') === 'yes';

  if (!Number.isInteger(id)) return;

  // Disabling yourself locks the door from the inside: the current session
  // survives, but the next sign-in fails without explaining anything.
  if (id === me.id) return;

  await run(
    Effect.gen(function* () {
      const administrators = yield* Administrators;
      return yield* administrators.setEnabled(id, enabled);
    }).pipe(Effect.catchTag('AccountMissing', () => Effect.void)),
  );

  revalidatePath('/admin/accounts');
};

const submittedAccount = (form: FormData): SubmittedAccount => ({
  username: field(form, 'username'),
  email: field(form, 'email'),
  roles: form.getAll('roles').map((role) => String(role)),
  enabled: checkbox(form, 'enabled'),
});

export const createAccount = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireRole('ROLE_ADMIN');

  const reasons = await run(
    Effect.gen(function* () {
      const administrators = yield* Administrators;
      return yield* administrators.createAccount(
        submittedAccount(form),
        field(form, 'password'),
      );
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('InvalidFields', (failure) =>
        Effect.succeed(failure.reasons),
      ),
      Effect.catchTag('LoginTaken', (failure) =>
        Effect.succeed([`« ${failure.login} » est déjà pris.`]),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  revalidatePath('/admin/accounts');
  return { saved: true };
};

export const saveAccount = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireRole('ROLE_ADMIN');

  const id = integerOrNull(form, 'id');
  if (id === null) return { reasons: ['Compte inconnu.'] };

  const reasons = await run(
    Effect.gen(function* () {
      const administrators = yield* Administrators;
      return yield* administrators.saveAccount(id, submittedAccount(form));
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('InvalidFields', (failure) =>
        Effect.succeed(failure.reasons),
      ),
      Effect.catchTag('LoginTaken', (failure) =>
        Effect.succeed([`« ${failure.login} » est déjà pris.`]),
      ),
      Effect.catchTag('AccountMissing', () =>
        Effect.succeed(['Ce compte n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  revalidatePath('/admin/accounts');
  return { saved: true };
};

// The password is not read back, so it travels alone: editing the rest of
// an account never asks for it, and setting it never risks overwriting a
// field with a stale value from the form.
export const setPassword = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireRole('ROLE_ADMIN');

  const id = integerOrNull(form, 'id');
  if (id === null) return { reasons: ['Compte inconnu.'] };

  if (field(form, 'password') !== field(form, 'confirmation')) {
    return { reasons: ['Les deux saisies diffèrent.'] };
  }

  const reasons = await run(
    Effect.gen(function* () {
      const administrators = yield* Administrators;
      return yield* administrators.setPassword(id, field(form, 'password'));
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('InvalidFields', (failure) =>
        Effect.succeed(failure.reasons),
      ),
      Effect.catchTag('AccountMissing', () =>
        Effect.succeed(['Ce compte n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  revalidatePath('/admin/accounts');
  return { saved: true };
};
