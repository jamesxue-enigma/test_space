/**
 * Date Utilities Module. Date String parsing, date diffing and 'humanising' dates
 * Namespaced under dashboard.Utils
 */

var dashboard = dashboard || {};
dashboard.Utils = dashboard.Utils || {};

dashboard.Utils.dateUtils = (function() {
  return {

    // Takes an array of date strings, creates Date objects and gets date diff.
    // Returns diff in humanised english (ex: 1 week and 2 days)
    getDateDiff: function(datesArray) {
      var dateObjArray = this.createDateObjs(datesArray);
      var daysDiff = this.getDaysDiff(dateObjArray);
      return this.humaniseTime(daysDiff);
    },

    // Iterates through array of date strings and creates new array of Date objects
    createDateObjs: function(datesArray) {
      var dates = [];
      var boundParseDate = this.parseDate.bind(this);

      _.each(datesArray, function(el, ind) {
        var date = boundParseDate(el);
        dates.push(date);
      });
      return dates;
    },

    // Parses date strings to create Javascript Date objects
    parseDate: function(input) {
      var parts = input.split('-');
      // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
      return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
    },

    // Returns the TIME difference between two Date objects. Used to compute
    // difference in days.
    getTimeDiff: function(dates) {
      return Math.abs(dates[1].getTime() - dates[0].getTime());
    },

    // Returns date diff in days
    getDaysDiff: function(dates) {
      var timeDiff = this.getTimeDiff(dates);
      return Math.ceil(timeDiff / (1000 * 3600 * 24))
    },

    getDateRange: function(range) {
      switch (range) {
        case "year":
          var endRange = new Date();
          var beginRange = new Date();
          beginRange.setTime(beginRange.valueOf() - (365 * 24 * 60 * 60 * 1000));
          return "&start=" + beginRange.getFullYear() + "-" + ("0" + (beginRange.getMonth() + 1)).slice(-2) + "-" + ("0" + beginRange.getDate()).slice(-2) + "&end=" + endRange.getFullYear() + "-" + ("0" + (endRange.getMonth() + 1)).slice(-2) + "-" + ("0" + endRange.getDate()).slice(-2);
          break;
        case "month":
          var endRange = new Date();
          var beginRange = new Date();
          beginRange.setTime(beginRange.valueOf() - (1 * 30 * 24 * 60 * 60 * 1000));
          return "&start=" + beginRange.getFullYear() + "-" + ("0" + (beginRange.getMonth() + 1)).slice(-2) + "-" + ("0" + beginRange.getDate()).slice(-2) + "&end=" + endRange.getFullYear() + "-" + ("0" + (endRange.getMonth() + 1)).slice(-2) + "-" + ("0" + endRange.getDate()).slice(-2);
          break;
      }
    },

    humaniseTime: function(diff) {
      var str = '';
      var values = {
        'year': 365,
        'month': 30,
        'week': 7,
        'day': 1
      };

      for (var x in values) {
        var amount = Math.floor(diff / values[x]);
        if (amount >= 1) {
          str += amount + ' ' + x + (amount > 1 ? 's' : '') + ' ';
          diff -= amount * values[x];
        }
      }
      return str;
    }
  };
})();