'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import type { EditableContributor } from '@dismoi/api/application/Supervision';
import { thumbnailStoragePath } from '@dismoi/api/domain/UploadedImage';
import {
  SubmitButton,
  Confirmation,
  LanguageOptions,
  Rejection,
} from '../../fields';
import { category, excerpt } from '../../format';
import { createContributor, saveContributor } from './actions';
import { IMAGE_SLOTS, type ImageSlot } from './images';

// A client component for one reason: the order of the pinned notices is
// rearranged by hand, and that order is the one the profile page follows.

const ImageField = ({
  slot,
  current,
}: {
  readonly slot: ImageSlot;
  readonly current: string | null;
}) => (
  <div style={{ display: 'grid', gap: 6, marginBottom: 16 }}>
    <label
      htmlFor={`image-${slot.name}`}
      style={{ fontSize: 13, fontWeight: 600 }}
    >
      {slot.label}
    </label>
    {current === null ? (
      <p className="admin-hint" style={{ margin: 0 }}>
        Aucune image.
      </p>
    ) : (
      <img
        src={`/${thumbnailStoragePath('m_thumb', slot.field, current)}`}
        alt={`${slot.label} actuel`}
        style={{
          width: 72,
          height: 72,
          objectFit: 'cover',
          borderRadius: 6,
          background: 'var(--background)',
        }}
      />
    )}
    <input
      id={`image-${slot.name}`}
      type="file"
      name={slot.name}
      accept="image/png,image/jpeg,image/webp"
      style={{ fontSize: 13 }}
    />
  </div>
);

// What the form writes. The notices it signs and its subscriber count
// belong to a contributor that exists, and a creation has neither.
export type ContributorDraft = Omit<
  EditableContributor,
  'id' | 'notices' | 'totalSubscriptions'
> & { readonly id: number | null };

const BLANK: ContributorDraft = {
  id: null,
  name: '',
  title: null,
  email: null,
  website: null,
  intro: null,
  locale: 'fr',
  categories: [],
  enabled: true,
  avatar: null,
  banner: null,
  preview: null,
  pinned: [],
};

