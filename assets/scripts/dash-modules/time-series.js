/**
 * @author Jeff Weinberg | jeff@enigma.io
 * Chart module - extend with binding and options parameters.
 * Generate C3 chart with the parameters
 */

var dashboard = dashboard || {};

dashboard.timeSeries = function (binding, opts) {
  this.data = opts.data;
  this.binding = binding;
  this.options = opts || {};
  this.range = opts.range;
  this.rawData = dashboard.Utils.dataUtils.getData(this.data['url'], this.range);
  var boundInit = _.bind(this._init, this);
  this.rawData.done(function(data){
    console.log("OPTS: ", opts)
    boundInit(dashboard.Utils.dataUtils.dataHandler('timeSeries',data, opts));
  });
};

dashboard.timeSeries.prototype._init = function(data){
  var parameters = {
    bindto: this.binding,
    data: data,
    padding: {
      top: 0,
      right: 50,
      bottom: 0,
      left: 50
    }
  };
  var settings = $.extend({},this.options, parameters);
  this.chartInstance = c3.generate(settings);
  if (this.options.zoomOption){
    this._buildZoomControl();
  }
};

dashboard.timeSeries.prototype._buildZoomControl = function(){
  var bindingNum = this.binding.slice(-1);
  var zoomCheckbox = "<section title='.squared" + bindingNum + "' class='squaredCheckbox'><div class='squaredThree'><input type='checkbox' value='None' id='squared" + bindingNum + "' name='check' />"
  zoomCheckbox += "<label for='squared" + bindingNum + "'></label><span>Enable Zoom</span></div></section>";
  $(this.binding).append(zoomCheckbox);
  this._bindZoomControl();
};

dashboard.timeSeries.prototype._bindZoomControl = function(){
  var chart = this.chartInstance;
  var bindingNum = this.binding.slice(-1);
  var checkbox = "#squared" + bindingNum;
  $(checkbox).change(function(e){
    if ($(this).is(':checked')) {
      chart.zoom.enable(true);
    }
    else {
      chart.zoom.enable(false);
    }
  });

};
