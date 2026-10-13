"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <main className="login">
      <form action={action} className="login-card">
        <h1>Admin</h1>
        <p className="muted">Log in to edit your portfolio.</p>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
        {state?.error && <p className="error" role="alert">{state.error}</p>}
        <button className="btn primary" disabled={pending}>{pending ? "Checking…" : "Log in"}</button>
        <a href="/" className="muted small">← Back to the site</a>
      </form>
    </main>
  );
}
