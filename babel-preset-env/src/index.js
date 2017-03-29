import Sample, { pow, includes } from './sample.js'

{
  const sample = new Sample()
  sample.message('Message1')
}

Sample.func('Message2')

console.log(pow(2, 3))
console.log(includes([1, 2, 3], 2))
