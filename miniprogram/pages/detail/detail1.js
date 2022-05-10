// pages/detail/detail1.js
Page({

  
  data: {
    line:'0',
    stations:['莘庄', '外环路', '莲花路', '锦江乐园', '上海南站', '漕宝路', '上海体育馆', '徐家汇', '衡山路', '常熟路', '陕西南路', '黄陂南路', '人民广场', '新闸路', '汉中路', '上海火车站', '中山北路', '延长路', '上海马戏城', '汶水路', '彭浦新村', '共康路', '通河新村', '呼兰路', '共富新村', '宝安公路', '友谊西路', '富锦路'],
    
    station_exit:['北出口-莘建东路','南出口-梅陇西路'],
    station_bus:'not require',
    station_longtitude:121.385373,
    station_latitude:31.111152,
    currentIndex:0,
  },
  
  onLoad: function() {
    this.setData({//页面数据初始化
      station_name:'莘庄',
      longitude:this.data.station_longtitude,
      latitude:this.data.station_latitude,
      markers:[{
        longitude:this.data.station_longtitude,
         latitude:this.data.station_latitude,
      }]
     })

  },

switch_station(e){
  // console.log(e);
  var {index}=e.currentTarget.dataset;
   console.log(index);
   wx.request({  //接口地铁信息处理
    url: 'https://map.amap.com/service/subway?_1469083453978&srhdata=3100_drw_shanghai.json&s=1',
    method:'GET',
    data:{
    },
    success: res => {
      var lineinfo=res.data.l[0]//获取地铁线路全部信息
      var stationinfo_all=res.data.l[0].st//获取本站站点信息
      var station_name=stationinfo_all[index].n//获取站点名称
      var station_location=stationinfo_all[index].sl.split(',')//获取站点经纬度
      this.setData({//页面数据
        currentIndex:index,
        station_name:station_name,
        longitude: station_location[0],
        latitude:station_location[1],
        markers:[{
          longitude: station_location[0],
          latitude:station_location[1],
        }]
       })
      }
  }) 
} 
  
})