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

const labelClass = "text-sm font-medium text-slate-700 dark:text-slate-300";
const fieldClass = "mt-1 h-11 w-full rounded border border-slate-300 bg-white px-3 outline-none focus:border-sky dark:border-darkTheme-border dark:bg-darkTheme-surface dark:text-darkTheme-text";

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
          <h2 className="text-2xl font-semibold text-ink dark:text-darkTheme-text">Cadastro</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-darkTheme-muted">Preencha os dados essenciais para iniciar.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Nome</span>
            <input className={fieldClass} value={form.nome} onChange={(event) => update("nome", event.target.value)} required />
          </label>

          <label className="block">
            <span className={labelClass}>Email</span>
            <input className={fieldClass} type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
          </label>

          <label className="block">
            <span className={labelClass}>Senha</span>
            <input className={fieldClass} type="password" value={form.senha} onChange={(event) => update("senha", event.target.value)} required minLength={8} />
          </label>

          <label className="block">
            <span className={labelClass}>Perfil</span>
            <select className={fieldClass} value={form.role} onChange={(event) => update("role", event.target.value)}>
              <option value="PACIENTE">Paciente</option>
              <option value="FISIOTERAPEUTA">Fisioterapeuta</option>
              <option value="CLINICA">Clinica</option>
            </select>
          </label>

          {form.role === "PACIENTE" && (
            <>
              <label className="block">
                <span className={labelClass}>Telefone</span>
                <input className={fieldClass} value={form.telefone} onChange={(event) => update("telefone", event.target.value)} />
              </label>
              <label className="block">
                <span className={labelClass}>Data de nascimento</span>
                <input className={fieldClass} type="date" value={form.dataNascimento} onChange={(event) => update("dataNascimento", event.target.value)} />
              </label>
            </>
          )}

          {form.role === "FISIOTERAPEUTA" && (
            <label className="block">
              <span className={labelClass}>CREFITO</span>
              <input className={fieldClass} value={form.crefito} onChange={(event) => update("crefito", event.target.value)} required />
            </label>
          )}

          {form.role === "CLINICA" && (
            <>
              <label className="block">
                <span className={labelClass}>Nome da clinica</span>
                <input className={fieldClass} value={form.nomeClinica} onChange={(event) => update("nomeClinica", event.target.value)} required />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelClass}>Endereco</span>
                <input className={fieldClass} value={form.enderecoClinica} onChange={(event) => update("enderecoClinica", event.target.value)} required />
              </label>
            </>
          )}
        </div>

        <label className="flex items-start gap-3 rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-darkTheme-border dark:bg-darkTheme-surface dark:text-slate-300">
          <input className="mt-1" type="checkbox" checked={form.aceiteTermos} onChange={(event) => update("aceiteTermos", event.target.checked)} required />
          <span>Aceito os termos de uso e a politica de privacidade.</span>
        </label>

        {error && <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded bg-mint px-4 font-semibold text-ink disabled:opacity-60" type="submit" disabled={loading}>
          <UserPlus size={18} />
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="text-center text-sm text-slate-600 dark:text-darkTheme-muted">
          Ja tem conta?{" "}
          <Link className="font-semibold text-sky" to="/login">
            Entrar
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

