'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Effect } from 'effect';
import { Moderation } from '@dismoi/api/application/Moderation';
import {
  VISIBILITIES,
  type Visibility,
} from '@dismoi/api/domain/NoticeVisibility';
import { run } from '../../lib/effect';
import { closeSession, requireAccount } from './session';

// Each one checks the session again: a server action is an HTTP entry point
// like any other, and the guard placed on the pages does not protect it.

export const signOut = async (): Promise<void> => {
  await closeSession();
  redirect('/admin/sign-in');
};

const visibilityOf = (raw: unknown): Visibility => {
  const value = String(raw ?? '');
  if ((VISIBILITIES as ReadonlyArray<string>).includes(value)) {
    return value as Visibility;
  }
  throw new Error(`Unknown visibility: ${value}`);
};

// revalidatePath is not optional: without it, the list and the dashboard
// would keep the counters from before the action.
export const setVisibility = async (form: FormData): Promise<void> => {
  await requireAccount();

  const id = Number(form.get('id'));
  const visibility = visibilityOf(form.get('visibility'));

  await run(
    Effect.gen(function* () {
      const moderation = yield* Moderation;
      return yield* moderation.setVisibility(id, visibility);
    }).pipe(
      // A notice gone between the display and the click is not a failure:
      // the next page will show it is no longer there.
      Effect.catchTag('NoticeMissing', () => Effect.void),
    ),
  );

  revalidatePath('/admin');
  revalidatePath('/admin/notices');
  revalidatePath(`/admin/notices/${id}`);
};
