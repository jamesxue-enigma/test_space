var dashboard = dashboard || {};

dashboard.text2 = function(binding, opts) {
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

dashboard.text2.prototype._init = function() {
  this._getData();
};

dashboard.text2.prototype._getData = function() {
  var boundDataHandler = this._dataHandler.bind(this);
  $.getJSON(this.data_url, function(data) {
    boundDataHandler(data);
  });
};

dashboard.text2.prototype._dataHandler = function(data) {
  var metricsObj = _.omit(data, 'x');
  var dateArray = _.values(data.x);
  var metricsArray;
  for(key in metricsObj){
    if (metricsObj[key].constructor === Array) {
      metricsArray = metricsObj[key];
    }
  }
  this.delta = this._getDelta(metricsArray);
  this.dateDiff = dashboard.Utils.dateUtils.getDateDiff(dateArray);
  this.metric = metricsArray[metricsArray.length - 1];

  this._buildDom();
};

dashboard.text2.prototype._getDelta = function(input) {
  if (input.constructor === Array) {
    var delta;
    var orig = input[0];
    var current = input[input.length - 1];
    (current > orig) ? this.caret = "caret-up" : this.caret = "caret-down";
    return Math.floor(((current-orig)/orig) * 100) + "% ";
  }
};

dashboard.text2.prototype._buildDom = function() {
  var moduleContent = "<div class='chart-text'><h2 class='" + this.caret + "'><i class='fa fa-" + this.caret + " i-" + this.caret + "'></i>" + " " + this.delta + "</h2><span class='tagline'>" + this.description + "</span></div>";
  var period = "<div class='chart-text-period'><h3>past " + this.dateDiff + "</h3></div>";

  $(this.binding).append(moduleContent);
  $(this.binding).append(period);

};