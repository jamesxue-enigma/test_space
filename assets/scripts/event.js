/**
 * Simple Event system. Currently unused, but it will be when multiple dashboards are in effect.
 *
 * Basic usage:
 *
 *  Event.on('counted.to::1000', function() {
 *    doSomething();
 *  });
 *
 *  for (i = 0; i <= 1000; i++) {
 *    // Count to 1000...
 *  }
 *
 *  Event.fire('counted.to::1000'); // doSomething() is called
 */

var dashboard = dashboard || {};

dashboard.Event = function () {

  var self = this;

  self.queue = {};
  self.fired = [];

  return {

    fire: function (event) {
      // assigns the callback array defined in the queue object to var queue
      var queue = self.queue[event];

      // if no callback has been defined, return
      if (typeof queue === 'undefined') {
        return;
      }

      // Call the callback function and remove it from the callback array
      while (queue.length) {
        (queue.shift())();
      }

      self.fired[event] = true;
    },

    on: function (event, callback) {

      // fire callback if criteria is met
      if (self.fired[event] === true) {
        return callback();
      }

      // if no callback for the event exists, create an empty callback array in the queue object
      if (typeof self.queue[event] === 'undefined') {
        self.queue[event] = [];
      }

      // push the callback function into the callback array in the queue object
      self.queue[event].push(callback);
    }
  };

}();
