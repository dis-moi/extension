'use client';

import React, { useState } from 'react';
import type { EditableContext } from '@dismoi/api/application/Supervision';
import {
  tryTargeting,
  type TargetingVerdict,
} from '@dismoi/api/domain/TargetingAttempt';

// regex_validator.js of the former administration only checked the syntax,
// so a pattern that was valid but matched nothing went through unflagged.

const APPEARANCES: Record<
  TargetingVerdict['state'],
  { readonly background: string; readonly border: string; readonly ink: string }
> = {
  empty: { background: '#faf9f7', border: '#eeebe5', ink: '#5f656c' },
  matches: { background: '#f7f9fd', border: '#cfdcf2', ink: '#0f3d87' },
  'does-not-match': {
    background: '#fdf8ec',
    border: '#e8d9b4',
    ink: '#7a5200',
  },
  invalid: { background: '#fdf0ed', border: '#f0cdc5', ink: '#8a2a16' },
};

export const ContextFields = ({
  rank,
  context,
  onRemove,
}: {
  readonly rank: number;
  readonly context: EditableContext | null;
  readonly onRemove: () => void;
}) => {
  const [exampleUrl, setExampleUrl] = useState(context?.exampleUrl ?? '');
  const [pathPattern, setPathPattern] = useState(context?.urlRegex ?? '');
  const [domains, setDomains] = useState(
    (context?.domains ?? []).map((domain) => domain.name).join(', '),
  );

  const domainList = domains
    .split(/[,\s]+/)
    .map((name) => name.trim())
    .filter((name) => name !== '');

  const verdict = tryTargeting(domainList, pathPattern, exampleUrl);
  const appearance = APPEARANCES[verdict.state];
  const prefix = `contexts.${rank}`;

  return (
    <fieldset className="admin-group" style={{ marginTop: 14 }}>
      <legend
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <span>Contexte {rank + 1}</span>
        <button
          type="button"
          aria-label={`Supprimer le contexte ${rank + 1}`}
          onClick={onRemove}
          style={{
            display: 'inline-flex',
            padding: 4,
            border: 'none',
            background: 'transparent',
            color: '#5f656c',
            cursor: 'pointer',
          }}
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M3 3l8 8M11 3l-8 8" />
          </svg>
        </button>
      </legend>

      <input type="hidden" name={`${prefix}.id`} value={context?.id ?? ''} />

      <div className="admin-grid-2" style={{ marginTop: 4 }}>
        <div>
          <label className="admin-label" htmlFor={`${prefix}.description`}>
            Description interne
          </label>
          <input
            className="admin-field"
            id={`${prefix}.description`}
            name={`${prefix}.description`}
            type="text"
            defaultValue={context?.description ?? ''}
          />
        </div>

        <div>
          <label className="admin-label" htmlFor={`${prefix}.exampleUrl`}>
            URL d’exemple
          </label>
          <input
            className="admin-field admin-mono"
            id={`${prefix}.exampleUrl`}
            name={`${prefix}.exampleUrl`}
            type="url"
            value={exampleUrl}
            onChange={(event) => setExampleUrl(event.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <label className="admin-label" htmlFor={`${prefix}.domains`}>
          Domaines
        </label>
        <input
          className="admin-field admin-mono"
          id={`${prefix}.domains`}
          name={`${prefix}.domains`}
          type="text"
          value={domains}
          onChange={(event) => setDomains(event.target.value)}
          placeholder="exemple.fr, boutique.exemple.fr"
          aria-describedby={`${prefix}.domains-hint`}
        />
        <p className="admin-hint" id={`${prefix}.domains-hint`}>
          Séparés par des virgules. Les alias d’un domaine sont inclus
          automatiquement, et les points sont échappés avant l’envoi à
          l’extension.
          {context !== null && context.domainsSets.length > 0 && (
            <>
              {' '}
              Jeux rattachés :{' '}
              {context.domainsSets.map((set) => set.name).join(', ')}.
            </>
          )}
        </p>
      </div>

      <div style={{ marginTop: 16 }}>
        <label className="admin-label" htmlFor={`${prefix}.urlRegex`}>
          Motif du chemin
        </label>
        <input
          className="admin-field admin-mono"
          id={`${prefix}.urlRegex`}
          name={`${prefix}.urlRegex`}
          type="text"
          value={pathPattern}
          onChange={(event) => setPathPattern(event.target.value)}
          aria-describedby={`${prefix}.attempt`}
          required
        />

        <div
          id={`${prefix}.attempt`}
          role="status"
          style={{
            marginTop: 8,
            padding: '11px 13px',
            background: appearance.background,
            border: `1px solid ${appearance.border}`,
            borderRadius: 8,
          }}
        >
          <p
            style={{
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 12,
              fontWeight: 600,
              color: appearance.ink,
            }}
          >
            {verdict.state === 'matches' && (
              <>
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2.5 7.5l3 3 6-6.5" />
                </svg>
                L’URL d’exemple correspond
              </>
            )}
            {verdict.state === 'does-not-match' && (
              <>
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 3v5M7 10.5v.5" />
                </svg>
                L’URL d’exemple ne correspond pas : la notice ne s’affichera pas
              </>
            )}
            {verdict.state === 'invalid' && (
              <>Motif invalide : {verdict.message}</>
            )}
            {verdict.state === 'empty' && (
              <>Renseigne un motif et une URL d’exemple pour voir l’essai</>
            )}
          </p>

          {(verdict.state === 'matches' ||
            verdict.state === 'does-not-match') && (
            <p
              className="admin-mono"
              style={{
                margin: '6px 0 0',
                fontSize: 12,
                color: '#2a1f1c',
                overflowWrap: 'anywhere',
              }}
            >
              Motif envoyé à l’extension : {verdict.pattern}
            </p>
          )}
        </div>
      </div>

      <div className="admin-grid-2" style={{ marginTop: 16 }}>
        <div>
          <label className="admin-label" htmlFor={`${prefix}.excludeUrlRegex`}>
            Exclure (motif)
          </label>
          <input
            className="admin-field admin-mono"
            id={`${prefix}.excludeUrlRegex`}
            name={`${prefix}.excludeUrlRegex`}
            type="text"
            defaultValue={context?.excludeUrlRegex ?? ''}
          />
        </div>

        <div>
          <label className="admin-label" htmlFor={`${prefix}.xpath`}>
            XPath du point d’accroche
          </label>
          <input
            className="admin-field admin-mono"
            id={`${prefix}.xpath`}
            name={`${prefix}.xpath`}
            type="text"
            defaultValue={context?.xpath ?? ''}
            placeholder="//main//h1"
            aria-describedby={`${prefix}.xpath-hint`}
          />
          <p className="admin-hint" id={`${prefix}.xpath-hint`}>
            Facultatif : place la bulle à côté d’un élément précis.
          </p>
        </div>
      </div>

      <input
        type="hidden"
        name={`${prefix}.querySelector`}
        value={context?.querySelector ?? ''}
      />
    </fieldset>
  );
};
