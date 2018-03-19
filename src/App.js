import React, { Component } from 'react'
import './App.scss'
import 'bulma/css/bulma.css'

const FILTERS = ['all', 'todo', 'done']

class App extends Component {
  state = {
    tasks: {},
    filter: FILTERS[0]
  }

  changeFilter = e => {
    const filter = e.target.name
    this.setState({ filter })
  }

  addTasks = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const { tasks } = this.state
      const id = Date.now()
      tasks[id] = {
        text: e.target.value,
        done: false
      }
      e.target.value = ''
      this.setState({ tasks })
    }
  }

  deleteTask = id => {
    let { tasks } = this.state
    delete tasks[id]
    this.setState({ tasks })
  }

  removeAll = () => {
    const tasks = {}
    this.setState({ tasks })
  }

  toggleDone = e => {
    let { tasks } = this.state
    const id = e.target.name
    tasks[id].done = !tasks[id].done
    this.setState({ tasks })
  }

  render () {
    const { tasks } = this.state

    return (
      <div className="section">
        <div className="container">
          <nav className="panel">
            <p className="panel-heading">TODO MVC</p>
            <div className="panel-block">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="add task"
                  onKeyPress={this.addTasks}
                />
              </p>
            </div>
            <p className="panel-tabs">
              {FILTERS.map(filter => {
                const filterClass =
                  filter === this.state.filter ? 'is-active' : ''
                return (
                  <a
                    key={filter}
                    className={filterClass}
                    name={filter}
                    onClick={this.changeFilter}
                  >
                    {filter}
                  </a>
                )
              })}
            </p>
            {Object.keys(tasks).map(id => {
              const task = tasks[id]
              if (
                (task.done && this.state.filter === 'todo') ||
                (!task.done && this.state.filter === 'done')
              ) {
                return null
              }
              return (
                <label className="panel-block" key={id}>
                  <input
                    type="checkbox"
                    defaultChecked={task.done}
                    name={id}
                    onClick={this.toggleDone}
                  />
                  {task.text}
                  <span
                    className="icon has-text-grey-light"
                    onClick={() => this.deleteTask(id)}
                  >
                    <i className="fas fa-times-circle" />
                  </span>
                </label>
              )
            })}
            <div className="panel-block">
              <button
                className="button is-link is-outlined is-fullwidth"
                onClick={this.removeAll}
              >
                remove all
              </button>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default App
