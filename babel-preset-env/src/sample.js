// ES2015
export default class Sample {
  message (text) {
    console.log(text)
  }

  async asyncFunc () {
    const wait = (n) => {
      return new Promise((resolve) => setTimeout(() => resolve(n), n))
    }

    await wait(1000)
    console.log('finish!!')
  }

  static func (text = 'sample') {
    console.log(text)
  }
}

// ES2016: Exponentiation Operator
export function pow (a = 0, b = 0) {
  return a ** b
}

// ES2016: Array.prototype.includes
export function includes (arr = [], value) {
  return Array.isArray(arr) ? arr.includes(value) : false
}
