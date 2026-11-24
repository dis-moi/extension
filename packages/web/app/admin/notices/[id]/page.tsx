import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Effect } from 'effect';
import { Supervision } from '@dismoi/api/application/Supervision';
import { run } from '../../../../lib/effect';
import '../../admin.css';
import { setVisibility } from '../../actions';
import { Chrome } from '../../chrome';
import { shortDate, state } from '../../format';
import { requireAccount } from '../../session';
import { NoticeForm } from './form';

export const dynamic = 'force-dynamic';

export const generateMetadata = async ({
  params,
}: {
  readonly params: { readonly id: string };
}) => ({ title: `Notice #${params.id} — Admin DisMoi` });

const NoticePage = async ({
  params,
}: {
  readonly params: { readonly id: string };
}) => {
  const account = await requireAccount();
  const id = Number(params.id);

  if (!Number.isInteger(id)) notFound();

  const { notice, contributors, sets } = await run(
    Effect.gen(function* () {
      const supervision = yield* Supervision;

      const [notice, contributors, sets] = yield* Effect.all([
        supervision.notice(id),
        supervision.contributorsForPicking,
        supervision.domainsSets,
      ]);

      return { notice, contributors, sets };
    }),
  );

  if (notice === null) notFound();

  const badge = state(notice.visibility);
  const pending =
    notice.visibility === 'draft' || notice.visibility === 'question';

  return (
    <Chrome account={account} active="notices">
      <div className="admin-title-row">
        <Link
          href="/admin/notices"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M8.5 3L4.5 7l4 4" />
          </svg>
          Notices
        </Link>

        <h1>
          Notice{' '}
          <span
            className="num"
            style={{ color: 'var(--ink-soft)', fontWeight: 500 }}
          >
            #{notice.id}
          </span>
        </h1>

        <p className="admin-subtitle">
          créée le {shortDate(notice.created)} · modifiée le{' '}
          {shortDate(notice.updated)}
        </p>

        <span className={`admin-state ${badge.className}`}>{badge.label}</span>

        {pending && (
          <form action={setVisibility}>
            <input type="hidden" name="id" value={notice.id} />
            <input type="hidden" name="visibility" value="public" />
            <button className="admin-button-attention" type="submit">
              Publier maintenant
            </button>
          </form>
        )}
      </div>

      <NoticeForm
        notice={notice}
        contributors={contributors}
        sets={sets.map((set) => ({ id: set.id, name: set.name }))}
      />
    </Chrome>
  );
};

export default NoticePage;
