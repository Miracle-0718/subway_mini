//index.js

Page({
  data: {
    text: "1.【紧急通知】7号线地铁拥挤。2.【安全提示】请不要携带危险物品上车。",
    animation: null,
    timer: null,
    duration: 0,
    textWidth: 0,
    wrapWidth: 0,

    curPoints:[{latitude: 31.110924, longitude:121.384999},
              {latitude: 31.121183, longitude:121.393221}
    ],
  },

  onLoad: function() {
    this.setData({
      latitude: 31.110924,
      longitude: 121.384999,
      markers:[{
        latitude: 31.110924,
      longitude: 121.384999,
      }]
     })
  },

  onShow() {
    this.initAnimation(this.data.text)
  },
  //滚动通知栏部分
  onHide() {
    this.destroyTimer()
    this.setData({
      timer: null
    })
  },
  onUnload() {
    this.destroyTimer()
    this.setData({
      timer: null
    })
  },
destroyTimer() {
    if (this.data.timer) {
      clearTimeout(this.data.timer);
    }
  },
  /**
   * 开启公告字幕滚动动画
   * @param  {String} text 公告内容
   * @return {[type]} 
   */
  initAnimation(text) {
    let that = this
    this.data.duration = 15000
    this.data.animation = wx.createAnimation({
      duration: this.data.duration,
      timingFunction: 'linear'   
    })
    let query = wx.createSelectorQuery()
    query.select('.content-box').boundingClientRect()
    query.select('#text').boundingClientRect()
    query.exec((rect) => {
      that.setData({
        wrapWidth: rect[0].width,
        textWidth: rect[1].width
      }, () => {
        this.startAnimation()
      })
    })
  },
  // 定时器动画
  startAnimation() {
    //reset
    // this.data.animation.option.transition.duration = 0
    const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step({ duration: 0 })
    this.setData({
      animationData: resetAnimation.export()
    })
    // this.data.animation.option.transition.duration = this.data.duration
    const animationData = this.data.animation.translateX(-this.data.textWidth).step({ duration: this.data.duration })
    setTimeout(() => {
      this.setData({
        animationData: animationData.export()
      })
    }, 100)
    const timer = setTimeout(() => {
      this.startAnimation()
    }, this.data.duration)
    this.setData({
      timer
    })
  },
  
//地图部分

ToRobot:function(e){
  wx.navigateTo({
    url: '/pages/MainPage-Robot/robot'
  })
},

ToPrice:function(e){
  wx.navigateTo({
    url: '../askPrice/TicketPrice',
  })
}
})
