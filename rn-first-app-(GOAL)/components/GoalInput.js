import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Modal} from 'react-native';


const GoalInput = props => {
    
    const [enteredGoal, setEnteredGoal] = useState('');    
    const changeEnteredGoal = (enteredGoalString) => {
        setEnteredGoal(enteredGoalString);
    };

    const onPressButtonHandler = () =>{
      props.onAddGoalEvent(enteredGoal);
      setEnteredGoal('');
    };

    return(
      <Modal 
        visible={props.visible}
        animationType="slide"
        >
        <View style={styles.addGoalView}>
          <TextInput 
            placeholder="Enter your Goal..."
            style={styles.inputContainer}
            onChangeText = {changeEnteredGoal}
            value = {enteredGoal} 
          />
          <View style={styles.buttonSectionView}>
            <View style={styles.buttons}>
              <Button
                title="<-BACK"
                color="grey"
                onPress={props.onBackPress} 
              />
            </View>
            <View style={styles.buttons}>
              <Button 
              title="+ Add"
              onPress={onPressButtonHandler} 
              />
            </View>
          </View>
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    addGoalView: {
        flex: 1,
        justifyContent: "center", 
        alignItems: 'center'
      },
      inputContainer: {
        width: '75%', 
        borderColor: 'black',
        borderWidth: 1, 
        padding: 5,
        marginBottom: 20
      },
      buttonSectionView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "60%"
      },
      buttons: {
        width: "45%"        
      }  
});

export default GoalInput;