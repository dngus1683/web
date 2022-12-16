import './App.css';
import React, {useState} from 'react'

function FuncComp(props) {
  var [number, setNumber]   = useState(props.initNumber);
  var [_date, setDate] = useState((new Date()).toString())

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number} </p>
      <p>Date :  {_date}</p>
      <input type='button' value="random" onClick={
        function(){
          setNumber(Math.random());
        }
      }></input>
      <input type='button' value="date" onClick={
        function(){
          setDate((new Date()).toString())
        }
      }></input>
    </div>
  );
}


class ClassComp extends React.Component {
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }
  render(){ // render는 class 내의 method. 즉, function의 역할을 한다.
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number} </p>
        <p>Date : {this.state.date} </p>
        <input type='button' value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)  // class에서 onClick함수를 만들 때, .bind(this)를 꼭 써줘야한다. 쓰지 않으면 state가 업데이트가 되지 않는다.
        }></input>
        <input type='button' value="date" onClick={
          function(){
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }></input>
      </div>
    );
  }
}

function App() {
  return (
    <div className="container">
      <h1>Hello world</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

export default App;
