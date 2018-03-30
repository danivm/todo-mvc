import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class TaskList extends Component {
  filterTasks = id => {
    const { activeFilter, tasks } = this.props
    const task = tasks[id]
    return (
      activeFilter === 'all' ||
      (task.done && activeFilter === 'done') ||
      (!task.done && activeFilter === 'todo')
    )
  }

  handleDelete = (e) => {
    e.preventDefault()
    const { deleteTask } = this.props
    const id = e.currentTarget.dataset.id
    deleteTask(id)
  }

  render () {
    const { tasks, toggleDone } = this.props
    return (
      <Fragment>
        {Object.keys(tasks)
          .filter(this.filterTasks)
          .map(id => {
            const task = tasks[id]
            return (
              <label className='panel-block' key={id}>
                <input
                  type='checkbox'
                  checked={task.done}
                  name={id}
                  onChange={toggleDone}
                />
                {task.text}
                <span
                  className='icon has-text-grey-light'
                  onClick={this.handleDelete}
                  data-id={id}
                >
                  <i className='fas fa-times-circle' />
                </span>
              </label>
            )
          })}
      </Fragment>
    )
  }
}

TaskList.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  tasks: PropTypes.object.isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
}

export default TaskList
