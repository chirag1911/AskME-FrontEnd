import styled from "styled-components";
import { TextInput, Button } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 40%;
  background-color: lightgray;
`;

export const InputArea = styled(TextInput)`
  width: 80%;
  height: 50px;
  margin: 10px;
`;

export const AuthButton = styled(Button)`
  width: 150px;
  height: 50px;
  justify-content: center;
`;
