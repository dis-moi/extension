'use server';

import { redirect } from 'next/navigation';
import { Effect } from 'effect';
import { Administrators } from '@dismoi/api/application/Administrators';
import { run } from '../../../lib/effect';
import { openSession } from '../session';

// The same message for an unknown login and for a wrong password, so that
// the page does not say who exists.
export const signIn = async (
  _previousState: { readonly error?: string } | null,
  form: FormData,
): Promise<{ readonly error?: string }> => {
  const login = String(form.get('login') ?? '');
  const password = String(form.get('password') ?? '');

  if (login === '' || password === '') {
    return { error: 'Renseigne un login et un mot de passe.' };
  }

  const account = await run(
    Effect.gen(function* () {
      const administrators = yield* Administrators;
      return yield* administrators.authenticate(login, password);
    }).pipe(Effect.catchTag('InvalidCredentials', () => Effect.succeed(null))),
  );

  if (account === null) {
    return { error: 'Identifiant ou mot de passe incorrect.' };
  }

  await openSession(account);
  redirect('/admin');
};
