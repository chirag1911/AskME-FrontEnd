import React from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  QuestionCardContainer,
  FirstContainer,
  SecondContainer,
  Tags,
  Tag,
  IntegerAndIconView,
} from "./question-card.style.js";

const IntegerAndIconContainer = ({ number, image, size }) => {
  return (
    <IntegerAndIconView>
      <Text>{number + " "}</Text>
      <Icon size={size} name={image} backgroundColor="#3b5998" />
    </IntegerAndIconView>
  );
};

export const QuestionCard = ({ question = {} }) => {
  const {
    title = "This is the dummy question",
    votes = 10,
    totalAnswers = 0,
    tags = ["first", "second"],
    askedBy = "Chirag",
  } = question;

  return (
    <QuestionCardContainer>
      <FirstContainer>
        <IntegerAndIconContainer number={votes} image={"caret-up"} size={20} />
        <IntegerAndIconContainer
          number={totalAnswers}
          image={"comment"}
          size={12}
        />
      </FirstContainer>
      <SecondContainer>
        <Text> {title} </Text>
        <Tags>
          {tags.map((el, index) => (
            <Tag key={index}>{el}</Tag>
          ))}
        </Tags>
        <Text> {"Asked by: " + askedBy}</Text>
      </SecondContainer>
    </QuestionCardContainer>
  );
};
