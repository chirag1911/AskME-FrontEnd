import React, { useContext } from "react";
import styled from "styled-components";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator, Colors, Text } from "react-native-paper";

import { AuthenticationContext } from "../services/authentication/autentication.context";

const Container = styled.View`
  height: 50px;
  padding: 10px
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Navbar = ({ navigate }) => {
  const { isAuthenticated, onLogout, isLoading } = useContext(
    AuthenticationContext
  );

  return (
    <Container>
      <Icon name="bars" color="#e3e6e8" size={24} />
      {isAuthenticated ? (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onLogout}>
          {isLoading ? (
            <ActivityIndicator animating={true} color={Colors.white800} />
          ) : (
            <Text style={{ color: "white" }}>Log out</Text>
          )}
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() =>
              navigate("AccountNavigator", { screen: "LoginScreen" })
            }
          >
            <Text style={{ color: "white" }}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() =>
              navigate("AccountNavigator", { screen: "RegisterScreen" })
            }
          >
            <Text style={{ color: "white" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Container>
  );
};
