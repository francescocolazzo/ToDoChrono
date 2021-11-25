import React, { Component } from 'react';
import { Text, ScrollView} from 'react-native';
import moment from 'moment';
import styled, { css } from '@emotion/native';

function TimerFirst({ interval }) {
  //create function pad, if the argument < 10 then add 0 
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
    <TimerContainer>
      <TimerText>{pad(duration.minutes())}:</TimerText>
      <TimerText >{pad(duration.seconds())},</TimerText>
      <TimerText>{pad(centiseconds)}</TimerText>
    </TimerContainer>
  )
}


function Timer({ interval, style }) {
  //create function pad, if the argument < 10 then add 0 
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
    <TimerContainer>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())},</Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </TimerContainer>
  )
}


function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <RoundButtonTouchOpacity
      onPress={() => !disabled && onPress()}
      style={ { backgroundColor: background }}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <ButtonBorder>
        <Text style={[css `font-size: 18px;`, { color }]}>{title}</Text>
      </ButtonBorder>
    </RoundButtonTouchOpacity>
  )
}

function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    css`color: #FFFFFF; font-size: 18px;`,
    fastest && css`color: #4BC05F;`,  //if fastest(green) style == styles.fastest
    slowest && css`color: #CC3531`,  //if fastest(red) style == styles.fastest
  ]
  return (
    <LapView>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={[lapStyle, css` width: 30px;` ]} interval={interval} />
    </LapView>
  )
}

function LapsTable({ laps, timer }) {
  const finishedLaps = laps.slice(1)
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  //at least two lap for min e max
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min) min = lap
      if (lap > max) max = lap
    })
  }
  return (
    <ScrollView style={css `align-self: stretch;`}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
          fastest={lap === min}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  )
}

function ButtonsRow({ children }) {
  return (
    <ButtonsRowView>{children}</ButtonsRowView>
  )
}
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: 0,
      now: 0,
      laps: [],
    }
  }
  //clear timer component
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  start = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
      laps: [0],
    })
    
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() })
    }, 100)
  }

  lap = () => {
    const timestamp = new Date().getTime()
    const { laps, now, start } = this.state
    const [firstLap, ...other] = laps   
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,    
      now: timestamp,
    })
  }

  stop = () => {
    clearInterval(this.timer)
    const { laps, now, start } = this.state
    const [firstLap, ...other] = laps
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    })
  }
  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    })
  }
  resume = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
    })
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() })
    }, 100)
  }
  render() {
    const { now, start, laps } = this.state
    const timer = now - start
    return (
      <Container>
        <TimerFirst
          interval={laps.reduce((total, curr) => total + curr, 0) + timer}
        />
        {/* Button Lap and Start*/}
        {laps.length === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Lap'
              color='#8B8B90'
              background='#151515'
              disabled
            />
            <RoundButton
              title='Start'
              color='#50D167'
              background='#1B361F'
              onPress={this.start}
            />
          </ButtonsRow>
        )}

        {/* Button Lap and Stop*/}
        {start > 0 && (
          <ButtonsRow>
            <RoundButton
              title='Lap'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.lap}
            />
            <RoundButton
              title='Stop'
              color='#E33935'
              background='#3C1715'
              onPress={this.stop}
            />
          </ButtonsRow>
        )}
        {/* Button Reset and Start*/}
        {laps.length > 0 && start === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Reset'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.reset}
            />
            <RoundButton
              title='Start'
              color='#50D167'
              background='#1B361F'
              onPress={this.resume}
            />
          </ButtonsRow>
        )}
        <LapsTable laps={laps} timer={timer} />
      </Container>
    )
  }
}

const Container = styled.View`
  display: flex;
  background-color: #0D0D0D;
  alignItems: center;
  padding: 130px 20px 350px 20px;
`
const TimerContainer = styled.View`
  flex-direction: row;
`;

const TimerText = styled.Text`
  color: #FFFFFF;
  font-size: 76px;
  font-weight: 200;
  width: 110px;
`;

const LapView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-color: #151515;
  border-top-width: 1px;
  padding: 10px 0px 10px 0px; `

const ButtonBorder = styled.View`
  width: 76px;
  height: 76px;
  border-radius: 38px;
  border-width: 1px;
  justifyContent: center;
  alignItems: center; `

const ButtonsRowView = styled.View`
    flex-direction: row;
    align-self: stretch;
    justify-content: space-between;
    margin-top: 80px;
    margin-bottom: 30px;
`
const RoundButtonTouchOpacity = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    justify-content: center;
    align-items: center;
`

