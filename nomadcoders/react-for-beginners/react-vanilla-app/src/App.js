import './App.css';
import {useState, useTransition} from 'react';

function TimeConvert(props) {
  const [onChange, value, flipped, reset, onFlip, index] = [props.onChange, props.value, props.disabled, props.onReset, props.onFlip, props.index];
  let convertValue1, convertValue2;
  if(index === "0")
  {
    convertValue1 = Math.round(value * 60);
    convertValue2 = Math.round(value / 60);
  }
  else if(index === "1")
  {
    convertValue1 = value * 1.609;
    convertValue2 = value * 0.621;
  }
  return (
    <div>
      <div>
        <label htmlFor='minutes'>Minutes</label>
        <input id='minutes' placeholder='Minutes' type="number" onChange={onChange} value={(!flipped) ? value : convertValue1} disabled={flipped === true}></input>
      </div>
      <h4>You want to convert {value}</h4>
      <div>
        <label htmlFor='hours'>Hours</label>
        <input id='hours' placeholder='Hours' type="number" onChange={onChange} value={flipped ? value : convertValue2} disabled={flipped === false}></input>
      </div>
      <div>
        <button onClick={reset}>RESET</button>
        <button onClick={onFlip}>Flip</button>
      </div>
    </div>
  );
}


function App() {
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState('-1');

  const onChangeTime = (event)=>{
    setTime(event.target.value);
  }
  const onChangeDis = (event)=>{
    setDistance(event.target.value);
  }
  const reset = ()=> {
    setTime(0);
    setDistance(0);
  }
  const onFlip = ()=> {
    reset();
    setFlipped((current)=>!current);
  }
  const onSelect = (event)=> {
    setIndex(event.target.value);
  }
  return (
    <div className="App">
      <h1>Super Converter</h1>
      <select value={index} onChange={onSelect}>
        <option value= '-1'>Select your units</option> 
        <option value='0'>Minutes & Hours</option>
        <option value='1'>Km & Miles</option>
      </select>
      <hr/>
      {index === "-1" ? "Please select your units" : null}
      {index === "0" ? <TimeConvert onChange={onChangeTime} value={time} disabled={flipped} onReset={reset} onFlip={onFlip} index={index}/> : null}
      {index === "1" ? <TimeConvert onChange={onChangeDis} value={distance} disabled={flipped} onReset={reset} onFlip={onFlip} index={index}/> : null}
      
    </div>
  );
}

export default App;
