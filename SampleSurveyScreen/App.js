/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Question from './src/models/Question';
import Star from './src/assets/svg/star_rate-black-18dp.svg';



const App: () => React$Node = () => {


  const [surveyQuestionList, setSurveyQuestionList] = useState([
    new Question('qstn01', 'How do you rate this shopping approach?', 0),
    new Question('qstn02', 'Was it easy to use?', 0),
    new Question('qstn03', 'How much do you recommend our App to your friends?', 0)
  ]);

  // const surveyQuestionList = [];
  // surveyQuestionList.push(new Question('qstn01', 'How do you rate this shopping approach?', 0));
  // surveyQuestionList.push(new Question('qstn02', 'Was it easy to use?', 0));
  // surveyQuestionList.push(new Question('qstn03', 'How much do you recommend our App to your friends?', 0));

  const [qstn1Rating, setQstn1Rating] = useState(0);
  const [qstn2Rating, setQstn2Rating] = useState(0);
  const [qstn3Rating, setQstn3Rating] = useState(0);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const checkSubmitButtonStatus = () => {
    let surveyConfigFlag = 0;
    
    surveyQuestionList.forEach((item) => {
      if(item.ratingValue > 0){
        surveyConfigFlag = surveyConfigFlag + 1;
      }
    });

    if (surveyConfigFlag === 3){
      setIsSubmitDisabled(false);
    }
  }

  const getIndex = (qstnID) => {
    return surveyQuestionList.findIndex(obj => obj.id === qstnID);
  }

  const onStarPress = (qstnID, starCount) => {
    let qstnIndex = getIndex(qstnID);
    // setSurveyQuestionList(currentQstnList => {currentQstnList[qstnIndex].ratingValue = starCount});
    if (qstnIndex === 0) {
      setQstn1Rating(starCount);
    } else if (qstnIndex === 1) {
      setQstn2Rating(starCount);
    } else if (qstnIndex === 2) {
      setQstn3Rating(starCount);
    }
    surveyQuestionList[qstnIndex].ratingValue = starCount;
    checkSubmitButtonStatus();
    console.log(surveyQuestionList);
  }

  const getQstnRatingState = (qstnID) => {
      if (qstnID === 'qstn01') {
        return qstn1Rating;
      } else if (qstnID === 'qstn02') {
        return qstn2Rating;
      } else if (qstnID === 'qstn03') {
        return qstn3Rating;
      }
  }

  const renderFlatList = (questionData) => {
    const qstnCurrentRating = getQstnRatingState(questionData.item.id);
    return (
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.sectionTitle}>{questionData.item.question}</Text>
          <View style={styles.ratingContainer}>
            <TouchableOpacity onPress={() => onStarPress(questionData.item.id, 1)}>
              <Star height={40} width={40} style={styles.ratingStart} fill={qstnCurrentRating >= 1 ? "#1e90ff" : "#e6e6fa"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onStarPress(questionData.item.id, 2)}>
              <Star height={40} width={40} style={styles.ratingStart} fill={qstnCurrentRating >= 2 ? "#1e90ff" : "#e6e6fa"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onStarPress(questionData.item.id, 3)}>
              <Star height={40} width={40} style={styles.ratingStart} fill={qstnCurrentRating >= 3 ? "#1e90ff" : "#e6e6fa"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onStarPress(questionData.item.id, 4)}>
              <Star height={40} width={40} style={styles.ratingStart} fill={qstnCurrentRating >= 4 ? "#1e90ff" : "#e6e6fa"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onStarPress(questionData.item.id, 5)}>
              <Star height={40} width={40} style={styles.ratingStart} fill={qstnCurrentRating >= 5 ? "#1e90ff" : "#e6e6fa"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    );
  }


  return (
    <>
      <View style={styles.body}>
        <SafeAreaView>
          <ImageBackground
            accessibilityRole={'image'}
            source={require('./logo.png')}
            style={styles.background}
            imageStyle={styles.logo}>
            <Text style={styles.text}>How was your Experience?</Text>
          </ImageBackground>

          <View>
            <FlatList
              style={styles.scrollView}
              data={surveyQuestionList}
              renderItem={renderFlatList}
            />
          </View>
          <View style={styles.parentSubmitContainer}>
            <View style={styles.submitButtonContainer}>
              <Button
                title="Submit"
                disabled={isSubmitDisabled}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: -128,
    marginBottom: -192,
  },
  text: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  scrollView: {
    height: '65%',
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  ratingStart: {
    margin: 5,
  },
  separator: {
    marginTop: 10,
    backgroundColor: Colors.light,
    height: 2,
  },
  submitButtonContainer: {
    width: '80%',
    alignContent: 'center',
  },
  parentSubmitContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
  }
});

export default App;
