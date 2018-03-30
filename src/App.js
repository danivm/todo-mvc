import React, { Component } from 'react'
import FilterTabs from './filterTabs'
import TaskList from './taskList'
import db from './firebase'
import './App.scss'
import 'bulma/css/bulma.css'

const FILTERS = ['all', 'todo', 'done']
const dbTasks = db.collection('tasks')

class App extends Component {
  state = {
    activeFilter: FILTERS[0],
    tasks: {},
    loading: false
  }

  componentDidMount () {
    this.getTasks()
  }

  getTasks = () => {
    const tasks = {}
    this.setState({ loading: true })
    dbTasks.get().then(snapshot => {
      snapshot.forEach(task => {
        tasks[task.id] = task.data()
      })
      this.setState({ tasks, loading: false })
    })
  }

  handleChangeFilter = e => {
    const activeFilter = e.target.name
    this.setState({ activeFilter })
  }

  addTasks = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const { tasks } = this.state
      const text = e.target.value
      const task = { text, done: false }
      const id = Date.now().toString()
      tasks[id] = task
      this.setState({ tasks })
      dbTasks.doc(id).set(task)
      e.target.value = ''
    }
  }

  handleDeleteTask = id => {
    const { tasks } = this.state
    delete tasks[id]
    this.setState({ tasks })
    dbTasks.doc(id).delete()
  }

  removeAll = () => {
    let { tasks } = this.state
    Object.keys(tasks).map(id => {
      dbTasks.doc(id).delete()
    })
    tasks = {}
    this.setState({ tasks })
  }

  handleToggleDone = e => {
    let { tasks } = this.state
    const id = e.target.name
    tasks[id].done = !tasks[id].done
    this.setState({ tasks })
    dbTasks.doc(id).set(tasks[id])
  }

  render () {
    const { activeFilter, tasks, loading } = this.state
    const loadingClass = loading ? 'is-loading' : ''

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
            <div className="panel-block">
              <button
                className={`button is-link is-outlined is-fullwidth ${loadingClass}`}
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
