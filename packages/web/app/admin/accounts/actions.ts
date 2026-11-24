'use server';

import { revalidatePath } from 'next/cache';
import { Effect } from 'effect';
import { Administrators } from '@dismoi/api/application/Administrators';
import { run } from '../../../lib/effect';
import { requireRole } from '../session';

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
