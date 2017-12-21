import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { numbers: [] }
  }

  add = () => {
    this.setState(st => { return { numbers: st.numbers.concat(this.inp.value) } }, () => this.inp.value = "")
  }

  deleteEverything = () => {
    this.setState({ numbers: [] })
  }

  render() {
    return (
      <div className="App">
        <input ref={r => this.inp = r}></input>
        <button onClick={this.add}>add it </button>
        <button onClick={this.deleteEverything}>delete them </button>
        {this.state.numbers.map(x => (<li> {x} </li>))}
      </div>
    );
  }
}

export default App;
