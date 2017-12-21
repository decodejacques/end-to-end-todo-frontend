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
      body: JSON.stringify({ item: item, username: this.username })
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


  verifyLogin = (username, password) => {
    return fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify({username: this.username, password: password})
    })
    .then(x => x.text())
    .then(res => {
      if(res === "ok") return;
      this.setState({loginFailed: true});
    })
  }

  populateTodos = () => {
    fetch("http://localhost:3001/todos?username=" + this.username)
    .then(x => x.text())
    .then(raw => {
      let lst = JSON.parse(raw);
      this.setState({ todos: lst })
    })
  }

  componentDidMount() {
    this.username = window.prompt('what is your username');
    let password = window.prompt('what is your password');
    this.verifyLogin(this.username, password)
      .then(this.populateTodos)
  }

  render() {
    if(this.state.loginFailed) return (<h1> login failed! </h1>);
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
