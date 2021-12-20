import React, { useContext, useEffect, useState } from "react";

import { Text, View, Alert, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "react-native-paper";

import axios from "../../../../axios";
import { Navbar } from "../../../components/navbar.component";
import { SafeArea } from "../../../components/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/autentication.context";
import { QuestionsContext } from "../../../services/questions/questions.context";
import {
  Container,
  FirstContainer,
  SecondContainer,
  Tags,
  Tag,
  TextView,
  AnswersCountContainer,
  InputArea,
  AuthButton,
  Loading,
} from "../components/question-detail.style";

export const QuestionDetail = ({ navigation, route }) => {
  const { isAuthenticated, username } = useContext(AuthenticationContext);
  const { fetchQuestions } = useContext(QuestionsContext);
  const { question1 } = route.params;

  const [question, setQuestion] = useState(question1);
  const [showAnsBox, setShowAnsBox] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnswerVote = async (index, value) => {
    if (!isAuthenticated) {
      return createAlert();
    }
    setIsLoading(true);
    const url =
      "/questions/" +
      question._id +
      "/answers/" +
      answers[index]._id +
      "/" +
      value;
    const { data } = await axios.get(url);
    if (data.status === "SUCCESS") {
      await fetchAnswers();
    } else {
      setError(data.error);
    }
    setIsLoading(false);
  };

  const handleQuestionVote = async (value) => {
    if (!isAuthenticated) {
      return createAlert();
    }
    setIsLoading(true);
    const { data } = await axios.get(
      "/questions/" + question._id + "/changeVotes/" + value
    );
    const status = data.status;
    if (status === "SUCCESS") {
      await fetchQuestions();
      const newQuestion = await axios.get("/questions/" + question._id);
      if (newQuestion.data.status === "SUCCESS") {
        setQuestion(newQuestion.data.data.question);
      } else {
        setError(data.error);
      }
    } else {
      setError(data.error);
    }
    setIsLoading(false);
  };

  const createAlert = () =>
    Alert.alert(
      "Please Login",
      "if you haven't created account then please signup",
      [
        {
          text: "Ask me later",
        },
        {
          text: "Sign up",
          onPress: () =>
            navigation.navigate("AccountNavigator", {
              screen: "RegisterScreen",
            }),
        },
        {
          text: "Login",
          onPress: () =>
            navigation.navigate("AccountNavigator", {
              screen: "LoginScreen",
            }),
        },
      ]
    );

  const handleWriteAnswer = () => {
    if (!isAuthenticated) {
      return createAlert();
    } else {
      setShowAnsBox(true);
    }
  };

  const saveAnswer = async () => {
    setIsLoading(true);
    const { data } = await axios.post(
      "/questions/" + question._id + "/answers/add",
      { answer, answeredBy: username }
    );
    const status = data.status;
    if (status === "SUCCESS") {
      await fetchAnswers();
    } else {
      setError(data.error);
    }
    setIsLoading(false);
    setShowAnsBox(false);
  };

  const handleAnswerBox = () => {
    return (
      <>
        <InputArea
          autoFocus={true}
          multiline
          numberOfLines={4}
          onChangeText={(text) => setAnswer(text)}
        />
        <Container>
          <AuthButton
            mode="contained"
            color="#2182BD"
            onPress={() => saveAnswer()}
          >
            Save
          </AuthButton>
          <AuthButton
            mode="contained"
            color="#2182BD"
            onPress={() => setShowAnsBox(false)}
          >
            Cancel
          </AuthButton>
        </Container>
      </>
    );
  };

  const fetchAnswers = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "/questions/" + question._id + "/answers/all"
    );
    const status = data.status;
    if (status === "SUCCESS") {
      setAnswers(data.data.answers);
    } else {
      setError(data.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  if (isLoading) {
    return (
      <SafeArea>
        <Navbar navigate={navigation.navigate} />
        <Loading size={50} animating={true} color={Colors.red800} />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <Navbar navigate={navigation.navigate} />
      <Container>
        <FirstContainer>
          <TouchableOpacity onPress={() => handleQuestionVote(1)}>
            <Icon
              size={40}
              style={{ marginBottom: -10, marginLeft: -2 }}
              name={"caret-up"}
              backgroundColor="#3b5998"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 15 }}>{question.votes + " "}</Text>
          <TouchableOpacity onPress={() => handleQuestionVote(-1)}>
            <Icon
              style={{ marginTop: -10, marginLeft: -2 }}
              size={40}
              name={"caret-down"}
              backgroundColor="#3b5998"
            />
          </TouchableOpacity>
        </FirstContainer>
        <SecondContainer>
          <Text> {question.title} </Text>
          <Tags>
            {question.tags.map((el, index) => (
              <Tag key={index}>{el}</Tag>
            ))}
          </Tags>
          <Text> {"Asked by: " + question.askedBy}</Text>
        </SecondContainer>
      </Container>
      <TextView>
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          {question.body}
        </Text>
      </TextView>
      <AnswersCountContainer>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {answers.length + " Answers"}
        </Text>
        <TouchableOpacity onPress={handleWriteAnswer}>
          <Icon size={20} name={"pencil"} backgroundColor="#3b5998" />
        </TouchableOpacity>
      </AnswersCountContainer>
      {showAnsBox && handleAnswerBox()}
      <FlatList
        data={answers}
        renderItem={({ item, index }) => (
          <Container>
            <FirstContainer>
              <TouchableOpacity onPress={() => handleAnswerVote(index, 1)}>
                <Icon
                  size={40}
                  style={{ marginBottom: -10, marginLeft: -2 }}
                  name={"caret-up"}
                  backgroundColor="#3b5998"
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 15 }}>{item.votes + " "}</Text>
              <TouchableOpacity onPress={() => handleAnswerVote(index, -1)}>
                <Icon
                  style={{ marginTop: -10, marginLeft: -2 }}
                  size={40}
                  name={"caret-down"}
                  backgroundColor="#3b5998"
                />
              </TouchableOpacity>
            </FirstContainer>
            <SecondContainer>
              <View>
                <Text
                  style={{ fontSize: 16, textAlign: "left", lineHeight: 22 }}
                >
                  {item.answer}
                </Text>
              </View>
              <Text>{"Answered By: " + item.answeredBy}</Text>
            </SecondContainer>
          </Container>
        )}
        keyExtractor={(item, index) => index + "ans"}
      />
    </SafeArea>
  );
};
