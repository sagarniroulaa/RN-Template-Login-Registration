import WelcomeScreen from "./app/screens/WelcomeScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <WelcomeScreen />
      <StatusBar style="auto" />
    </>
  );
}
