import React from 'react';
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";
import { useAuth } from "../state/AuthContext.jsx";

const initialForm = {
  nome: "",
  email: "",
  senha: "",
  role: "PACIENTE",
  telefone: "",
  dataNascimento: "",
  crefito: "",
  nomeClinica: "",
  enderecoClinica: "",
  aceiteTermos: false
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        dataNascimento: form.dataNascimento || null
      };
      await register(payload);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message ?? "Nao foi possivel cadastrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Crie uma conta KINETIX"
      subtitle="O cadastro define o perfil de acesso e registra o consentimento para tratamento dos dados."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Cadastro</h2>
          <p className="mt-1 text-sm text-slate-500">Preencha os dados essenciais para iniciar.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Nome</span>
            <input className="mt-1 h-11 w-full rounded border border-slate-300 px-3 outline-none focus:border-sky" value={form.nome} onChange={(event) => update("nome", event.target.value)} required />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input className="mt-1 h-11 w-full rounded border border-slate-300 px-3 outline-none focus:border-sky" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Senha</span>
            <input className="mt-1 h-11 w-full rounded border border-slate-300 px-3 outline-none focus:border-sky" type="password" value={form.senha} onChange={(event) => update("senha", event.target.value)} required minLength={8} />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Perfil</span>
            <select className="mt-1 h-11 w-full rounded border border-slate-300 px-3 outline-none focus:border-sky" value={form.role} onChange={(event) => update("role", event.target.value)}>
              <option value="PACIENTE">Paciente</option>
              <option value="FISIOTERAPEUTA">Fisioterapeuta</option>
              <option value="CLINICA">Clinica</option>
            </select>
          </label>

          {form.role === "PACIENTE" && (
            <>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Telefone</span>
                <input className="mt-1 h-11 w-full rounded border border-slate-300 px-3 outline-none focus:border-sky" value={form.telefone} onChange={(event) => update("telefone", event.target.value)} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Data de nascimento</span>
                <input className="mt-1 h-11 w-full rounded border border-slate-300 px-3 outline-none focus:border-sky" type="date" value={form.dataNascimento} onChange={(event) => update("dataNascimento", event.target.value)} />
              </label>
            </>
          )}

          {form.role === "FISIOTERAPEUTA" && (
            <label className="block">
              <span className="text-sm font-medium text-slate-700">CREFITO</span>
              <input className="mt-1 h-11 w-full rounded border border-slate-300 px-3 outline-none focus:border-sky" value={form.crefito} onChange={(event) => update("crefito", event.target.value)} required />
            </label>
          )}

          {form.role === "CLINICA" && (
            <>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Nome da clinica</span>
                <input className="mt-1 h-11 w-full rounded border border-slate-300 px-3 outline-none focus:border-sky" value={form.nomeClinica} onChange={(event) => update("nomeClinica", event.target.value)} required />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Endereco</span>
                <input className="mt-1 h-11 w-full rounded border border-slate-300 px-3 outline-none focus:border-sky" value={form.enderecoClinica} onChange={(event) => update("enderecoClinica", event.target.value)} required />
              </label>
            </>
          )}
        </div>

        <label className="flex items-start gap-3 rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <input className="mt-1" type="checkbox" checked={form.aceiteTermos} onChange={(event) => update("aceiteTermos", event.target.checked)} required />
          <span>Aceito os termos de uso e a politica de privacidade.</span>
        </label>

        {error && <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded bg-mint px-4 font-semibold text-ink disabled:opacity-60" type="submit" disabled={loading}>
          <UserPlus size={18} />
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="text-center text-sm text-slate-600">
          Ja tem conta?{" "}
          <Link className="font-semibold text-sky" to="/login">
            Entrar
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
