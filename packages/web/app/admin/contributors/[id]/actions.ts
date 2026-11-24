'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Effect } from 'effect';
import type { SubmittedContributor } from '@dismoi/api/application/Moderation';
import { Moderation } from '@dismoi/api/application/Moderation';
import { removeContributor } from '@dismoi/api/application/Removal';
import { uploadContributorImage } from '@dismoi/api/application/UploadAnImage';
import { run } from '../../../../lib/effect';
import {
  checkbox,
  field,
  fieldOrNull,
  integerOrNull,
  integerList,
  submittedFile,
  type SaveResult,
} from '../../form';
import { requireAccount } from '../../session';
import { IMAGE_SLOTS } from './images';

export type { SaveResult };

const submittedContributor = (form: FormData): SubmittedContributor => ({
  name: field(form, 'name'),
  title: fieldOrNull(form, 'title'),
  email: fieldOrNull(form, 'email'),
  website: fieldOrNull(form, 'website'),
  intro: fieldOrNull(form, 'intro'),
  locale: fieldOrNull(form, 'locale'),
  categories: form.getAll('categories').map((value) => String(value)),
  enabled: checkbox(form, 'enabled'),
  // The order of the pins is the one of the submitted list: the client
  // component rearranges it and sends it in a hidden field.
  pinned: integerList(form, 'pinned'),
});

const uploadImages = async (
  id: number,
  form: FormData,
): Promise<ReadonlyArray<string>> => {
  const rejections: string[] = [];

  for (const slot of IMAGE_SLOTS) {
    const content = await submittedFile(form, slot.name);
    if (content === null) continue;

    const reason = await run(
      uploadContributorImage(id, slot.field, content).pipe(
        Effect.as<string | null>(null),
        Effect.catchTag('ImageRefused', (failure) =>
          Effect.succeed(failure.reason),
        ),
        Effect.catchTag('WriteFailed', () =>
          Effect.succeed('Le stockage a rejeté l’image.'),
        ),
        Effect.catchTag('ContributorMissing', () =>
          Effect.succeed('Ce contributeur n’existe plus.'),
        ),
      ),
    );

    if (reason !== null) rejections.push(reason);
  }

  return rejections;
};

export const saveContributor = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireAccount();

  const id = integerOrNull(form, 'id');
  if (id === null) return { reasons: ['Contributeur inconnu.'] };

  const reasons = await run(
    Effect.gen(function* () {
      const moderation = yield* Moderation;
      return yield* moderation.saveContributor(id, submittedContributor(form));
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('InvalidFields', (failure) =>
        Effect.succeed(failure.reasons),
      ),
      Effect.catchTag('ContributorMissing', () =>
        Effect.succeed(['Ce contributeur n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  // The fields are already saved: a refused image must not present itself
  // as a failure of the whole form.
  const rejections = await uploadImages(id, form);

  revalidatePath('/admin');
  revalidatePath('/admin/contributors');
  revalidatePath(`/admin/contributors/${id}`);

  return rejections.length > 0
    ? { saved: true, reasons: rejections }
    : { saved: true };
};

export const createContributor = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireAccount();

  const created = await run(
    Effect.gen(function* () {
      const moderation = yield* Moderation;
      return yield* moderation.createContributor(submittedContributor(form));
    }).pipe(
      Effect.map((id) => ({ id })),
      Effect.catchTag('InvalidFields', (failure) =>
        Effect.succeed({ reasons: failure.reasons }),
      ),
    ),
  );

  if ('reasons' in created) return { reasons: created.reasons };

  revalidatePath('/admin');
  revalidatePath('/admin/contributors');

  redirect(`/admin/contributors/${created.id}`);
};

export const deleteContributor = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireAccount();

  const id = integerOrNull(form, 'id');
  if (id === null) return { reasons: ['Contributeur inconnu.'] };

  const reasons = await run(
    removeContributor(id).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('ContributorSignsNotices', (failure) =>
        Effect.succeed([
          `Signe encore ${failure.notices} notice${failure.notices > 1 ? 's' : ''} : supprime-les ou donne-les à un autre contributeur, ou désactive celui-ci.`,
        ]),
      ),
      Effect.catchTag('ContributorMissing', () =>
        Effect.succeed(['Ce contributeur n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  revalidatePath('/admin');
  revalidatePath('/admin/contributors');

  redirect('/admin/contributors');
};
