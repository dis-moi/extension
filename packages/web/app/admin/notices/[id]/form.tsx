'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import type {
  EditableContext,
  EditableNotice,
} from '@dismoi/api/application/Supervision';
import { VISIBILITIES } from '@dismoi/api/domain/NoticeVisibility';
import { storagePath } from '@dismoi/api/domain/UploadedImage';
import {
  SubmitButton,
  Confirmation,
  LanguageOptions,
  Rejection,
} from '../../fields';
import { STATES } from '../../format';
import { ContextFields } from './context';
import { createNotice, saveNotice } from './actions';

// A client component only for the collection of contexts and the live
// pattern test: saving, validation and writing stay on the server.

export interface Named {
  readonly id: number;
  readonly name: string;
}

// What the form writes, as opposed to what the page reads: the counters and
// the two dates belong to a notice that exists, and a creation has none.
export type NoticeDraft = Omit<
  EditableNotice,
  'id' | 'created' | 'updated' | 'counters'
> & { readonly id: number | null };

const BLANK: NoticeDraft = {
  id: null,
  message: '',
  note: null,
  visibility: 'draft',
  locale: null,
  screenshot: null,
  excludeUrlRegex: null,
  expires: null,
  unpublishedOnExpiration: false,
  contributorId: null,
  relayers: [],
  contexts: [],
};

