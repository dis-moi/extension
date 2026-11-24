import React from 'react';
import { redirect } from 'next/navigation';
import '../admin.css';
import { currentAccount } from '../session';
import { SignInForm } from './form';

export const metadata = { title: 'Connexion — Admin DisMoi' };

export const dynamic = 'force-dynamic';

const SignInPage = async () => {
  // Already signed in: no need to ask again.
  if ((await currentAccount()) !== null) redirect('/admin');

  return (
    <div className="admin">
      <div className="admin-sign-in">
        <div className="admin-sign-in-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 22,
            }}
          >
            <span className="admin-brand-token" aria-hidden="true">
              D
            </span>
            <span style={{ fontWeight: 700, fontSize: 17 }}>
              Administration DisMoi
            </span>
          </div>

          <div className="admin-card">
            <h1
              style={{
                margin: '0 0 4px',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Connexion
            </h1>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: 13,
                color: 'var(--ink-soft)',
              }}
            >
              Les comptes sont ceux de l’ancienne administration.
            </p>

            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
