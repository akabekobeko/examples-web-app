import React from 'react'
import PropTypes from 'prop-types'
import Styles from './Footer.css'

const Footer = (props) => {
  return (
    <footer className={Styles.footer}>
      <p className={Styles.copyright}>Copyright &copy; {props.copyright}</p>
    </footer>
  )
}

Footer.propTypes = {
  copyright: PropTypes.string
}

export default Footer
