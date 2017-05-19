// underscore 是一个开源库，提供了丰富的高性能的对数组，集合等的操作
// api 手册：http://learningcn.com/underscore
// 为了少加载不必要的代码，默认是不引入 underscore 的，需要用到的话
// 将define所在中的'underscore'的注释去掉即可。即改为
//        define(['underscore'], function() {
//           ...
//        });

define([/*  'underscore'   */], function() {

// data 是Graph的输入数据。
// 使用data参数时，请务必保持只读
// 除非你很清楚你需要对data做什么，并且了解AngularJS的digest循环机制
// 否则请不要增删改data的任何属性，这会引起digest死循环

// context 是生成图形定义的辅助数据，默认值是应用的scope。
// 在生成复杂图形的时候，仅靠data本身不足以生成一个图形定义
// 此时就需要用到这个对象来辅助

// GraphService 是一个函数集，主要提供了对二维数组的常用操作

// attributes 是当前Graph所在的html节点的所有属性集。也是一种辅助数据。
return function(data, context, GraphService, attributes, map) {
    var geoCoordMap=[{"name":"高松県","value":[134.07,34.481,56]},{"name":"広島県","value":[132.853,34.6067,37]},{"name":"岡山県","value":[133.831,34.8521,73]},{"name":"島根県","value":[132.603,35.0972,32]},{"name":"鳥取県","value":[133.819,35.3657,39]},{"name":"山口県","value":[131.645,34.2154,3]},{"name":"佐賀県","value":[130.147,33.0097,99]},{"name":"福岡県","value":[130.616,33.4906,83]},{"name":"熊本県","value":[130.834,32.588,71]},{"name":"宮崎県","value":[131.286,32.0981,82]},{"name":"愛媛県","value":[132.916,33.8141,21]},{"name":"香川県","value":[134.001,34.2162,4]},{"name":"高知県","value":[133.442,33.6129,51]},{"name":"大分県","value":[131.449,33.2006,66]},{"name":"徳島県","value":[134.2,33.8546,38]},{"name":"愛知県","value":[137.214,34.9973,78]},{"name":"岐阜県","value":[136.941,35.8522,50]},{"name":"石川県","value":[136.677,36.5654,74]},{"name":"三重県","value":[136.386,34.5679,56]},{"name":"長野県","value":[138.019,36.0666,88]},{"name":"静冈県","value":[138.306,35.0359,10]},{"name":"富山県","value":[137.246,36.596,69]},{"name":"北海道","value":[142.805,43.37,48]},{"name":"福井県","value":[136.316,35.9297,15]},{"name":"兵庫県","value":[134.837,35.063,94]},{"name":"京都府","value":[135.451,35.2117,13]},{"name":"奈良県","value":[135.877,34.2815,21]},{"name":"大阪府","value":[135.519,34.5993,38]},{"name":"滋賀県","value":[136.093,35.1832,63]},{"name":"和歌山県","value":[135.401,33.93,12]},{"name":"千葉県","value":[140.318,35.489,68]},{"name":"茨城県","value":[140.257,36.2773,81]},{"name":"神奈川県","value":[139.344,35.4378,59]},{"name":"埼玉県","value":[139.287,36.0173,90]},{"name":"栃木県","value":[139.786,36.6593,38]},{"name":"東京都","value":[139.407,35.6578,43]},{"name":"山梨県","value":[138.645,35.6149,34]},{"name":"秋田県","value":[140.334,39.7318,20]},{"name":"青森県","value":[140.769,40.6385,42]},{"name":"福島県","value":[140.099,37.4153,1]},{"name":"岩手県","value":[141.364,39.5715,7]},{"name":"宮城県","value":[140.972,38.5307,89]},{"name":"新潟県","value":[139.005,37.5471,31]},{"name":"山形県","value":[140.084,38.4024,80]},{"name":"長崎県","value":[128.755,32.6745,97]},{"name":"鹿児島県","value":[129.601,29.4572,6]},{"name":"沖縄県","value":[123.802,24.3349,12]},{"name":"群馬県","value":[139.025,36.5592,14]}];
  return {
      backgroundColor: '#404a59',
      tooltip: {
          trigger: 'item',
      },
      visualMap: {
          min: 0,
          max: 100,
          left: 'left',
          top: 'bottom',
          text: ['高','低'],           // 文本，默认为数值文本
          calculable: true
      },
      geo: {
          map: map.type,
          roam: true,//鼠标滚轮缩放
          label: {
              emphasis: {
                  show: true
              }
          },
          itemStyle: {
              normal: {
                  areaColor: '#323c48',
                  borderColor: '#111'
              },
              emphasis: {
                  areaColor: '#2a333d'
              }
          }
      },
      series: [
          {
              type: 'scatter',
              coordinateSystem: 'geo',
              data: geoCoordMap,
              symbolSize: function (val) {
                  return val[2] / 6;
              }
          },
          {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              showEffectOn: 'render',
              rippleEffect: {
                  brushType: 'stroke'
              },
              data: geoCoordMap.sort(function (a, b) {
                  return b.value[2] - a.value[2];
              }).slice(0, 5),
              symbolSize: function (val) {
                  return val[2] / 6;
              },
          }
      ]
  };;
}
});