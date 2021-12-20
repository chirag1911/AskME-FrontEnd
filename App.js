import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";

import { Navigation } from "./src/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/autentication.context";
import { QuestionsContextProvider } from "./src/services/questions/questions.context";

export default function App() {
  return (
    <>
      <AuthenticationContextProvider>
        <QuestionsContextProvider>
          <Navigation />
        </QuestionsContextProvider>
      </AuthenticationContextProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
