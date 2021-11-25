import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled, { css } from '@emotion/native';

const Task = (props) => {

  return (
     /*Singole task */ 
    <ItemView >
      <ItemLeft>
        <SquareView></SquareView>
        <ItemText>{props.text}</ItemText>
      </ItemLeft>
      <CircularView ></CircularView>
    </ItemView>
  )
}


const ItemText = styled.Text`
  max-width: 80%;
`

const CircularView = styled.View`
    width: 12px;
    height: 12px;
    border-color: #f3be4f;
    border-width: 2px;
    border-radius: 5px;
`

const ItemView = styled.View`
    background-color: #FFFFFF;
    padding: 15px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
` 
const SquareView = styled.View`
  width: 24px;
  height: 24px;
  backgroundColor: #f3be4f;
  opacity: 0.4;
  border-radius: 5px;
  margin-right: 15px;
  background-color: #f3be4f;
` 
const ItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flexWrap: wrap;
` 

export default Task;