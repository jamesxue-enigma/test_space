/**
 * Data Utilities Module. Data retrieval, parsing and transformation utilities.
 * Namespaced under dashboard.Utils
 */

var dashboard = dashboard || {};
dashboard.Utils = dashboard.Utils || {};

dashboard.Utils.dataUtils = (function() {
  return {

    // Data Retrieval method. Returns the deferred object which will resolve to the retrieved data when it is
    // finished loading. The caller defines a callback using the done method of the deferred object.

    getData: function(url, range) {
      if (range) {
        url = url + dashboard.Utils.dateUtils.getDateRange(range);
      }
      var deferredObject = $.Deferred();
      $.getJSON(url, function(data) {
        deferredObject.resolve(data);
      });
      return deferredObject;
    },

    // Data Handler method - used by individual chart modules as the callback for a resolved getData call
    // Parses JSON object returned from the API call and transforms the data into C3/D3's format

    dataHandler: function(type, data, config) {
      var c3_data = {
        columns: []
      };
      var excludes;
      var preppedData;

      if (config && config.exclude) {
        excludes = config.exclude;
        if (excludes.length > 0) {
          preppedData = _.omit(data, excludes);
        }
        else {
          preppedData = data;
        }
      }
      else {
        preppedData = data;
      }

      // If the object contains timeseries data, add {x:'x'} to the 'c3_data' object
      if (preppedData['x']){
        $.extend(c3_data, {x: 'x'})
      }

      // For each key in the object, place it at index 0 of the constructed array
      _.each(preppedData, function(val, key) {
        var origArray = val;
        origArray.unshift(key);
        c3_data['columns'].push(origArray);
      });


      if (config && config.transform && config.addAxis) {
        return this[type](c3_data, preppedData, config.transform, config.addAxis);
      }

      else if (config && config.addAxis) {
        return this[type](c3_data, preppedData, "", config.addAxis);
      }

      else if (config && config.transform) {
        return this[type](c3_data, preppedData, config.transform, "");
      }

      else {
        return this[type](c3_data, preppedData, "", "");
      }
      // Call function for the type of chart and pass in constructed data array and original data object
    },

    transformHelpers: {
      findSmallest: function(array) {
        if (_.isEmpty(array)) {
          return 0;
        }
        else {
          return _.min(array);
        }
      },
      findLargest: function(array) {
        if (_.isEmpty(array)) {
          return 0;
        }
        else {
          return _.max(array);
        }
      },
      numDigits: function(num) {
        return num.toString().length;
      },
      byteUnit: "bytes",
      formatBytes: function(bytes,decimals) {
        if(bytes == 0) return '0 Byte';
        var k = 1024;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        this.byteUnit = sizes[i];

        return (bytes / Math.pow(k, i)).toPrecision(dm);
      },
      formatBytesWUnit: function(bytes,decimals) {
        if(bytes == 0) return '0 Byte';
        var k = 1024;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        this.byteUnit = sizes[i];

        return (bytes / Math.pow(k, i)).toPrecision(dm) + " " + this.byteUnit;
      }
    },
    // Bar chart specific transformations
    bar: function(data, origData) {
      data = $.extend({}, data, {type: 'bar'});
      return data;
    },

    // Area chart specific transformations
    area: function(data, origData) {
      var keyObj = {};
      _.each(origData, function(val, key) {
        if (key !== 'x') {
          keyObj[key] = 'area';
        }
      });
      var typesObj = {
        types: keyObj
      }
      $.extend(data, typesObj);
      return data;
    },

    donut: function(data, origData) {
      return data;
    },

    gauge: function(data, origData) {
      return data;
    },

    lineChart: function(data, origData) {
      return data;
    },

    scatter: function(data, origData) {
      return data;
    },

    timeSeries: function(data, origData, trans, addAxis) {
      var transforms;
      var tranFns = this.transformHelpers;
      var addAxis = addAxis;

      if(typeof trans !== "undefined") {
        transforms = {
          "transTarget": trans[0],
          "transMethod": trans[1]
        };

        if (transforms.transTarget === 'bytes') {
          if (transforms.transMethod === 'reduce') {

            var origData2 = _.omit(origData, "x");

            var newByteArray = [];
            _.each(data['columns'], function(el, ind){
              if (el[0] === 'bytes') {
                _.each(el, function(el, ind) {
                  if (ind !== 0) {
                    var byteVal = parseFloat(tranFns.formatBytes(el, 4));
                    byteVal.toFixed(4);
                    newByteArray.push(byteVal);
                  }
                });
                newByteArray.unshift(tranFns.byteUnit);

                data['columns'][0] = newByteArray;
                //data['axes']['TB'] = 'y';
                //data['axes']['datasets'] = 'y2';
                //console.log(data);
                data['axes'] = {
                  'TB': 'y',
                  'datasets': 'y2'
                }
              }
            });
          }
        }
      }
      return data;
    }
  };
})();

/*

 origData2: {
    "bytes": [1167937847296 ],
    "datasets: [ 65676 ],
 }

 data: {
   columns: [
      "bytes": 11679378472962,
      "datasets": 65676,
      "x": "2014-07-13"
   ],
   x: "x"
 }

 origData: {
  "bytes": [ "bytes",  1167937847296 ],
  "datasets: [ "datasets", 65676 ],
  "x": [ "x", "2014-07-13"]
 }

 */