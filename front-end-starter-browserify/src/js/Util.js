
/**
 * Provide a utility method.
 */
export default class Util {
  /**
   * Converts the value of the Date object to its equivalent string representation using the specified format.
   *
   * @param {Date}   date   Date and time. Default is current date and time.
   * @param {String} format Date and time format string. Default is "YYYY-MM-DD hh:mm:ss.SSS".
   *
   * @return {String} Formatted string.
   *
   * @see http://qiita.com/osakanafish/items/c64fe8a34e7221e811d0
   */
  static formatDate (date = new Date(), format = 'YYYY-MM-DD hh:mm:ss.SSS') {
    const Y = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    const h = date.getHours()
    const l = (12 < h ? h - 12 : h)
    const m = date.getMinutes()
    const s = date.getSeconds()

    let str = format.replace(/YYYY/g, Y)
    str = str.replace(/MM/g,   ('0' + M).slice(-2))
    str = str.replace(/DD/g,   ('0' + D).slice(-2))
    str = str.replace(/hh/g,   ('0' + h).slice(-2))
    str = str.replace(/mm/g,   ('0' + m).slice(-2))
    str = str.replace(/ss/g,   ('0' + s).slice(-2))

    str = str.replace(/M/g, M)
    str = str.replace(/D/g, D)
    str = str.replace(/h/g, h)
    str = str.replace(/m/g, m)
    str = str.replace(/s/g, s)

    // 12 Hour
    str = str.replace(/l/g, l)

    // AM/PM
    str = str.replace(/p/g, h < 12 ? 'AM' : 'PM')

    // Month name
    const monthShortNames = [ '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
    const monthFullNames  = [ '', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
    str = str.replace(/b/g, monthShortNames[ M ])
    str = str.replace(/B/g, monthFullNames[ M ])

    // milliSeconds
    if (str.match(/S/g)) {
      const S = date.getMilliseconds()
      const ms = ('00' + S).slice(-3)
      for (let i = 0, max = str.match(/S/g).length; i < max; ++i) {
        str = str.replace(/S/, ms.substring(i, i + 1))
      }
    }

    return str
  }
}
