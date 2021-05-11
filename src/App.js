import PropTypes from 'prop-types'

import styles from './App.module.scss'
const App = ({ title }) => {
  return (
    <>
      <div className={ styles.tagContainer }>{title}</div>
    </>
  )
}

App.propTypes = {
  title: PropTypes.string.isRequired
}

export default App
