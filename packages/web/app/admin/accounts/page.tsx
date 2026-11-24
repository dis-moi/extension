import React from 'react';
import { Effect } from 'effect';
import { Administrators } from '@dismoi/api/application/Administrators';
import { run } from '../../../lib/effect';
import '../admin.css';
import { Chrome } from '../chrome';
import { shortDate, since, number } from '../format';
import { requireRole } from '../session';
import { setAccountEnabled } from './actions';

export const metadata = { title: 'Comptes — Admin DisMoi' };
export const dynamic = 'force-dynamic';

const ROLES: ReadonlyArray<{
  readonly role: string;
  readonly label: string;
}> = [
  { role: 'ROLE_SUPER_ADMIN', label: 'Super administrateur' },
  { role: 'ROLE_ADMIN', label: 'Administrateur' },
  { role: 'ROLE_USER', label: 'Utilisateur' },
];

const widestRole = (roles: ReadonlyArray<string>): string => {
  const found = ROLES.find((entry) => roles.includes(entry.role));
  return found?.label ?? roles[0] ?? '—';
};

const AccountsPage = async () => {
  const me = await requireRole('ROLE_ADMIN');

  const accounts = await run(
    Effect.gen(function* () {
      const administrators = yield* Administrators;
      return yield* administrators.all;
    }),
  );

  const enabled = accounts.filter((account) => account.enabled).length;
  const canSignIn = accounts.filter((account) => account.canSignIn);
  const neverCame = accounts.filter(
    (account) => account.lastSignIn === null,
  ).length;

  return (
    <Chrome account={me} active="accounts">
      <div className="admin-title-row">
        <h1>Comptes</h1>
        <p className="admin-subtitle">
          <span className="num">{number(accounts.length)}</span> comptes,{' '}
          <span className="num">{number(enabled)}</span> actifs.
        </p>
      </div>

      <div className="admin-grid-3" style={{ marginBottom: 20 }}>
        <div className="admin-card admin-tile">
          <h3>Peuvent se connecter</h3>
          <p className="admin-tile-value num">{number(canSignIn.length)}</p>
          <p className="admin-tile-detail">
            actifs et porteurs d’une empreinte bcrypt utilisable
          </p>
        </div>

        <div className="admin-card admin-tile">
          <h3>Jamais connectés</h3>
          <p className="admin-tile-value num">{number(neverCame)}</p>
          <p className="admin-tile-detail">aucune connexion enregistrée</p>
        </div>

        <div className="admin-card admin-tile">
          <h3>Mot de passe</h3>
          <p
            className="admin-mono"
            style={{
              margin: '2px 0 4px',
              fontSize: 13,
              fontWeight: 600,
              overflowWrap: 'anywhere',
            }}
          >
            yarn admin:password
          </p>
          <p className="admin-tile-detail">
            Posé en ligne de commande, jamais depuis le navigateur : le mot de
            passe ne traverse alors aucun formulaire.
          </p>
        </div>
      </div>

      <div className="admin-table-box">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <caption>
              Un compte ne se supprime pas : désactivé, il ne peut plus se
              connecter mais garde la trace de ce qu’il a fait.
            </caption>

            <thead>
              <tr>
                <th scope="col">Identifiant</th>
                <th scope="col">Adresse</th>
                <th scope="col">Rôle</th>
                <th scope="col">Dernière connexion</th>
                <th scope="col">État</th>
                <th scope="col">
                  <span className="admin-invisible">Action</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((account) => {
                const isMe = account.id === me.id;

                return (
                  <tr key={account.id}>
                    <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {account.username}
                      {isMe && (
                        <span
                          className="admin-state admin-state-accent"
                          style={{ marginLeft: 8 }}
                        >
                          vous
                        </span>
                      )}
                    </td>

                    <td className="admin-note">{account.email}</td>

                    <td style={{ fontSize: 12 }}>
                      {widestRole(account.roles)}
                    </td>

                    <td
                      style={{
                        whiteSpace: 'nowrap',
                        fontSize: 12,
                        color: 'var(--ink-soft)',
                      }}
                    >
                      {account.lastSignIn === null ? (
                        'jamais'
                      ) : (
                        <>
                          {shortDate(account.lastSignIn)}
                          <span style={{ display: 'block', fontSize: 11 }}>
                            {since(account.lastSignIn)}
                          </span>
                        </>
                      )}
                    </td>

                    <td>
                      <span
                        className={`admin-state ${
                          account.enabled
                            ? 'admin-state-public'
                            : 'admin-state-neutral'
                        }`}
                      >
                        {account.enabled ? 'Actif' : 'Désactivé'}
                      </span>
                      {account.enabled && !account.canSignIn && (
                        <span
                          className="admin-state admin-state-attention"
                          style={{ marginLeft: 6 }}
                          title="L’empreinte stockée n’est pas un bcrypt utilisable : la connexion échouera."
                        >
                          sans mot de passe
                        </span>
                      )}
                    </td>

                    <td>
                      {isMe ? (
                        <span
                          style={{
                            fontSize: 12,
                            color: 'var(--ink-soft)',
                          }}
                        >
                          —
                        </span>
                      ) : (
                        <form action={setAccountEnabled}>
                          <input type="hidden" name="id" value={account.id} />
                          <input
                            type="hidden"
                            name="enabled"
                            value={account.enabled ? 'no' : 'yes'}
                          />
                          <button
                            className="admin-button-secondary"
                            type="submit"
                            style={{ padding: '5px 11px', fontSize: 12 }}
                          >
                            {account.enabled ? 'Désactiver' : 'Activer'}
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Chrome>
  );
};

export default AccountsPage;
