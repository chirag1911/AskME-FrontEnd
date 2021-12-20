import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../features/questions/screens/question-list.screen";
import { AccountNavigation } from "./account.navigation";
import { QuestionDetail } from "../features/questions/screens/question-detail.screen";

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="QuestionDetailScreen" component={QuestionDetail} />
        <Stack.Screen name="AccountNavigator" component={AccountNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
