import React from 'react'
import PropTypes from 'prop-types'
import Styles from './Header.css'

const Item = ({label, url}) => {
  return (
    <li>
      <a href={url}>{label}</a>
    </li>
  )
}

Item.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string
}

const Header = (props) => {
  const items = props.items.map((item, index) => {
    return <Item key={index} label={item.label} url={item.url} />
  })

  return (
    <nav className={Styles.header}>
      <ul>
        {items}
      </ul>
    </nav>
  )
}

Header.propTypes = {
  items: PropTypes.array
}

export default Header
