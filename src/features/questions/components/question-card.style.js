import styled from "styled-components";

export const QuestionCardContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
  flex-direction: row;
`;

export const FirstContainer = styled.View`
  width: 18%;
  align-items: center;
  justify-content: center;
  background-color: #e3e6e8;
  padding-top: 10px;
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

export const IntegerAndIconView = styled.Text`
  margin-bottom: 5px;
  flex-direction: row;
`;
