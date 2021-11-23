# ToDoChrono

- I created a NavigationContainer, with two Stack.Group.
- Each Stack.Group has differents properties and Stack.Screen.
- The property "component" into Stack.Screen contains the name of the component that we imported (class or function )
- In StopWatch.js I used the Hook State with a class 

```
  constructor(props) {
    super(props)
    this.state = {
      start: 0,     
      now: 0,  
      laps: [] 
    } 
  }
  
  
  //To Set the state:
    this.setState({
      start: now,
      now,
      laps: [0]
    })
 ```   
    
- While for the HomeScreen and Task component I used the function.
- Use and Set of Hook State with a function:

  ```
  const [taskItems, setTaskItems] = useState([]);           
  
  setTaskItems(itemsCopy)
  
  
