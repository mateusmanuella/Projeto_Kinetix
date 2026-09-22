import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../src/state/AuthContext";

export default function Index() {
  const { session, loadingSession } = useAuth();

  if (loadingSession) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f5f7f8" }}>
        <ActivityIndicator color="#5C91FE" />
      </View>
    );
  }

  return <Redirect href={session ? "/minha-reabilitacao" : "/login"} />;
}
