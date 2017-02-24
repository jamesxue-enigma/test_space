/**
 * @author Jeff Weinberg | jeff@enigma.io
 * Chart module - extend with binding and options parameters.
 * Generate C3 chart with the parameters
 */

var dashboard = dashboard || {};

dashboard.lineChart = function (binding, opts) {
  this.data = opts.data;
  this.binding = binding;
  this.options = opts || {};
  this.range = opts.range;
  this.rawData = dashboard.Utils.dataUtils.getData(this.data['url'], this.range);
  var boundInit = _.bind(this._init, this);
  this.rawData.done(function(data){
    boundInit(dashboard.Utils.dataUtils.dataHandler('lineChart',data));
  });
};

dashboard.lineChart.prototype._init = function(data){
  var parameters = {
    bindto: this.binding,
    data: data
  };
  var settings = $.extend({},this.options, parameters);
  c3.generate(settings);
};