/**
 * @author Jeff Weinberg | jeff@enigma.io
 */

/**
 * The application "Core" module bootstraps the application. Core is initialized
 * in main.js and is instantiated as a singleton.
 * When Core is initialized it is passed the config file, which it parses to create
 * DOM elements and to initialize each chart
 */

// Create a namespace "dashboard.". If the namespace exists, use existing, if not,
// create an empty object
var dashboard = dashboard || {};

dashboard.Core = (function () {

  // Quick access variable
  var dash = this.dashboard;
  dash.config = {};
  dash.currentConfig = {};
  var $dash = $("#dash");
  var count = 0;
  var counter = 0;
  var boardNum_ = 0;
  return {

    init: function(config, boardNum) {
      boardNum_ = boardNum;
      this.dashboards = [];
      this.dashboardNames = [];
      $dash.empty();
      dash.config = config;
      this.parseConfig(dash.config);
      this.calcMargins();
      this.initializeModules();
    },

    parseConfig: function(config) {
      $dash.empty();
      _.each(config, function (value, key) {
        this.dashboards.push(_.omit(value, 'name'));
        this.dashboardNames.push(value['name']);
      }, this);
      dash.currentConfig = this.dashboards[boardNum_];
      dash.Core.createDom(dash.currentConfig, this.dashboardNames[boardNum_]);
    },

    clearDash: function() {
      var clearDelay = 1;
      var $dashChildren = $dash.find(".chart");
      if ($dashChildren.length > 0) {
        _.each($dashChildren, function(el, ind){
          clearDelay = ind * 150;
          setTimeout(function(){
            $(el).addClass("hidden");
          }, clearDelay);
        }, this);
        $dash.empty();
      }
      else {
        return false;
      }
    },

    displayDash: function(el, delay) {
      var clearDelay = delay;
      setTimeout(function(){
        el.removeClass("hidden");
      }, clearDelay);
    },

    // Create the DOM from parameters in the config file. The naming convention is to use
    // the chart name as the class on the chart container and to give each chart a sequential ID.
    //TODO: Use Temmplates such as Handlebar or Underscore templates instead of building DOM strings

    createDom: function (currConfig, boardName) {
      count = 0;
      var dashTitle = "<a id='nav-caret-dash-a' href='#'><h1 id='dash-title'>" + boardName + "<i id='nav-caret-dash' class='fa fa-caret-down'></i></h1></a>";
      var dashDD = "<div id='dash-dropdown' class='hidden'>";
      dashDD += "<a href='#' id='switch-dash1'>Enigma KPIs</a>";
      dashDD += "<a href='#' id='switch-dash2'>Enigma Parsing Metrics</a>"
      dashDD += "</div>";
      $dash.append(dashTitle);
      $dash.append(dashDD);
      _.each(currConfig, function(value, key) {
        var name = value.name, title = value.title, width = value.width, height = value.height, end = value.end, type = value.type;
        var classes = name + " " + width + " " + height + " " + ((typeof type !== 'undefined') ? type : '') + " chart no-margin";
        var chart = "<div class='hidden " + classes + "'><div class='chart-header'>" + "<h3>" + ((typeof title !== 'undefined') ? title : '') +
            "</h3></div><p id='chart" + (count + 1) + "'></p></div>";
        $dash.append(chart);
        count++;
      }, this);

    },

    // Override the margin-right on the last chart item in a row, set it to zero.

    calcMargins: function() {
      $(".chart").each(function (index) {
        var position = $(this).position();
        var elWidth = $(this).innerWidth();
        var dashboardWidth = $dash.innerWidth();
        var testX = position.left + elWidth;
        var threshold = .95 * dashboardWidth;
        if (testX < threshold) {
          $(this).removeClass('no-margin');
        }
      });
    },

    // Iterate through config file and instantiate each chart module

    initializeModules: function() {
      var counter = 0;
      var clearDelay = 0;
      _.each(dash.currentConfig, function (value) {
        var binding = "#chart" + (counter + 1);

        var chart =  dashboard[value.name];
        var newChart = new chart(binding, value);
        var chartEl = $(binding).parent();
        counter++;
        clearDelay = counter * 250;
        this.displayDash(chartEl, clearDelay);
      }, this);
    }
  };
})();