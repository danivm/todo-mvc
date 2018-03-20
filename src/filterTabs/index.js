import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FilterTabs extends Component {
  render () {
    const { activeFilter, changeFilter, filters } = this.props
    return (
      <p className='panel-tabs'>
        {filters.map(filter => {
          const filterClass = filter === activeFilter ? 'is-active' : ''
          return (
            <a
              key={filter}
              className={filterClass}
              name={filter}
              onClick={changeFilter}
            >
              {filter}
            </a>
          )
        })}
      </p>
    )
  }
}

FilterTabs.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  changeFilter: PropTypes.func.isRequired
}

export default FilterTabs
