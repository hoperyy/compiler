//index.js
//获取应用实例
import './index.less';

const app = getApp()

Page({
  data: {
    wechat: 'lyyryy160405',
    github: 'https://github.com/hoperyy'
  },
  //事件处理函数
  copyWechat: function() {
    wx.setClipboardData({
      data: this.data.wechat,
      success: function (res) {
        wx.getClipboardData()
      }
    })
  },
  copyGithub: function () {
    wx.setClipboardData({
      data: this.data.github,
      success: function (res) {
        wx.getClipboardData()
      }
    })
  }
})
