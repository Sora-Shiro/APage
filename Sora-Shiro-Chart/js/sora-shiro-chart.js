// SoraShiroEntry = {
//   isSoraShiroEntry: true,
//   init: function (X, Y) {
//     this.setX(X);
//     this.setY(Y);
//   },
//   setX: function (X) {
//     this.x = X;
//   },
//   setY: function (Y) {
//     this.y = Y;
//   },
//   getX: function () {
//     return this.x;
//   },
//   getY: function () {
//     return this.y;
//   },
// };

SoraShiroLineChart = {
  isSoraShiroLineChart: true,
  init: function (XLabels, YVals, Color) {
    this.setXLabels(XLabels);
    this.setYVals(YVals);
    this.setColor(Color);
  },
  setXLabels: function (XLabels) {
    if(!isArray(XLabels)) {
      throw new TypeError("Not Array var");
    }
    this.xLabels = XLabels;
  }
  setYVals: function (YVals) {
    if(!isArray(YVals)) {
      throw new TypeError("Not Array var");
    }
    this.yVals = YVals;
  },
  getYVals: function () {
    return this.yVals;
  },
  setColor: function (Color) {
    this.color = Color;
  },
  getColor: function () {
    return this.color;
  },
};

SoraShiroCanvas = {
  isSoraShiroCanvas: true,
  init: function (Canvas, LineCharts) {
    this.setCanvas(Canvas);
    this.setLineCharts(LineCharts);
  },
  setCanvas: function (Canvas) {
    if(Canvas.getContext() == undefined) {
      throw new TypeError("Not HTMLCanvasElement var");
    }
    this.canvas = Canvas;
  },
  getCanvas: function () {
    return this.canvas;
  },
  setLineCharts: function (LineCharts) {
    if(LineCharts.isSoraShiroLineChart == undefined) {
      throw new TypeError("Not SoraShiroLineChart var");
    }
    this.lineCharts = LineCharts;
  },
  getLineCharts: function () {
    return this.lineCharts;
  },
  drawLineCharts: function () {
    var context = this.canvas.getContext("2d");
    var height = this.canvas.height;
    var width = this.canvas.width;
    this.lineCharts.map(function (lineChart) {
      lineChart.xLabels.map(function (xLabel) {

      });
      yVals.sort();
      lineChart.yVals.map(function (yVal) {

      });
    });
  },
};

function isArray(obj) { 
  return Object.prototype.toString.call(obj) === '[object Array]';   
}
