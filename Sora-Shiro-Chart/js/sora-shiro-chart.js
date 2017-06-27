
var mSoraShiroCanvas;
var mSoraShiroLineCharts = [];

SoraShiroEntry = {
  isSoraShiroEntry: true,
  setX: function (X) {
    this.x = X;
  },
  setY: function (Y) {
    this.y = Y;
  },
  getX: function () {
    return this.x;
  },
  getY: function () {
    return this.y;
  },
};

SoraShiroLineChart = {
  isSoraShiroLineChart: true,
  setEntrys: function (Entrys) {
    var i = 0;
    //TODO judge if Array
    for(; i < Entrys.length; i++) {
      if(Entrys[i].isSoraShiroEntry == undefined) {
        throw new TypeError("Entrys [$i] Not SoraShiroEntry var");
      }
    }
    this.entrys = Entrys;
  },
  getEntrys: function () {
    return this.entrys;
  },
  setHeight: function (height) {
    this.height = height;
  },
};

SoraShiroCanvas = {
  setCanvas: function (Canvas) {
    this.canvas = Canvas;
  },
  getCanvas: function () {
    return this.canvas;
  }
}


