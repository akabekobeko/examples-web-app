import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Styles from './Content.css'

const Item = ({title, text}) => {
  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{text}</p>
    </Fragment>
  )
}

Item.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}

const Content = (props) => {
  const items = props.items.map((item, index) => {
    return <Item key={index} title={item.title} text={item.text} />
  })

  return (
    <article className={Styles.content}>
      <h1>Sample page</h1>
      <p>
      Sample text by.<a href="http://www.blindtextgenerator.com/lorem-ipsum">Blind Text Generator</a>
      </p>
      {items}
    </article>
  )
}

Content.propTypes = {
  items: PropTypes.array
}

export default Content