export const ContributorForm = ({
  contributor,
  knownCategories,
}: {
  // null when the contributor is being written for the first time.
  readonly contributor: EditableContributor | null;
  readonly knownCategories: ReadonlyArray<string>;
}) => {
  const saved = contributor;
  const draft: ContributorDraft = contributor ?? BLANK;

  const [state, act] = useFormState(
    saved === null ? createContributor : saveContributor,
    null,
  );
  const [pinned, setPinned] = useState(draft.pinned);

  const move = (rank: number, step: number) =>
    setPinned((current) => {
      const target = rank + step;
      if (target < 0 || target >= current.length) return current;

      const reordered = [...current];
      const [moved] = reordered.splice(rank, 1);
      if (moved === undefined) return current;
      reordered.splice(target, 0, moved);
      return reordered;
    });

  const remove = (rank: number) =>
    setPinned((current) => current.filter((_, i) => i !== rank));

  return (
    <form action={act}>
      <input type="hidden" name="id" value={draft.id ?? ''} />
      <input
        type="hidden"
        name="pinned"
        value={pinned.map((pin) => pin.id).join(',')}
      />

      {state?.reasons !== undefined && state.reasons.length > 0 && (
        <Rejection
          title="Le contributeur n’a pas été enregistré :"
          reasons={state.reasons}
        />
      )}

      {state?.saved === true && (
        <Confirmation text="Contributeur enregistré." />
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
        <p
          className="admin-hint"
          style={{ margin: 0, flexGrow: 1, minWidth: 200 }}
        >
          {saved === null ? (
            'Les images se posent une fois le contributeur créé : elles portent son identifiant.'
          ) : (
            <>
              <span className="num">{saved.notices.public}</span> notices
              publiques sur <span className="num">{saved.notices.total}</span> ·{' '}
              <span className="num">{saved.totalSubscriptions}</span>{' '}
              abonnements cumulés depuis l’origine.
            </>
          )}
        </p>
        <SubmitButton label="Enregistrer" pending="Enregistrement…" />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        <div
          style={{
            flex: '999 1 520px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <section className="admin-card" aria-labelledby="title-identity">
            <h2 id="title-identity">Identité</h2>

            <div className="admin-grid-2">
              <div>
                <label className="admin-label" htmlFor="name">
                  Nom affiché
                </label>
                <input
                  className="admin-field"
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={draft.name}
                  required
                />
              </div>

              <div>
                <label className="admin-label" htmlFor="title">
                  Titre
                </label>
                <input
                  className="admin-field"
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={draft.title ?? ''}
                  placeholder="association de consommateurs"
                />
              </div>
            </div>

            <div className="admin-grid-2" style={{ marginTop: 16 }}>
              <div>
                <label className="admin-label" htmlFor="email">
                  Adresse électronique
                </label>
                <input
                  className="admin-field"
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={draft.email ?? ''}
                  aria-describedby="email-aide"
                />
                <p className="admin-hint" id="email-aide">
                  Destinataire des questions posées depuis l’extension.
                </p>
              </div>

              <div>
                <label className="admin-label" htmlFor="website">
                  Site web
                </label>
                <input
                  className="admin-field"
                  id="website"
                  name="website"
                  type="url"
                  defaultValue={draft.website ?? ''}
                />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="admin-label" htmlFor="intro">
                Présentation
              </label>
              <textarea
                className="admin-field"
                id="intro"
                name="intro"
                rows={4}
                defaultValue={draft.intro ?? ''}
                aria-describedby="intro-aide"
              />
              <p className="admin-hint" id="intro-aide">
                Affichée sur la page de profil et dans la liste des
                contributeurs de l’extension.
              </p>
            </div>
          </section>

          <section className="admin-card" aria-labelledby="title-pins">
            <h2 className="admin-tight" id="title-pins">
              Notices épinglées
            </h2>
            <p
              style={{
                margin: '0 0 14px',
                fontSize: 13,
                color: 'var(--ink-soft)',
              }}
            >
              Mises en avant sur la page de profil, dans cet ordre.
            </p>

            {pinned.length === 0 ? (
              <p className="admin-hint">Aucune notice épinglée.</p>
            ) : (
              <ol
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {pinned.map((pin, rank) => (
                  <li
                    key={pin.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 11,
                      padding: '10px 12px',
                      background: 'var(--background)',
                      borderRadius: 9,
                    }}
                  >
                    <span
                      className="num"
                      aria-hidden="true"
                      style={{
                        flex: '0 0 20px',
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--ink-soft)',
                      }}
                    >
                      {rank + 1}
                    </span>

                    <span style={{ flexGrow: 1, minWidth: 0, fontSize: 13 }}>
                      {excerpt(pin.message, 110)}
                      <span
                        className="num"
                        style={{
                          display: 'block',
                          fontSize: 11,
                          color: 'var(--ink-soft)',
                        }}
                      >
                        #{pin.id}
                      </span>
                    </span>

                    <button
                      type="button"
                      onClick={() => move(rank, -1)}
                      disabled={rank === 0}
                      aria-label={`Remonter la notice ${pin.id}`}
                      className="admin-button-secondary"
                      style={{ padding: '5px 9px' }}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => move(rank, 1)}
                      disabled={rank === pinned.length - 1}
                      aria-label={`Descendre la notice ${pin.id}`}
                      className="admin-button-secondary"
                      style={{ padding: '5px 9px' }}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(rank)}
                      aria-label={`Désépingler la notice ${pin.id}`}
                      className="admin-button-secondary"
                      style={{ padding: '5px 9px' }}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        <aside
          style={{
            flex: '1 1 280px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <section className="admin-card" aria-labelledby="title-ranking">
            <h2 id="title-ranking">Classement</h2>

            <fieldset
              style={{ margin: '0 0 18px', padding: 0, border: 'none' }}
            >
              <legend className="admin-label" style={{ padding: 0 }}>
                Catégories
              </legend>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  marginTop: 4,
                }}
              >
                {knownCategories.map((name) => (
                  <label
                    key={name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 9,
                      fontSize: 13,
                    }}
                  >
                    <input
                      type="checkbox"
                      name="categories"
                      value={name}
                      defaultChecked={draft.categories.includes(name)}
                      style={{
                        width: 16,
                        height: 16,
                        accentColor: 'var(--accent)',
                      }}
                    />
                    {category(name)}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label className="admin-label" htmlFor="locale">
                Langue par défaut
              </label>
              <select
                className="admin-field"
                id="locale"
                name="locale"
                defaultValue={draft.locale ?? ''}
              >
                <option value="">— aucune —</option>
                <LanguageOptions />
              </select>
              <p className="admin-hint">
                Les notices sans langue propre héritent de celle-ci : c’est le
                cas de la quasi-totalité d’entre elles.
              </p>
            </div>
          </section>

          <section className="admin-card" aria-labelledby="title-state">
            <h2 id="title-state">État</h2>

            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <input
                id="enabled"
                name="enabled"
                type="checkbox"
                defaultChecked={draft.enabled}
                style={{
                  margin: '2px 0 0',
                  width: 16,
                  height: 16,
                  accentColor: 'var(--accent)',
                }}
              />
              <label
                htmlFor="enabled"
                style={{ fontSize: 13, lineHeight: 1.45 }}
              >
                Contributeur actif
                <span
                  style={{
                    display: 'block',
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                  }}
                >
                  Désactivé, il disparaît de la liste servie à l’extension et
                  ses notices cessent d’être proposées — sans rien supprimer.
                </span>
              </label>
            </div>
          </section>

          <section className="admin-card" aria-labelledby="title-images">
            <h2 id="title-images">Images</h2>
            {IMAGE_SLOTS.map((slot) => (
              <ImageField
                key={slot.name}
                slot={slot}
                current={saved === null ? null : slot.current(saved)}
              />
            ))}
            <p className="admin-hint">
              PNG, JPEG ou WebP, 5 Mo au plus. Le fichier choisi remplace le
              précédent à l’enregistrement ; l’ancien reste dans le stockage.
            </p>
          </section>
        </aside>
      </div>
    </form>
  );
};
