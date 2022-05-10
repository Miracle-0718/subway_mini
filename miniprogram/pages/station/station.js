// pages/station/station.js

Page({
  data: {
    currentIndex: 0,
    winHeight: 500,
    lines: [{
        nm: '一号线',
        id: '0',
        station: '莘庄--富锦路',
        now: '正在运行'
      },
      {
        nm: '二号线',
        id: '1',
        station: '广兰路--徐泾东',
        now: '正在运行'
      },
      {
        nm: '三号线',
        id: '2',
        station: '上海南站--江杨北路',
        now: '正在运行'
      },
      {
        nm: '四号线',
        id: '3',
        station: '上海体育馆--上海体育场',
        now: '正在运行'
      },
      {
        nm: '五号线',
        id: '4',
        station: '莘庄--奉贤新城/闵行开发区',
        now: '正在运行'
      },
      {
        nm: '六号线',
        id: '5',
        station: '东方体育中心--港城路',
        now: '正在运行'
      },
      {
        nm: '七号线',
        id: '6',
        station: '美兰湖--花木路',
        now: '正在运行'
      },
      {
        nm: '八号线',
        id: '7',
        station: '沈杜公路--徐泾东',
        now: '市光路'
      },
      {
        nm: '九号线',
        id: '8',
        station: '松江南站--曹路',
        now: '正在运行'
      },
      {
        nm: '十号线',
        id: '9',
        station: '虹桥火车站--基隆路 航中路--龙溪路',
        now: '正在运行'
      },
      {
        nm: '十一号线',
        id: '10',
        station: '嘉定北站--迪士尼站 花桥站--嘉定新城站',
        now: '正在运行'
      },
      {
        nm: '十二号线',
        id: '11',
        station: '七莘路--金海路',
        now: '正在运行'
      },
      {
        nm: '十六号线',
        id: '12',
        station: '龙阳路--滴水湖',
        now: '正在运行'
      },
      {
        nm: '十七号线',
        id: '13',
        station: '虹桥火车站--东方绿舟',
        now: '正在运行'
      },
    ],
    personnumber: [{
        num: '120',
        id: '11',
        rt: '当前查询：'
      },
      {
        num: '120',
        id: '22',
        rt: '1号线'
      }
    ],
    //轨迹部分
    markers: [
    ],
    polyline: [{
      color: '#c71d39',
      points: [],
      width: 5
    }],
    points: [],

  },
  // 跳转信息页面
  lineDetail: function (e) {
    console.log(e)
    wx.setStorageSync('stationinfo_page', e.currentTarget.id)
    //app.globalData.stationinfo_page=e.currentTarget.id //全局变量传值方法，WEUI插件的引引用后产生影响，报错;改用缓存传数据
    wx.navigateTo({
      //url: '/pages/detail/detail'+e.currentTarget.id,
      url: '/pages/detail/detail'
    })
  },
  //基本信息与实时信息页面切换
  changeCurrentIndex: function (e) {
    this.setData({
      currentIndex: e.currentTarget.id
    })
  },

  onLoad: function (options) {
    this.setData({
      winHeight: this.data.lines.length * 350
    })

    //实时信息部分
    wx.request({ //接口地铁信息处理
      url: 'https://map.amap.com/service/subway?_1469083453978&srhdata=3100_drw_shanghai.json&s=1',
      method: 'GET',
      data: {},
      success: res => {
        var stationinfo_all = res.data.l[0].st //获取本站站点信息
        var station_num = stationinfo_all.length //获取站点个数
        var longitude
        var latitude
        for (let i = 0; i < station_num; i++) {
          longitude = stationinfo_all[i].sl.split(',')[0]
          latitude = stationinfo_all[i].sl.split(',')[1]
          let temp = "points[" + i + "].longitude"
          let temp2 = "points[" + i + "].latitude"
          this.setData({
            [temp2]: latitude ,
            [temp]: longitude,
          })
        }
      }
    })
  },

  //地铁轨迹部分
  move:function() {
    const mapCtx = wx.createMapContext('map', this)
    const points = this.data.points
    mapCtx.includePoints({
      points:points
    })
    this.setData({
      markers: [{
        latitude: 31.111152, 
        longitude: 121.385373,
        id: 20,
        //rotate: 90,
        width: 30,
        height: 30,
        anchor : {
          x: 0.5,
          y: 0.4
        }
      }],
      polyline: [{
        color: '#c71d39',
        points: points,
        width: 4
      }],
    })
    mapCtx.moveAlong({
      markerId: 20,
      autoRotate: true,
      path: points,
      duration: 15000,
    })
  }
})