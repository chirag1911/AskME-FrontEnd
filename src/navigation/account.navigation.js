import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../features/account/screens/login.screen";
import { RegisterScreen } from "../features/account/screens/register.screen";

const Stack = createStackNavigator();

export const AccountNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