export const NoticeForm = ({
  notice,
  contributors,
  sets,
}: {
  // null when the notice is being written for the first time.
  readonly notice: EditableNotice | null;
  readonly contributors: ReadonlyArray<Named>;
  readonly sets: ReadonlyArray<Named>;
}) => {
  const saved = notice;
  const draft: NoticeDraft = notice ?? BLANK;

  const [state, act] = useFormState(
    saved === null ? createNotice : saveNotice,
    null,
  );

  const [contexts, setContexts] = useState<
    ReadonlyArray<EditableContext | null>
  >(draft.contexts);

  const [message, setMessage] = useState(draft.message);

  const remove = (rank: number) =>
    setContexts((current) => current.filter((_, i) => i !== rank));

  const add = () => setContexts((current) => [...current, null]);

  return (
    <form action={act}>
      <input type="hidden" name="id" value={draft.id ?? ''} />

      {state?.reasons !== undefined && state.reasons.length > 0 && (
        <Rejection
          title="La notice n’a pas été enregistrée :"
          reasons={state.reasons}
        />
      )}

      {state?.saved === true && (
        <Confirmation
          text={
            saved === null
              ? 'Notice créée. Elle apparaît dans la liste des notices.'
              : 'Notice enregistrée.'
          }
        />
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 14,
          marginBottom: 20,
        }}
      >
        <p style={{ margin: 0, flexGrow: 1, minWidth: 180 }}>
          <span className="admin-label" style={{ marginBottom: 2 }}>
            {saved === null ? 'Nouvelle notice' : `Notice #${saved.id}`}
          </span>
          {saved !== null && (
            <span className="admin-note">
              créée le {saved.created.slice(0, 10)} · modifiée le{' '}
              {saved.updated.slice(0, 10)}
            </span>
          )}
        </p>
        <SubmitButton label="Enregistrer" pending="Enregistrement…" />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        <div
          style={{
            flex: '999 1 560px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <section className="admin-card" aria-labelledby="title-message">
            <h2 id="title-message">Message</h2>

            <label className="admin-label" htmlFor="message">
              Contenu affiché à l’internaute
            </label>
            <textarea
              className="admin-field"
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(evenement) => setMessage(evenement.target.value)}
              aria-describedby="message-aide"
              required
            />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 14,
                marginTop: 6,
              }}
            >
              <p
                className="admin-hint"
                id="message-aide"
                style={{ flexGrow: 1 }}
              >
                Balises autorisées :{' '}
                <code className="admin-mono">&lt;p&gt;</code> et{' '}
                <code className="admin-mono">&lt;a&gt;</code>. Les URL
                deviennent des liens automatiquement, avec un{' '}
                <code className="admin-mono">utm_medium</code> ajouté.
              </p>
              <p
                className="admin-hint num"
                style={{
                  marginTop: 0,
                  color: message.length > 500 ? '#8a2a16' : undefined,
                }}
              >
                {message.length} / 500
              </p>
            </div>

            <div style={{ marginTop: 18, display: 'grid', gap: 8 }}>
              <label htmlFor="screenshot" className="admin-label">
                Capture d’écran
              </label>

              {draft.screenshot === null ? (
                <p className="admin-hint" style={{ margin: 0 }}>
                  Aucune capture.
                </p>
              ) : (
                <>
                  <a
                    href={`/${storagePath('screenshotFile', draft.screenshot)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`/${storagePath('screenshotFile', draft.screenshot)}`}
                      alt="Capture d’écran actuelle"
                      style={{
                        display: 'block',
                        maxWidth: '100%',
                        maxHeight: 180,
                        borderRadius: 6,
                        background: 'var(--background)',
                      }}
                    />
                  </a>
                  <label
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <input
                      type="checkbox"
                      name="removeScreenshot"
                      value="yes"
                    />
                    <span className="admin-note">Retirer cette capture</span>
                  </label>
                </>
              )}

              <input
                id="screenshot"
                type="file"
                name="screenshot"
                accept="image/png,image/jpeg,image/webp"
                style={{ fontSize: 13 }}
              />
              <p className="admin-hint" style={{ margin: 0 }}>
                PNG, JPEG ou WebP, 5 Mo au plus. Le fichier porte le numéro de
                la notice : il remplace le précédent à l’enregistrement.
              </p>
            </div>
          </section>

          <section className="admin-card" aria-labelledby="title-targeting">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: 12,
                marginBottom: 6,
              }}
            >
              <h2
                id="title-targeting"
                style={{ margin: 0, fontSize: 15, fontWeight: 600 }}
              >
                Ciblage
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: 'var(--ink-soft)',
                  flexGrow: 1,
                }}
              >
                Les pages sur lesquelles la notice se déclenche.{' '}
                <span className="num">{contexts.length}</span> contexte
                {contexts.length > 1 ? 's' : ''}.
              </p>
              <button
                type="button"
                onClick={add}
                style={{
                  padding: '7px 13px',
                  border: '1px dashed #b8c8e4',
                  borderRadius: 8,
                  background: '#f7f9fd',
                  color: 'var(--accent)',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                + Ajouter un contexte
              </button>
            </div>

            {contexts.length === 0 && (
              <p className="admin-hint">
                Une notice a besoin d’au moins un contexte pour s’afficher
                quelque part.
              </p>
            )}

            {contexts.map((context, rank) => (
              <ContextFields
                key={context?.id ?? `new-${rank}`}
                rank={rank}
                context={context}
                sets={sets}
                onRemove={() => remove(rank)}
              />
            ))}

            <div style={{ marginTop: 16 }}>
              <label className="admin-label" htmlFor="excludeUrlRegex">
                Exclusion valable pour toute la notice
              </label>
              <textarea
                className="admin-field admin-mono"
                id="excludeUrlRegex"
                name="excludeUrlRegex"
                rows={2}
                defaultValue={draft.excludeUrlRegex ?? ''}
                placeholder="motif appliqué en plus de chaque exclusion de contexte"
              />
            </div>
          </section>

          {saved !== null && (
            <section className="admin-card" aria-labelledby="title-activity">
              <h2 id="title-activity">Activité de cette notice</h2>

              <div className="admin-grid-4">
                {[
                  { name: 'Badges', value: saved.counters.badge },
                  { name: 'Affichages', value: saved.counters.displays },
                  { name: 'Dépliements', value: saved.counters.unfolds },
                  {
                    name: 'Clics sortants',
                    value: saved.counters.outboundClicks,
                  },
                ].map((measure) => (
                  <div key={measure.name}>
                    <h3
                      style={{
                        margin: '0 0 2px',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--ink-soft)',
                      }}
                    >
                      {measure.name}
                    </h3>
                    <p
                      className="num"
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: 1.1,
                      }}
                    >
                      {measure.value.toLocaleString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>

              <p className="admin-hint" style={{ marginTop: 12 }}>
                Compteurs dénombrés sur la notice, à jour à chaque notation.
                J’aime <span className="num">{saved.counters.likes}</span> · Je
                n’aime pas{' '}
                <span className="num">{saved.counters.dislikes}</span> ·
                Masquages{' '}
                <span className="num">{saved.counters.dismissals}</span> — ce
                sont des soldes, retours en arrière déduits.
              </p>
            </section>
          )}
        </div>

        <aside
          style={{
            flex: '1 1 300px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <section className="admin-card" aria-labelledby="title-sources">
            <h2 id="title-sources">Sources</h2>

            <div style={{ marginBottom: 16 }}>
              <label className="admin-label" htmlFor="contributorId">
                Contributeur
              </label>
              <select
                className="admin-field"
                id="contributorId"
                name="contributorId"
                defaultValue={
                  draft.contributorId === null
                    ? ''
                    : String(draft.contributorId)
                }
              >
                <option value="">— aucun —</option>
                {contributors.map((contributor) => (
                  <option key={contributor.id} value={String(contributor.id)}>
                    {contributor.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="admin-label" htmlFor="relayers">
                Relayeurs
              </label>
              <select
                className="admin-field"
                id="relayers"
                name="relayers"
                multiple
                size={6}
                defaultValue={draft.relayers.map((relayeur) =>
                  String(relayeur.id),
                )}
              >
                {contributors.map((contributor) => (
                  <option key={contributor.id} value={String(contributor.id)}>
                    {contributor.name}
                  </option>
                ))}
              </select>
              <p className="admin-hint">
                Un relayeur fait apparaître la notice auprès de ses propres
                abonnés.
              </p>
            </div>
          </section>

          <section className="admin-card" aria-labelledby="title-cycle">
            <h2 id="title-cycle">Cycle de vie</h2>

            <div style={{ marginBottom: 16 }}>
              <label className="admin-label" htmlFor="visibility">
                Visibilité
              </label>
              <select
                className="admin-field"
                id="visibility"
                name="visibility"
                defaultValue={draft.visibility}
              >
                {VISIBILITIES.map((visibility) => (
                  <option key={visibility} value={visibility}>
                    {STATES[visibility]?.label ?? visibility}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label className="admin-label" htmlFor="expires">
                Expire le
              </label>
              <input
                className="admin-field"
                id="expires"
                name="expires"
                type="date"
                defaultValue={draft.expires?.slice(0, 10) ?? ''}
              />
              <p className="admin-hint">
                Vide : la notice ne cesse jamais de s’afficher.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <input
                id="unpublishedOnExpiration"
                name="unpublishedOnExpiration"
                type="checkbox"
                defaultChecked={draft.unpublishedOnExpiration}
                style={{
                  margin: '2px 0 0',
                  width: 16,
                  height: 16,
                  accentColor: 'var(--accent)',
                }}
              />
              <label
                htmlFor="unpublishedOnExpiration"
                style={{ fontSize: 13, lineHeight: 1.45 }}
              >
                Retirer de l’affichage à l’expiration
                <span
                  style={{
                    display: 'block',
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                  }}
                >
                  Sans cette case, la notice reste visible après la date — c’est
                  le cas de 2 008 notices sur les 2 017 dont la date est passée.
                </span>
              </label>
            </div>
          </section>

          <section className="admin-card" aria-labelledby="title-meta">
            <h2 id="title-meta">Langue et note</h2>

            <div style={{ marginBottom: 16 }}>
              <label className="admin-label" htmlFor="locale">
                Langue du message
              </label>
              <select
                className="admin-field"
                id="locale"
                name="locale"
                defaultValue={draft.locale ?? ''}
              >
                <option value="">Langue par défaut du contributeur</option>
                <LanguageOptions />
              </select>
            </div>

            <div>
              <label className="admin-label" htmlFor="note">
                Note privée
              </label>
              <textarea
                className="admin-field"
                id="note"
                name="note"
                rows={4}
                defaultValue={draft.note ?? ''}
                placeholder="Jamais exposée par l’API."
              />
            </div>
          </section>
        </aside>
      </div>
    </form>
  );
};
