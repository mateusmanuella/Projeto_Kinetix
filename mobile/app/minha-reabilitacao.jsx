import { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { styles } from "../src/styles";
import { useAuth } from "../src/state/AuthContext";
import api from "../src/api/client";

export default function MinhaReabilitacao() {
  const { user } = useAuth();
  const [plano, setPlano] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlano() {
      try {
        const response = await api.get(`/api/pacientes/${user.userId}/plano-atual`);
        setPlano(response.data);
      } catch (err) {
        console.log("Erro ao carregar plano");
      } finally {
        setLoading(false);
      }
    }
    loadPlano();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#00C49A" />;

  if (!plano) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Voce ainda nao possui um plano de reabilitacao ativo.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Plano</Text>
      <Text style={styles.subtitle}>Fisioterapeuta: {plano.fisioterapeutaNome}</Text>
      
      <FlatList
        data={plano.exercicios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={localStyles.card}>
            <Text style={localStyles.exerciseTitle}>{item.nomeExercicio}</Text>
            <Text style={styles.label}>{item.series} series de {item.repeticoes} repeticoes</Text>
            {item.tempoExecucao > 0 && <Text style={styles.label}>Tempo: {item.tempoExecucao}s</Text>}
            <Text style={localStyles.description}>{item.descricaoExercicio}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#00C49A', elevation: 2 },
  exerciseTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  description: { fontSize: 14, color: '#64748B', marginTop: 8 }
});
