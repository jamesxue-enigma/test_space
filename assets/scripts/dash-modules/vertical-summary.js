var dashboard = dashboard || {};

dashboard.verticalSummary = function(binding, opts) {
  this.data = opts.data;
  this.binding = binding;
  this.description = opts.desc;
  this.data_url = this.data['url'];
  this._init();
};

dashboard.verticalSummary.prototype._init = function() {
  this._getData();
};

dashboard.verticalSummary.prototype._getData = function() {
  var boundDataHandler = this._dataHandler.bind(this);
  $.getJSON(this.data_url, function(data) {
    boundDataHandler(data);
  });
};

// The data handler determines the type of aggregation - summing the input data or
// using the most recent value
dashboard.verticalSummary.prototype._dataHandler = function(data) {
  this.bytes = data.bytes;
  this.datasets = data.datasets;
  this.rows = data.rows;
  this.time = moment().format("hh:mm:ss A");
  this.date = data.x;
  this.tb =   dashboard.Utils.dataUtils.transformHelpers.formatBytes(data.bytes, 4);
  console.log(this.tb);

  this._buildDom();
};

dashboard.verticalSummary.prototype._commaSeparateNumber = function(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}

dashboard.verticalSummary.prototype._buildDom = function() {
  var todayTime = "<div class='vert-summary-date'><h3>" + this.time + "</h3></div>";
  var todayDate = "<div class='vert-summary-date'><h3>" + this.date + "</h3></div>";
  var totalData = "<div class='ver-summary-data'><h3>" + this.tb + " TB</h3><p>total Enigma data</p></div>";
  var totalDatasets = "<div class='ver-summary-datasets'><h3>" + this.datasets + "</h3><p>number of Enigma datasets</p></div>";
  var totalRows = "<div class='ver-summary-rows'><h3>" + this.rows + "</h3><p>number of rows in Enigma</p></div>";
  totalDatasets = this._commaSeparateNumber(totalDatasets);
  totalRows = this._commaSeparateNumber(totalRows);
  //$(this.binding).append(todayTime);
  //$(this.binding).append(todayDate);
  $(this.binding).append(totalData);
  $(this.binding).append(totalDatasets);
  $(this.binding).append(totalRows);

};