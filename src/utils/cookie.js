
export default {
  setCookies: function(name, value, time = 30) {
    var exp = new Date()
    exp.setTime(exp.getTime() + time * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },
  getCookies: function(name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    var arr = document.cookie.match(reg)

    if (arr) { return unescape(arr[2]) } else { return null }
  },
  delCookies: function(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookies(name)
    if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/' }
  }
}
