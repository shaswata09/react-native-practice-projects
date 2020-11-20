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
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Star from './src/assets/svg/star_rate-black-18dp.svg';



const App: () => React$Node = () => {

  const [surveyRatingList, setSurveyRatingList] = useState({
    "question1": 0,
    "question2": 0,
    "question3": 0,
  });


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
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.formBody}>
            <View style={styles.sectionContainer}>
              <View>
                <Text style={styles.sectionTitle}>How do you rate this shopping approach?</Text>
                <View style={styles.ratingContainer}>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#e6e6fa" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
            <View style={styles.sectionContainer}>
              <View>
                <Text style={styles.sectionTitle}>Was it easy to use?</Text>
                <View style={styles.ratingContainer}>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#e6e6fa" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#e6e6fa" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
            <View style={styles.sectionContainer}>
              <View>
                <Text style={styles.sectionTitle}>How much do you recommend our App to your friends?</Text>
                <View style={styles.ratingContainer}>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#1e90ff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Star height={40} width={40} style={styles.ratingStart} fill="#e6e6fa" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.parentSubmitContainer}>
          <View style={styles.submitButtonContainer}>
            <Button
              title="Submit"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  </>
);
};

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
    height: '60%',
  },
  formBody: {
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
