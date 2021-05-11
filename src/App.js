import PropTypes from 'prop-types'

import styles from './App.scss'
const App = ({ title }) => {
  return (
    <div className={ styles.app }>{title}</div>
  )
}

App.propTypes = {
  title: PropTypes.string.isRequired
}

export default App
