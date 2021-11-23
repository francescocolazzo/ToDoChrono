import React,{useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './Task';





const HomeScreen = ({ navigation }) => {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  
  //add new task with handleAddTask function
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }
  

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }
  
  return (
    <View style={styles.container}>

    {/* Added this scroll view to enable scrolling when list gets longer than the page */}
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}
      keyboardShouldPersistTaps='handled' >
     
      <View style={styles.tasksWrapper}>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

    </ScrollView>

    {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen(proprietà ios = padding) */}
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
    >
      <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
      <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText1}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>

  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    //alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'papayawhip',
    borderRadius: 10,
    borderColor: '#f3be4f',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'papayawhip',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f3be4f',
    borderWidth: 1,
  },
  crono: {
    width: 100,
    height: 40,
    backgroundColor: '#55BCF6',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f3be4f',
    borderWidth: 1,


  },
  addText: {
    color: '#FFFFFF'
  },
  addText1: {
    color: '#f3be4f'
  },
  tinyLogo: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
});

export default HomeScreen;