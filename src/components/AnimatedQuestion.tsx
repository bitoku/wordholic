import {Animated, Dimensions, View} from "react-native";
import {Question} from "./Question";
import React, {useEffect, useRef, useState} from "react";
import {Vocabulary} from "../Vocabulary";
import {styles} from "../style/style";
import {useUpdateEffect} from "../hooks/useUpdateEffect";

export type AnimatedQuestionProps = {
  vocabs: Vocabulary[],
  questionIdx: number,
}

export const AnimatedQuestion = (props: AnimatedQuestionProps) => {
  const {
    vocabs,
    questionIdx,
  } = props;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [vocab1, setVocab1] = useState<Vocabulary | undefined>(undefined);
  const [vocab2, setVocab2] = useState<Vocabulary | undefined>(undefined);

  useUpdateEffect(() => {
    console.log(slideAnim);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setVocab1(vocabs[questionIdx]);
      slideAnim.setValue(0);
      setVocab2(vocabs[questionIdx+1]);
    });
  }, [questionIdx]);

  useEffect(() => {
    setVocab1(vocabs[questionIdx]);
    setVocab2(vocabs[questionIdx+1]);
    }, []);

  const defaultVocab: Vocabulary = {
    word: 'end',
    pronunciation: 'end',
    syllable: 'end',
    pos: 'end',
    inflection: 'end',
    meanings: ['end'],
    text: `end`
  };

  // const vocab1 = vocabs[questionIdx] || defaultVocab;
  // const vocab2 = vocabs[questionIdx+1] || defaultVocab;

  return (
    <View style={styles.content}>
      <Animated.View style={{
        width: Dimensions.get('window').width,
        transform: [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [Dimensions.get('window').width / 2, -Dimensions.get('window').width / 2],
            })
          }]
      }}
      >
        {vocab1 &&
        <Question vocab={vocab1}/>
        }
      </Animated.View>
      <Animated.View style={{
        width: Dimensions.get('window').width,
        transform: [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [Dimensions.get('window').width / 2, -Dimensions.get('window').width / 2],
            })
          }]
      }}
      >
        {vocab2 &&
        <Question vocab={vocab2}/>
        }
      </Animated.View>
    </View>
  );
}