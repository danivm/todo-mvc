import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class FilterTabs extends Component {
  filterTasks = id => {
    const { activeFilter, tasks } = this.props
    const task = tasks[id]
    return (
      (activeFilter === 'all') ||
      (task.done && activeFilter === 'done') ||
      (!task.done && activeFilter === 'todo')
    )
  }

  render () {
    const { deleteTask, tasks, toggleDone } = this.props
    return (
      <Fragment>
        {Object.keys(tasks)
          .filter(this.filterTasks)
          .map(id => {
            const task = tasks[id]
            return (
              <label className="panel-block" key={id}>
                <input
                  type="checkbox"
                  defaultChecked={task.done}
                  name={id}
                  onClick={toggleDone}
                />
                {task.text}
                <span
                  className="icon has-text-grey-light"
                  onClick={() => deleteTask(id)}
                >
                  <i className="fas fa-times-circle" />
                </span>
              </label>
            )
          })}
      </Fragment>
    )
  }
}

FilterTabs.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  tasks: PropTypes.object.isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
}

export default FilterTabs
