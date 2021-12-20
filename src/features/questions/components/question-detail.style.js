import styled from "styled-components";
import { TextInput, Button } from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";

export const Loading = styled(ActivityIndicator)`
  margin-top: 80%;
`;

export const Container = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
  flex-direction: row;
`;

export const FirstContainer = styled.View`
  width: 18%;
  align-items: center;
  background-color: #e3e6e8;
`;

export const SecondContainer = styled.View`
  width: 82%;
  padding: 8px;
`;

export const Tags = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 5px;
`;

export const Tag = styled.Text`
  height: auto;
  width: auto;
  background-color: #d0e3f1;
  margin: 4px 4px 4px 0px;
  padding: 4px;
  border-radius: 2px;
`;

export const TextView = styled.View`
  padding: 20px 10px 0px 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

export const AnswersCountContainer = styled.View`
  background-color: #e3e6e8;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
  flex-direction: row;
  justify-content: space-between;
`;

export const InputArea = styled(TextInput)`
  width: 96%;
  margin: 2%;
  background-color: white;
`;

export const AuthButton = styled(Button)`
  width: 100px;
  height: 30px;
  margin: 0 2% 2% 2%;
  justify-content: center;
`;
