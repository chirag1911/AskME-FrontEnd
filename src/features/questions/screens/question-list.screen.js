import React, { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { SafeArea } from "../../../components/safe-area.component";
import { Navbar } from "../../../components/navbar.component";
import { QuestionCard } from "../components/question-card.component";
import { QuestionsContext } from "../../../services/questions/questions.context";

export const HomeScreen = ({ navigation }) => {
  const { questions, fetchQuestions } = useContext(QuestionsContext);

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <SafeArea>
      <Navbar navigate={navigation.navigate} />
      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("QuestionDetailScreen", {
                question1: item,
              })
            }
          >
            <QuestionCard question={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </SafeArea>
  );
};
