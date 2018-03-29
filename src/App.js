import React, { Component } from 'react'
import FilterTabs from './filterTabs'
import TaskList from './taskList'
import './App.scss'
import 'bulma/css/bulma.css'

const FILTERS = ['all', 'todo', 'done']
const STORAGE_KEY = 'todo-mvc-tasks'

class App extends Component {
  state = {
    activeFilter: FILTERS[0],
    tasks: {}
  }

  componentDidMount () {
    this.getTasks()
  }

  getTasks = () => {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    this.setState({ tasks })
  }

  handleChangeFilter = e => {
    const activeFilter = e.target.name
    this.setState({ activeFilter })
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
      this.updateTasks(tasks)
    }
  }

  handleDeleteTask = id => {
    let { tasks } = this.state
    delete tasks[id]
    this.updateTasks(tasks)
  }

  removeAll = () => {
    const tasks = {}
    this.updateTasks(tasks)
  }

  handleToggleDone = e => {
    let { tasks } = this.state
    const id = e.target.name
    tasks[id].done = !tasks[id].done
    this.updateTasks(tasks)
  }

  updateTasks = tasks => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    this.setState({ tasks })
  }

  render () {
    const { activeFilter, tasks } = this.state

    return (
      <div className='section'>
        <div className='container'>
          <nav className='panel'>
            <p className='panel-heading'>TODO MVC</p>
            <div className='panel-block'>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='add task'
                  onKeyPress={this.addTasks}
                />
              </p>
            </div>
            <FilterTabs
              activeFilter={activeFilter}
              changeFilter={this.handleChangeFilter}
              filters={FILTERS}
            />
            <TaskList
              activeFilter={activeFilter}
              deleteTask={this.handleDeleteTask}
              tasks={tasks}
              toggleDone={this.handleToggleDone}
            />
            <div className='panel-block'>
              <button
                className='button is-link is-outlined is-fullwidth'
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
