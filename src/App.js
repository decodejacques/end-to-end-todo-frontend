import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { todos: [] }
  }

  add = () => {
    let item = this.inp.value
    fetch("http://localhost:3001/addTodo", {
      method: "POST",
      body: JSON.stringify({item: item, username: this.username})
    });
    this.setState(st => { return { todos: st.todos.concat(item) } }, () => item = "")
  }

  deleteEverything = () => {
    fetch("http://localhost:3001/clearTodos", {
      method: "POST",
      body: JSON.stringify(this.username)
    });
    this.setState({ todos: [] })
  }

  componentDidMount() {
    this.username = window.prompt('what is your username');
    fetch("http://localhost:3001/todos?username=" + this.username)
    .then(x => x.text())
    .then(raw => {
      let lst = JSON.parse(raw);
      this.setState({todos: lst})
    })
  }

  render() {
    return (
      <div className="App">
        <input ref={r => this.inp = r}></input>
        <button onClick={this.add}>add it </button>
        <button onClick={this.deleteEverything}>delete them </button>
        {this.state.todos.map(x => (<li> {x} </li>))}
      </div>
    );
  }
}

export default App;
