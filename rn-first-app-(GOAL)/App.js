import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput';

export default function App() {

  const [isAddMode, setIsAddMode] = useState(false);
  const onBackPressHandler = () => {
    setIsAddMode(false);
  };

  const [enteredGoalsList, setEnteredGoalToList] = useState([]); 
  const addGoalHandler = (enteredGoal) => {
    setIsAddMode(false);
    enteredGoal = enteredGoal.trim();
    if(enteredGoal.length === 0){
      console.log("Empty GOAL!!! Please Enter a Goal First.");
    } else if (!checkIfGoalIsPresent(enteredGoalsList, enteredGoal)) {
      setEnteredGoalToList(currentGoalsList => [...currentGoalsList, 
        {id: enteredGoal, value: enteredGoal}
      ]);      
      console.log("\""+enteredGoal + "\" as Goal Successfully added.");
    } else {
      console.log("ERROR! Duplicate Goal inserted! Please add a new Goal to add.");
    }    
  };
  
  const checkIfGoalIsPresent = (goalListArray, insertingGoal) => {
    var flag = false;
    goalListArray.forEach(element => {
      if(element.value === insertingGoal){        
        flag = true;
      }
    });
    return flag;        
  };

  const removeGoalHandler = goalId => {
    setEnteredGoalToList( currentGoals => {
      return currentGoals.filter( goalItem => (goalItem.id !== goalId));
    });
    console.log("Goal: \""+goalId+"\" is deleted." );
  }; 


  return (
    <View style={styles.screen}>
      <View style={styles.addGoalButton}>
        <Button 
          title="+ Add New GOAL"
          onPress={() => setIsAddMode(true)}
        />
      </View>
      <GoalInput 
        visible={isAddMode} 
        onAddGoalEvent={addGoalHandler}
        onBackPress={onBackPressHandler} 
      />
      <FlatList         
        data={enteredGoalsList}
        key={(item, index) => item.id}
        renderItem={
          itemData =>
          (<GoalItem 
            title={itemData.item.value}
            id={itemData.item.id} 
            onDelete={removeGoalHandler}
          />)
        }
      />        
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  addGoalButton: {
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20    
  }
});
