import React, { Component } from 'react';
import './App.scss'
import 'bulma/css/bulma.css'

const FILTERS = ['all', 'todo', 'done']

class App extends Component {
  state = {
    tasks: [],
    filter: FILTERS[0]
  }

  changeFilter = (filter) => {
    this.setState({ filter })
  }

  addTasks = (e) => {
    if (e.key === 'Enter') {
      const { tasks } = this.state
      tasks.push({
        id: new Date().toISOString(),
        text: e.target.value,
        done: false
      })
      e.target.value = ''
      this.setState({ tasks })
    }
  }

  toggleDone = (id) => {
    let { tasks } = this.state
    tasks.map((task, i) =>{
      if (task.id === id) {
        tasks[i].done = !tasks[i].done
      }
    })
    this.setState({ tasks })
  }

  render() {
    const { tasks } = this.state

    return (
      <div className="section">
        <div className="container">
          <nav className="panel">
            <p className="panel-heading">
              TODO MVC
            </p>
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
              {
                FILTERS.map((filter) => {
                  const filterClass = (filter === this.state.filter) ? 'is-active' : ''
                  return (
                    <a className={filterClass} onClick={() => this.changeFilter(filter)}>
                      {filter}
                    </a>
                  )
                })
              }
            </p>
            {
              tasks.map((task) => {
                if ((task.done && this.state.filter === 'todo') || ((!task.done && this.state.filter === 'done'))) {
                  return null
                }
                return (
                  <label className="panel-block" key={task.id}>
                    <input 
                      type="checkbox"
                      defaultChecked={task.done}
                      onClick={() => this.toggleDone(task.id)}
                    />
                    { task.text }
                  </label>
                )
              })
            }
            <div className="panel-block">
              <button className="button is-link is-outlined is-fullwidth">
                remove all
              </button>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default App;