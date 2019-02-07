webpackHotUpdate(0,{

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "usagesidebar-container"
  }, [_c('aside', {
    staticClass: "usagesidebar-sidebar sidebar"
  }, [_c('div', {
    staticClass: "sidebar-item-group"
  }, [_c('div', {
    staticClass: "sidebar-item-group-title"
  }, [_vm._v("使用")]), _vm._v(" "), _c('div', {
    staticClass: "sidebar-item",
    class: {
      'active': _vm.active === 'quickstart'
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/components/quickstart"
    }
  }, [_vm._v("快速上手")])], 1), _vm._v(" "), _c('div', {
    staticClass: "sidebar-item",
    class: {
      'active': _vm.active === 'rem'
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/components/rem"
    }
  }, [_vm._v("REM 布局")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "sidebar-item-group"
  }, [_c('div', {
    staticClass: "sidebar-item-group-title bold"
  }, [_vm._v("规范")]), _vm._v(" "), _vm._l((_vm.specifications), function(item) {
    return [_c('div', {
      staticClass: "sidebar-item",
      class: {
        'active': _vm.active === item.en
      }
    }, [_c('router-link', {
      attrs: {
        "to": ("/specifications/" + (item.en.toLowerCase()))
      }
    }, [_vm._v(_vm._s(item.zh))])], 1)]
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "sidebar-item-group"
  }, [_c('div', {
    staticClass: "sidebar-item-group-title bold"
  }, [_vm._v("组件")]), _vm._v(" "), _vm._l((_vm.components), function(item) {
    return [_c('div', {
      staticClass: "sidebar-item",
      class: {
        'active': _vm.active === item.toLowerCase()
      }
    }, [_c('router-link', {
      attrs: {
        "to": ("/components/" + (item.toLowerCase()))
      }
    }, [_vm._v(_vm._s(item))])], 1)]
  })], 2)]), _vm._v(" "), _c('content', [(this.$route.matched[0].path === '/components/:component') ? [_c('components', {
    attrs: {
      "component": this.$route.params.component
    }
  })] : [_c('keep-alive', [_c('router-view')], 1)]], 2), _vm._v(" "), (_vm.isPhoneShow) ? _c('div', {
    staticClass: "phone"
  }, [_c('iframe', {
    attrs: {
      "src": ("/pages/example.html#/" + _vm.active)
    }
  })]) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(5).rerender("data-v-4c764398", esExports)
  }
}

/***/ })

})