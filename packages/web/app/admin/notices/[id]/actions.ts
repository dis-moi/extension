'use server';

import { revalidatePath } from 'next/cache';
import { Effect } from 'effect';
import type {
  SubmittedContext,
  SubmittedNotice,
} from '@dismoi/api/application/Moderation';
import { Moderation } from '@dismoi/api/application/Moderation';
import {
  VISIBILITIES,
  type Visibility,
} from '@dismoi/api/domain/NoticeVisibility';
import { run } from '../../../../lib/effect';
import {
  checkbox,
  field,
  fieldOrNull,
  domains,
  integerOrNull,
  integers,
  type SaveResult,
} from '../../form';
import { requireAccount } from '../../session';

// The contexts travel in fields named contexts.0.urlRegex, so that the form
// stays a real form — not a hidden JSON object — and the fields keep their
// labels, their validation and their keyboard.

export type { SaveResult };

// Falling back to draft rather than throwing: the field comes from the
// network and can be forged, and an unknown value must not publish anything
// by accident.
const visibilityOf = (raw: string): Visibility =>
  (VISIBILITIES as ReadonlyArray<string>).includes(raw)
    ? (raw as Visibility)
    : 'draft';

const contextRanks = (form: FormData): ReadonlyArray<string> => {
  const ranks = new Set<string>();

  for (const key of form.keys()) {
    const found = /^contexts\.([^.]+)\./.exec(key);
    if (found?.[1] !== undefined) ranks.add(found[1]);
  }

  return [...ranks].sort((a, b) => Number(a) - Number(b));
};

const contextAtRank = (form: FormData, rank: string): SubmittedContext => {
  const prefix = `contexts.${rank}`;

  return {
    id: integerOrNull(form, `${prefix}.id`),
    description: fieldOrNull(form, `${prefix}.description`),
    exampleUrl: fieldOrNull(form, `${prefix}.exampleUrl`),
    urlRegex: field(form, `${prefix}.urlRegex`),
    excludeUrlRegex: fieldOrNull(form, `${prefix}.excludeUrlRegex`),
    querySelector: fieldOrNull(form, `${prefix}.querySelector`),
    xpath: fieldOrNull(form, `${prefix}.xpath`),
    domains: domains(form, `${prefix}.domains`),
  };
};

const submittedNotice = (form: FormData): SubmittedNotice => ({
  message: field(form, 'message'),
  note: fieldOrNull(form, 'note'),
  visibility: visibilityOf(field(form, 'visibility')),
  locale: fieldOrNull(form, 'locale'),
  excludeUrlRegex: fieldOrNull(form, 'excludeUrlRegex'),
  expires: fieldOrNull(form, 'expires'),
  unpublishedOnExpiration: checkbox(form, 'unpublishedOnExpiration'),
  contributorId: integerOrNull(form, 'contributorId'),
  relayers: integers(form, 'relayers'),
  contexts: contextRanks(form).map((rank) => contextAtRank(form, rank)),
});

export const saveNotice = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireAccount();

  const id = integerOrNull(form, 'id');
  if (id === null) return { reasons: ['Notice inconnue.'] };

  const reasons = await run(
    Effect.gen(function* () {
      const moderation = yield* Moderation;
      return yield* moderation.saveNotice(id, submittedNotice(form));
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('InvalidFields', (failure) =>
        Effect.succeed(failure.reasons),
      ),
      Effect.catchTag('NoticeMissing', () =>
        Effect.succeed<ReadonlyArray<string>>(['Cette notice n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  revalidatePath('/admin');
  revalidatePath('/admin/notices');
  revalidatePath(`/admin/notices/${id}`);

  return { saved: true };
};
