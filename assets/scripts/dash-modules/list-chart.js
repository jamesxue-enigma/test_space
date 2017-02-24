var dashboard = dashboard || {};

dashboard.listChart = function(binding, opts) {
  this.data = opts.data;
  this.binding = binding;
  this.description = opts.desc;
  this.data_url = this.data['url'];
  this._init();
};

dashboard.listChart.prototype._init = function() {
  this._getData();
};

dashboard.listChart.prototype._getData = function() {
  var boundDataHandler = this._dataHandler.bind(this);
  $.getJSON(this.data_url, function(data) {
    boundDataHandler(data);
  });
};

dashboard.listChart.prototype._dataHandler = function(data) {
  var metricsObj = _.omit(data, 'x');
  var transObj = {};
  var boundSumArray = this._sumArray.bind(this);

  for (pages in metricsObj) {
    if (metricsObj.hasOwnProperty(pages)){
      var summed = this._sumArray(metricsObj[pages]);
      transObj[pages] = summed;
    }
  }
  var pairs = _.pairs(transObj);
  var total = transObj['total'];
  pairs.sort(function(a, b) {return b[1] - a[1]});
  transObj = _.object(pairs);
  transObj = _.omit(transObj, 'total');
  this._buildDom(transObj, total);
};

dashboard.listChart.prototype._sumArray = function(input) {
  return _.reduce(input, function(memo, num){ return memo + num; }, 0);
};

dashboard.listChart.prototype._buildDom = function(listObj, total) {
  var listContent = "<div class='table-cont'><div class='table' style='width: 100%'>";
  listContent += "<div class='tr'><div class='td' style='80%'>PAGE</div><div class='td' style='20%'># of Views</div></div>";
  for (page in listObj) {
    if (listObj.hasOwnProperty(page)) {
      listContent += "<div class='tr'>";
      listContent += "<div class='td' style='width: 80%'>" + page + "</div>";
      listContent += "<div class='td' style='width: 20%'>" + listObj[page] + "</div>";
      listContent += "</div>";
    }
  }
  listContent += "</div></div></div>";
  var totalMetric = "<div class='total-metric table' style='width:100%;'><div class='tr'><div class='td' style='80%'><strong>TOTAL OVERALL PAGEVIEWS: </strong></div><div class='td' style='20%'>" + total + "</div></div></div>";
  $(this.binding).append(listContent);
  $(this.binding).append(totalMetric);
};