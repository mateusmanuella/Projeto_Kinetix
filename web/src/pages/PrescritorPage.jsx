import { useState, useEffect } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import api from "../services/api"; // Assumindo instancia axios configurada

export default function PrescritorPage() {
  const [pacientes, setPacientes] = useState([]);
  const [exerciciosBase, setExerciciosBase] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState("");
  const [plano, setPlano] = useState([]); // Array de { exercicioId, series, repeticoes, tempoExecucao }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carregar dados iniciais (Simplificado para o exemplo)
    api.get("/pacientes").then(res => setPacientes(res.data));
    api.get("/exercicios").then(res => setExerciciosBase(res.data));
  }, []);

  const addExercicio = () => {
    setPlano([...plano, { exercicioId: "", series: 3, repeticoes: 10, tempoExecucao: 0 }]);
  };

  const removeExercicio = (index) => {
    setPlano(plano.filter((_, i) => i !== index));
  };

  const updateExercicio = (index, field, value) => {
    const newPlano = [...plano];
    newPlano[index][field] = value;
    setPlano(newPlano);
  };

  async function handleSalvar() {
    if (!selectedPaciente || plano.length === 0) return alert("Selecione um paciente e adicione exercicios.");
    
    setLoading(true);
    try {
      await api.post(`/api/pacientes/${selectedPaciente}/plano-reabilitacao`, {
        fisioterapeutaId: 1, // Logica de pegar ID do profissional logado
        exercicios: plano
      });
      alert("Plano salvo com sucesso!");
      setPlano([]);
    } catch (err) {
      alert("Erro ao salvar plano.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ink">Prescritor Digital</h1>
          <p className="text-slate-500">Monte o plano de reabilitacao personalizado.</p>
        </div>
        <button 
          onClick={handleSalvar}
          disabled={loading}
          className="bg-mint text-ink px-6 py-2 rounded font-bold flex items-center gap-2"
        >
          <Save size={20} />
          {loading ? "Salvando..." : "Salvar Plano"}
        </button>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Paciente</label>
          <select 
            className="w-full border p-2 rounded"
            value={selectedPaciente}
            onChange={(e) => setSelectedPaciente(e.target.value)}
          >
            <option value="">Selecione um paciente...</option>
            {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>

        <div className="space-y-4">
          {plano.map((item, index) => (
            <div key={index} className="flex gap-4 items-end bg-slate-50 p-4 rounded border border-slate-200">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Exercicio</label>
                <select 
                  className="w-full border p-2 rounded"
                  value={item.exercicioId}
                  onChange={(e) => updateExercicio(index, "exercicioId", e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {exerciciosBase.map(ex => <option key={ex.id} value={ex.id}>{ex.nome}</option>)}
                </select>
              </div>
              <div className="w-20">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Series</label>
                <input type="number" className="w-full border p-2 rounded" value={item.series} onChange={(e) => updateExercicio(index, "series", e.target.value)} />
              </div>
              <div className="w-20">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Reps</label>
                <input type="number" className="w-full border p-2 rounded" value={item.repeticoes} onChange={(e) => updateExercicio(index, "repeticoes", e.target.value)} />
              </div>
              <div className="w-24">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Tempo (s)</label>
                <input type="number" className="w-full border p-2 rounded" value={item.tempoExecucao} onChange={(e) => updateExercicio(index, "tempoExecucao", e.target.value)} />
              </div>
              <button onClick={() => removeExercicio(index)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <button 
          onClick={addExercicio}
          className="mt-6 flex items-center gap-2 text-sky font-semibold hover:underline"
        >
          <Plus size={20} />
          Adicionar exercicio
        </button>
      </section>
    </div>
  );
}