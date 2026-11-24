import React from 'react';
import Link from 'next/link';
import type { Administrator } from '@dismoi/api/application/Administrators';
import { hasRole } from '@dismoi/api/application/Administrators';
import { signOut } from './actions';

// Entries marked `reserved` mirror the ROLE_ADMIN permissions of
// config/packages/easy_admin.yaml. Hiding the link is a convenience, not the
// guard: the pages and actions behind them call requireRole themselves.

export type Section =
  | 'activity'
  | 'notices'
  | 'contributors'
  | 'domains'
  | 'restricted'
  | 'accounts';

const ENTRIES: ReadonlyArray<{
  readonly section: Section;
  readonly label: string;
  readonly href: string;
  readonly reserved?: boolean;
}> = [
  { section: 'activity', label: 'Activité', href: '/admin' },
  { section: 'notices', label: 'Notices', href: '/admin/notices' },
  {
    section: 'contributors',
    label: 'Contributeurs',
    href: '/admin/contributors',
  },
  {
    section: 'domains',
    label: 'Domaines',
    href: '/admin/domains',
    reserved: true,
  },
  {
    section: 'restricted',
    label: 'Contextes interdits',
    href: '/admin/restricted-contexts',
    reserved: true,
  },
  {
    section: 'accounts',
    label: 'Comptes',
    href: '/admin/accounts',
    reserved: true,
  },
];

const initials = (account: Administrator): string =>
  account.username.slice(0, 2).toUpperCase();

export const Chrome = ({
  account,
  active,
  children,
}: {
  readonly account: Administrator;
  readonly active: Section;
  readonly children: React.ReactNode;
}) => (
  <div className="admin">
    <header className="admin-header">
      <div className="admin-header-inner">
        <Link className="admin-brand" href="/admin">
          <span className="admin-brand-token" aria-hidden="true">
            D
          </span>
          DisMoi
        </Link>

        <nav className="admin-nav" aria-label="Sections">
          {ENTRIES.filter(
            (entry) =>
              entry.reserved !== true || hasRole(account, 'ROLE_ADMIN'),
          ).map((entry) => (
            <Link
              key={entry.section}
              href={entry.href}
              aria-current={entry.section === active ? 'page' : undefined}
            >
              {entry.label}
            </Link>
          ))}
        </nav>

        <div className="admin-account">
          <span>{account.username}</span>
          <span className="admin-chip" aria-hidden="true">
            {initials(account)}
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="admin-button-secondary"
              style={{ padding: '6px 11px', minHeight: 0, fontSize: 13 }}
            >
              Quitter
            </button>
          </form>
        </div>
      </div>
    </header>

    <main className="admin-body">{children}</main>
  </div>
);
