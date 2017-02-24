var dashboard = dashboard || {};

dashboard.riverListChart = function(binding, opts) {
  this.data = opts.data;
  this.binding = binding;
  this.description = opts.desc;
  this.data_url = this.data['url'];
  this._init();
};

dashboard.riverListChart.prototype._init = function() {
  this._getData();
};

dashboard.riverListChart.prototype._getData = function() {
  var boundDataHandler = this._dataHandler.bind(this);
  $.getJSON(this.data_url, function(data) {
    boundDataHandler(data);
  });
};

dashboard.riverListChart.prototype._dataHandler = function(data) {
  var metricsObj = _.omit(data, 'x');
  var that = this;
  var entryObj = {};
  var sortedArray = [];


  //_.each(metricsObj, function(val, key) {
  //  var name = that._extractName(key);
  //  var dataset = that._extractDataset(key);
  //  var timest = that._convertTimestamp(val);
  //  var valArray = [];
  //  valArray.push(name, timest);
  //  entryObj[dataset] = valArray;
  //});

  _.each(metricsObj, function(val, key) {
    var obj = {};
    var name = that._extractName(key);
    var dataset = that._extractDataset(key);
    var timest = that._convertTimestamp(val);
    obj['dataset'] = dataset;
    obj['name'] = name;
    obj['date'] = val[0];
    obj['realtime'] = timest;
    sortedArray.push(obj);
  })


  sortedArray.sort(function(x, y){
    date1 = new Date(x.date);
    date2 = new Date(y.date);
    return date2 - date1 ;
  });
  console.log(sortedArray);
  this._buildDom(sortedArray);
};

dashboard.riverListChart.prototype._extractName = function(str) {
  return str.split('|')[1];
};

dashboard.riverListChart.prototype._extractDataset = function(str) {
  return str.split('|')[0];
};

dashboard.riverListChart.prototype._convertTimestamp = function(ts) {
  var theDate = new Date(ts * 1000);
  dateString = theDate.toTimeString();
  return dateString;
}

dashboard.riverListChart.prototype._buildDom = function(sortedArray) {
  var listContent = "<div class='table-cont'><div class='table' style='width: 100%'>";
  listContent += "<div class='tr'><div class='td' style='50%'>DATAPATH</div><div class='td' style='30%'>TIME PARSED</div><div class='td' style='20%'>PARSED BY</div></div>";
  _.each(sortedArray, function(el, ind) {
    var ts = el.date;
    listContent += "<div class='tr'>";
    listContent += "<div class='td' style='width: 50%'>" + el.dataset + "</div>";
    listContent += "<div class='td' style='width: 30%'>" + moment(ts, "X").format("h:mm:ss a") + "</div>";
    listContent += "<div class='td' style='width: 20%'>" + el.name + "</div>";
    listContent += "</div>";
  })

  $(this.binding).append(listContent);
};