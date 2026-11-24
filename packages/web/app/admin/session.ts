import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Effect } from 'effect';
import type { Administrator } from '@dismoi/api/application/Administrators';
import { hasRole } from '@dismoi/api/application/Administrators';
import { AdminSession } from '@dismoi/api/application/AdminSession';
import { run } from '../../lib/effect';

// The token is minted and read by AdminSession, which knows nothing of cookies
// or requests: this module is the only part that knows we are inside Next.

const NAME = 'dismoi_admin';

const LIFETIME_SECONDS = 12 * 60 * 60;

export const currentAccount = async (): Promise<Administrator | null> => {
  const token = (await cookies()).get(NAME)?.value;

  return run(
    Effect.gen(function* () {
      const session = yield* AdminSession;
      return yield* session.read(token);
    }),
  );
};

// A guard placed in the layout would not do: Next can render a page without
// re-running its layout, so every page checks for itself.
export const requireAccount = async (): Promise<Administrator> => {
  const account = await currentAccount();
  if (account === null) redirect('/admin/sign-in');
  return account;
};

// Hiding a link is not a guard. Pages and server actions reserved to a role
// call this, so that reaching them by their address is refused the same way.
export const requireRole = async (role: string): Promise<Administrator> => {
  const account = await requireAccount();
  if (!hasRole(account, role)) redirect('/admin');
  return account;
};

export const openSession = async (
  administrator: Administrator,
): Promise<void> => {
  const token = await run(
    Effect.gen(function* () {
      const session = yield* AdminSession;
      return yield* session.open(administrator);
    }),
  );

  (await cookies()).set(NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    // `secure` follows the protocol: in development the site is served in the
    // clear, and a `secure` cookie would never come back.
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: LIFETIME_SECONDS,
  });
};

export const closeSession = async (): Promise<void> => {
  (await cookies()).delete({ name: NAME, path: '/admin' });
};
