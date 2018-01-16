import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Header from './Header.js'
import Content from './Content.js'
import Footer from './Footer.js'

const App = (props) => {
  return (
    <Fragment>
      <Header {...props.header} />
      <Content {...props.content} />
      <Footer {...props.footer} />
    </Fragment>
  )
}

App.propTypes = {
  header: PropTypes.object,
  content: PropTypes.object,
  footer: PropTypes.object
}

export default App
