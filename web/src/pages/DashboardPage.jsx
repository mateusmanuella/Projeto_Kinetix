import React from 'react';
import { CalendarDays, LogOut, ShieldAlert, Users } from "lucide-react";
import { useAuth } from "../state/AuthContext.jsx";

export default function DashboardPage() {
  const { session, logout } = useAuth();

  return (
    <main className="min-h-screen bg-[#f5f7f8]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div>
            <strong className="block text-lg text-ink">KINETIX</strong>
            <span className="text-sm text-slate-500">{session?.role}</span>
          </div>
          <button className="inline-flex h-10 items-center gap-2 rounded border border-slate-300 px-3 text-sm font-medium" onClick={logout}>
            <LogOut size={17} />
            Sair
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="text-2xl font-semibold text-ink">Dashboard</h1>
        <p className="mt-1 text-slate-600">Bem-vindo, {session?.name}.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded border border-slate-200 bg-white p-5">
            <Users className="text-sky" size={24} />
            <h2 className="mt-4 text-lg font-semibold">Pacientes ativos</h2>
            <p className="mt-1 text-3xl font-semibold">0</p>
          </article>
          <article className="rounded border border-slate-200 bg-white p-5">
            <ShieldAlert className="text-coral" size={24} />
            <h2 className="mt-4 text-lg font-semibold">Alertas criticos</h2>
            <p className="mt-1 text-3xl font-semibold">0</p>
          </article>
          <article className="rounded border border-slate-200 bg-white p-5">
            <CalendarDays className="text-mint" size={24} />
            <h2 className="mt-4 text-lg font-semibold">Consultas hoje</h2>
            <p className="mt-1 text-3xl font-semibold">0</p>
          </article>
        </div>
      </section>
    </main>
  );
}
