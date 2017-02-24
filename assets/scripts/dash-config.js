/**
 * @author Jeff Weinberg | jeff@enigma.io
 * Config file for the dashboard. See C3 docs for options
 * for the C3 charts:
 * http://c3js.org/reference.html
 */

var dashboard = dashboard || {};

dashboard.API_MAP = {
  parses: 'https://metapi.enigma.io/api/v1/bucket/parse?metapi-key=@@API_KEY',
  career_monthly: 'https://metapi.enigma.io/api/v1/bucket/career_monthly?metapi-key=@@API_KEY',
  finance: 'https://metapi.enigma.io/api/v1/bucket/finance?metapi-key=@@API_KEY',
  hiring: 'https://metapi.enigma.io/api/v1/bucket/hiring?metapi-key=@@API_KEY&start=2015-05-01',
  offers: 'https://metapi.enigma.io/api/v1/bucket/offer?metapi-key=@@API_KEY',
  pageviews: 'https://metapi.enigma.io/api/v1/bucket/pageviews?metapi-key=@@API_KEY',
  signups: 'https://metapi.enigma.io/api/v1/bucket/signups?metapi-key=@@API_KEY&start=2015-05-24'
};

dashboard.config = {

  areaChart1: {
    name: 'area',
    title: 'Number of Parses, Past Year',
    width: 'w3',
    height: 'h2',
    range: 'year',
    data: {
      x: 'x',
      url: dashboard.API_MAP.parses,
      mimeType: 'json'
    },
    color: {
      pattern: ['#FCCD52', '#51B8F2', '#19BA4B']
    },
    grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%m-%d-%y'
        }
      }
    },
    zoom: {
      enabled: true
    }
  },

  text1Chart1: {
    name: 'text1',
    title: 'Career Page Web Views, Past 30 Days',
    width: 'w2',
    height: 'h1',
    range: 'month',
    desc: 'Web Views, Enigma.io',
    data: {
      url: dashboard.API_MAP.career_monthly,
      mimeType: 'json',
      type: 'text1'
    },
    color: {
      pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
      threshold: {
        values: [30, 60, 90, 100]
      }
    },
    size: {
      height: 180
    }
  },

  lineChart1: {
    name: 'lineChart',
    title: 'Career Page Webviews, Past Year',
    width: 'w2',
    height: 'h1',
    range: 'year',
    type: 'spark',
    data: {
      x: 'x',
      url: dashboard.API_MAP.career_monthly,
      mimeType: 'json'
    },
    color: {
      pattern: ['#51B8F2']
    },
    axis: {
      y: {
        show: false
      },
      x: {
        show: true,
        type: 'timeseries',
        tick: {
          count: 6,
          format: "%b %y",
          fit: true
        }
      }
    },
    grid: {
      x: {
        show: true
      },
      y: {
        show: false
      }
    },
    legend: {
      show: false
    }
  },

  barChart1: {
    name: 'bar',
    title: 'Total Booked Revenue',
    width: 'w2',
    height: 'h2',
    data: {
      x: 'x',
      url: dashboard.API_MAP.finance,
      mimeType: 'json',
      type: 'bar'
    },
    bar: {
      width: {
        ratio: 0.8 // this makes bar width 50% of length between ticks
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      },
      y: {
        tick: {
          format: d3.format('$,')
        }
      }
    },
    color: {
      pattern: ['#91D07B', '#FCCD52', '#51B8F2', '#1f77b4', '#ED8686']
    },
    grid: {
      x: {
        show: false
      },
      y: {
        show: true
      }
    }
  },

  timeSeriesChart1: {
    name: 'timeSeries',
    title: 'Hiring Data, Past Month',
    width: 'w3',
    height: 'h2',
    range: 'month',
    data: {
      x: 'x',
      url: dashboard.API_MAP.hiring,
      mimeType: 'json'
    },
    color: {
      pattern: ['#FCCD52', '#51B8F2', '#19BA4B']
    },
    zoom: {
      enabled: true
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      }
    },
    grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    },
    point: {
      r: 3
    }
  },

  listChart1: {
    name: 'listChart',
    title: 'Top Page Views Past Month - Enigma.io',
    width: 'w3',
    height: 'h2',
    range: 'month',
    desc: 'Page Views, Enigma.io',
    data: {
      url: dashboard.API_MAP.pageviews,
      mimeType: 'json'
    },
    color: {
      pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
      threshold: {
        values: [30, 60, 90, 100]
      }
    },
    size: {
      height: 180
    }
  },

  barChart2: {
    name: 'bar',
    title: 'Enigma App Signups - Past Month (by Dr Chart®)',
    width: 'w2',
    height: 'h2',
    data: {
      x: 'x',
      url: dashboard.API_MAP.signups,
      mimeType: 'json',
      type: 'bar'
    },
    bar: {
      width: {
        ratio: 0.4 // this makes bar width 50% of length between ticks
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%m-%d'
        }
      },
      y: {
        tick: {
          format: d3.format('')
        }
      }
    },
    color: {
      pattern: ['#91D07B', '#FCCD52', '#51B8F2', '#1f77b4', '#ED8686']
    },
    grid: {
      x: {
        show: false
      },
      y: {
        show: true
      }
    }
  },

};

