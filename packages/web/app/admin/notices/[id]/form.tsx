'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import type {
  EditableContext,
  EditableNotice,
} from '@dismoi/api/application/Supervision';
import { VISIBILITIES } from '@dismoi/api/domain/NoticeVisibility';
import {
  SubmitButton,
  Confirmation,
  LanguageOptions,
  Rejection,
} from '../../fields';
import { STATES } from '../../format';
import { ContextFields } from './context';
import { saveNotice } from './actions';

// A client component only for the collection of contexts and the live
// pattern test: saving, validation and writing stay on the server.

export const NoticeForm = ({
  notice,
  contributors,
}: {
  readonly notice: EditableNotice;
  readonly contributors: ReadonlyArray<{
    readonly id: number;
    readonly name: string;
  }>;
}) => {
  const [state, act] = useFormState(saveNotice, null);

  const [contexts, setContexts] = useState<
    ReadonlyArray<EditableContext | null>
  >(notice.contexts);

  const [message, setMessage] = useState(notice.message);

  const remove = (rank: number) =>
    setContexts((current) => current.filter((_, i) => i !== rank));

  const add = () => setContexts((current) => [...current, null]);

  return (
    <form action={act}>
      <input type="hidden" name="id" value={notice.id} />

      {state?.reasons !== undefined && state.reasons.length > 0 && (
        <Rejection
          title="La notice n’a pas été enregistrée :"
          reasons={state.reasons}
        />
      )}

      {state?.saved === true && <Confirmation text="Notice enregistrée." />}

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
            Notice #{notice.id}
          </span>
          <span className="admin-note">
            créée le {notice.created.slice(0, 10)} · modifiée le{' '}
            {notice.updated.slice(0, 10)}
          </span>
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

            {notice.screenshot !== null && (
              <div style={{ marginTop: 18 }}>
                <span className="admin-label">Capture d’écran</span>
                <p
                  className="admin-mono"
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {notice.screenshot}
                </p>
                <p className="admin-hint">
                  Le téléversement d’images n’est pas encore recâblé : les
                  fichiers existants restent servis par l’API.
                </p>
              </div>
            )}
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
                defaultValue={notice.excludeUrlRegex ?? ''}
                placeholder="motif appliqué en plus de chaque exclusion de contexte"
              />
            </div>
          </section>

          <section className="admin-card" aria-labelledby="title-activity">
            <h2 id="title-activity">Activité de cette notice</h2>

            <div className="admin-grid-4">
              {[
                { name: 'Badges', value: notice.counters.badge },
                { name: 'Affichages', value: notice.counters.displays },
                { name: 'Dépliements', value: notice.counters.unfolds },
                {
                  name: 'Clics sortants',
                  value: notice.counters.outboundClicks,
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
              J’aime <span className="num">{notice.counters.likes}</span> · Je
              n’aime pas <span className="num">{notice.counters.dislikes}</span>{' '}
              · Masquages{' '}
              <span className="num">{notice.counters.dismissals}</span> — ce
              sont des soldes, retours en arrière déduits.
            </p>
          </section>
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
                  notice.contributorId === null
                    ? ''
                    : String(notice.contributorId)
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
                defaultValue={notice.relayers.map((relayeur) =>
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
                defaultValue={notice.visibility}
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
                defaultValue={notice.expires?.slice(0, 10) ?? ''}
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
                defaultChecked={notice.unpublishedOnExpiration}
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
                defaultValue={notice.locale ?? ''}
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
                defaultValue={notice.note ?? ''}
                placeholder="Jamais exposée par l’API."
              />
            </div>
          </section>
        </aside>
      </div>
    </form>
  );
};
