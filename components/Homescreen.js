import React,{useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './Task';
import styled, { css } from '@emotion/native';




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
    <Container>

    {/* Added this scroll view to enable scrolling when list gets longer than the page */}
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}
      keyboardShouldPersistTaps='handled' >
     
      <TasksWrapperView>
        <ItemsView>
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
        </ItemsView>
      </TasksWrapperView>

    </ScrollView>

    {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen(proprietà ios = padding) */}
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={css `
      position: absolute;
      bottom: 60px;
      width: 100%;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      `}
    >
      <TextInputT placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
      <TouchableOpacity onPress={() => handleAddTask()}>
        <AddWrapperView>
          <TextAdd>+</TextAdd>
        </AddWrapperView>
      </TouchableOpacity>
    </KeyboardAvoidingView>

  </Container>
  )
}

const TextAdd = styled.Text`
  color: #f3be4f;`

const Container = styled.View`
    display: flex;
    background-color: #E8EAED;
    justify-content: flex-start;
`

const TasksWrapperView = styled.View`
    padding : 150px 10px 600px 10px;
    height: 100%;
` 

const AddWrapperView = styled.View`
  width: 60px;
  height: 60px;
  background-color: papayawhip;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border-color: #f3be4f;
  border-width: 1px;
`
const TextInputT = styled.TextInput`
  padding : 15px 10px 15px 15px;
  background-color: papayawhip;
  border-radius: 10px;
  border-color: #f3be4f;
  border-width: 1px;
  width: 250px;
`
const ItemsView = styled.View`
  margin-top: 30px;
`

export default HomeScreen;