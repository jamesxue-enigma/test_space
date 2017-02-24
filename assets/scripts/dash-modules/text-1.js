var dashboard = dashboard || {};

dashboard.text1 = function(binding, opts) {
  this.data = opts.data;
  this.binding = binding;
  this.description = opts.desc;
  this.data_url = this.data['url'];
  this.dateDiff;
  this.delta;
  this.metric;
  this.caret;
  this._init();
};

dashboard.text1.prototype._init = function() {
  this._getData();
};

dashboard.text1.prototype._getData = function() {
  var boundDataHandler = this._dataHandler.bind(this);
  $.getJSON(this.data_url, function(data) {
    boundDataHandler(data);
  });
};

// The data handler determines the type of aggregation - summing the input data or
// using the most recent value
dashboard.text1.prototype._dataHandler = function(data) {
  var metricsObj = _.omit(data, 'x');
  var dateArray = _.values(data.x);
  var metricsArray;
  for(key in metricsObj){
    if (metricsObj[key].constructor === Array) {
      metricsArray = metricsObj[key];
    }
  }
  this.delta = this._getDelta(metricsArray, "last");
  this.dateDiff = dashboard.Utils.dateUtils.getDateDiff(dateArray);
  this.sum_metric = this._sumArray(metricsArray);
  this.last_metric = metricsArray[metricsArray.length - 1];

  this._buildDom();
};

dashboard.text1.prototype._sumArray = function(input) {
  return _.reduce(input, function(memo, num){ return memo + num; }, 0);
}

dashboard.text1.prototype._getDelta = function(input, measurement) {
  if (input.constructor === Array) {
    var delta;
    var mm;
    if (measurement == 'first') {
      mm = input[0];
    }
    else if (measurement == 'last') {
      mm = input[input.length -2];
    }
    var current = input[input.length - 1];
    (current > mm) ? delta = "increase" : delta = "decrease";
    (current > mm) ? this.caret = "caret-up" : this.caret = "caret-down";
    return Math.floor(((current-mm)/mm) * 100) + "% ";
  }
};

dashboard.text1.prototype._buildDom = function() {
  var moduleContent = "<div class='chart-text horizontal'><h2>" + this.last_metric + "</h2><span class='tagline'>" + this.description + "</span></div>";
  var deltaContent = "<div class='chart-text-delta'><h3 class='" + this.caret + "'><i class='fa fa-" + this.caret + " i-" + this.caret + "'></i>" + this.delta + "</h3></div>";
  var period = "<div class='chart-text-period'><h3>" + this.dateDiff + "</h3></div>";

  $(this.binding).append(moduleContent);
  $(this.binding).append(deltaContent);
  $(this.binding).append(period);

};