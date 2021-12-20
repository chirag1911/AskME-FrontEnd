import React, { useState, useContext } from "react";
import { Text } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { AuthenticationContext } from "../../../services/authentication/autentication.context";
import { Container, InputArea, AuthButton } from "../components/account.style";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const { onLogin, isLoading, error } = useContext(AuthenticationContext);

  const handleLogin = async () => {
    const isSuccess = await onLogin(email, password);
    if (isSuccess) {
      navigation.goBack(null);
    } else {
      setEmail("");
      setPassword("");
      setShowPassword(true);
    }
  };

  return (
    <Container>
      <Text>{"logo"}</Text>
      <InputArea
        label="Email"
        autoFocus={true}
        value={email}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <InputArea
        label="Password"
        value={password}
        textContentType="password"
        secureTextEntry={showPassword}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />
      {error && <Text style={{ margin: 10 }}>{error}</Text>}
      {isLoading ? (
        <ActivityIndicator animating={true} color={Colors.red800} />
      ) : (
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          color="#2182BD"
          disabled={email.length === 0 || password.length === 0}
          onPress={handleLogin}
        >
          Login
        </AuthButton>
      )}
    </Container>
  );
};
