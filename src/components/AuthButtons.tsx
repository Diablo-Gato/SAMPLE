'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export function AuthButtons() {
  const { user, error, isLoading } = useUser();

  return (
    <div className="d-flex align-items-center gap-2">
      {isLoading && <span className="text-muted small">Loading...</span>}
      {error && <span className="text-danger small">Auth error</span>}
      {user ? (
        <>
          {user.picture && (
            <img src={user.picture} alt={user.name ?? 'User'} width={28} height={28} className="rounded-circle" />
          )}
          <span className="small text-white">{user.name}</span>
          <Link href="/api/auth/logout" className="btn btn-outline-light btn-sm">
            Logout
          </Link>
        </>
      ) : (
        <Link href="/api/auth/login" className="btn btn-light btn-sm">
          Login
        </Link>
      )}
    </div>
  );
}
