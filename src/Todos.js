import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {

  state = {
    todos: [],
    todo: '',
    loading: false
  }

  componentDidMount = async () => {
    await this.fetchTodos();
  }

  fetchTodos = async () => {
    await this.setState({ loading: true });

    const todos = await request
      .get('https://aqueous-garden-07137.herokuapp.com/api/todos')
      .set('Authorization', this.props.token)

    await this.setState({
      todos: todos.body,
      loading: false
    })
  }

  handleInputChange = (input, e) => {
    this.setState({
      [input]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const newToDo = {
      todo: this.state.todo
    }

    await this.setState({ loading: true });

    await request
      .post('https://aqueous-garden-07137.herokuapp.com/api/todos')
      .set('Authorization', this.props.token)
      .send(newToDo);

    await this.fetchTodos();
  }
  
  finishToDo = async (todoId) => {
    await request
      .put(`https://aqueous-garden-07137.herokuapp.com/api/todos/${todoId}`)
      .set('Authorization', this.props.token);

    await this.fetchTodos();
  }

  render() {
    return (
      <div>
        Check out all of these things to do!
        <form onSubmit = {this.handleSubmit}>
          <label>
            Add a ToDo: 
            <input 
              onChange = {(e) => this.handleInputChange('todo', e)}
            />
          </label>

          <button>Add ToDo</button>
        </form>

        <ul>
          {
            this.state.loading
              ? 'Loadering!'
              : this.state.todos.map(todo => {
                return <li 
                    key={todo.todo}
                    style = {{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  >
                  {todo.todo}

                  {
                    todo.completed
                      ? ''
                      : <button onClick = {() => this.finishToDo(todo.id)}>Done?</button>
                  }

                </li>
              })
          }
        </ul>
      </div>
    )
  }
}
