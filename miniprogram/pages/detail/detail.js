// miniprogram/pages/detail/detail.js
var line;
Page({
  data: {
    station_exit: ['北出口-莘建东路', '南出口-梅陇西路'],
    station_bus: ['5号线'],
    station_longtitude: 121.385373,
    station_latitude: 31.111152,
    currentIndex: 0,
  },

  onLoad: function () {
    line= wx.getStorageSync('stationinfo_page')
    //line=app.globalData.stationinfo_page;
    //console.log(line)
    this.setData({ //页面数据初始化
      station_name: '莘庄',
      longitude: this.data.station_longtitude,
      latitude: this.data.station_latitude,
      markers: [{
        longitude: this.data.station_longtitude,
        latitude: this.data.station_latitude,
      }]
    })
    wx.request({ //接口地铁信息处理
      url: 'https://map.amap.com/service/subway?_1469083453978&srhdata=3100_drw_shanghai.json&s=1',
      method: 'GET',
      data: {},
      success: res => {
        var lineinfo = res.data.l[line] //获取地铁线路全部信息
        var stationinfo_all = res.data.l[line].st //获取本站站点信息
        var station_num= stationinfo_all.length //获取站点个数
        var stations=[]
        for(let i=0;i<station_num;i++){//获取所有站点名称，用于scroll组件渲染
          stations[i]=stationinfo_all[i].n
        }
        this.setData({
          stations: stations,
          station_name: stationinfo_all[0].n,
          longitude:stationinfo_all[0].sl.split(',')[0],
          latitude: stationinfo_all[0].sl.split(',')[1],
         markers: [{
            longitude: stationinfo_all[0].sl.split(',')[0],
            latitude: stationinfo_all[0].sl.split(',')[1],
          }]
        }, ()=> {
          //console.log(stations)
        })
      }
    })

  },

  switch_station(e) {
    // console.log(e);
    var {
      index
    } = e.currentTarget.dataset;
    console.log(index);
    wx.request({ //接口地铁信息处理
      url: 'https://map.amap.com/service/subway?_1469083453978&srhdata=3100_drw_shanghai.json&s=1',
      method: 'GET',
      data: {},
      success: res => {
        var lineinfo = res.data.l[line] //获取地铁线路全部信息
        var stationinfo_all = res.data.l[line].st //获取本站站点信息
        var station_name = stationinfo_all[index].n //获取站点名称
        var station_location = stationinfo_all[index].sl.split(',') //获取站点经纬度
        this.setData({ //页面数据
          currentIndex: index,
          station_name: station_name,
          longitude: station_location[0],
          latitude: station_location[1],
          markers: [{
            longitude: station_location[0],
            latitude: station_location[1],
          }],
          station_exit:['北出口-沪闵路', '南出口-梅陇西路'],
          station_bus: ['无']
        })
      }
    })
  }

})