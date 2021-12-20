import React, { useState, useContext } from "react";
import { Text } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { AuthenticationContext } from "../../../services/authentication/autentication.context";
import { Container, InputArea, AuthButton } from "../components/account.style";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

  const handleRegister = async () => {
    const isSuccess = await onRegister(email, userName, password);
    if (isSuccess) {
      navigation.goBack(null);
    } else {
      setEmail("");
      setPassword("");
      setUserName("");
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
      <InputArea
        label="username"
        value={userName}
        autoCapitalize="none"
        onChangeText={(text) => setUserName(text)}
      />
      {error && <Text style={{ margin: 10 }}>{error}</Text>}
      {isLoading ? (
        <ActivityIndicator animating={true} color={Colors.red800} />
      ) : (
        <AuthButton
          icon="email"
          mode="contained"
          color="#2182BD"
          disabled={
            email.length === 0 || password.length === 0 || userName.length === 0
          }
          onPress={handleRegister}
        >
          Register
        </AuthButton>
      )}
    </Container>
  );
};
