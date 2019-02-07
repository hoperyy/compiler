import Header from './components/Header/index.js'
import Cell from './components/Cell/index.js'

const install = function(Vue) {
  if(install.installed) {
    return
  }

  Vue.component(Header.name, Header)
  Vue.component(Cell.name, Cell)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const version = '0.7.0'

export {
  install,
  version,
  // Button,
  Header,
  Cell,
}
