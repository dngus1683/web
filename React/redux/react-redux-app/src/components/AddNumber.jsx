import React, {Component} from 'react'
import store from '../store'

export default class AddNumber extends Component{
  state = {size:1}
  render(){
    return (
      <div>
        <h1>Add Number</h1>
        <input type="button" value="+" onClick={function(){
          //this.props.onClick(this.state.size);
          store.dispatch({type:'INCREMENT', size:this.state.size});
        }.bind(this)}></input>
        <input type="text" value={this.state.size} onChange={function(e){
          this.setState({size:Number(e.target.value)});
        }}></input>
      </div>
    )
  }
}
// redux를 활용해 store로 data를 관리하면, 해당 컴포넌트는 redux에 의존하게 되면서 다
// 다른 곳에서 쉽게 활용하지 못한다.
// 이를 보완하기 위한 방법으로, 랩핑이 있다.
// 문제의 컴포넌트를 감싸는 큰 컴포넌트를 만든다. 그러면 그 큰 컴포넌트는 redux
// 에 구애받지 않으므로 해당 문제를 해결하게 된다.
// 이때, 감싸지는 컴포넌트를 프리젠테이셔널 컴포넌, 감싸는 컴포넌트를 컨테이너 컴포넌트라고 한다.
// 여기서는 containers폴더 안의 AddNumber.jsx가 그 역할을 한다. 이때, 꼭 1대1 대응이 될 필요도 없으며
// 이름이 달라도 된다.
