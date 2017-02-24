/**
 * @author Jeff Weinberg | jeff@enigma.io
 * Config file for the dashboard. See C3 docs for options
 * for the C3 charts:
 * http://c3js.org/reference.html
 */

var dashboard = dashboard || {};

dashboard.API_MAP = {
  parses: '@@API_SCHEME_HOST/api/v1/bucket/parse?metapi-key=@@API_KEY',
  career_monthly: '@@API_SCHEME_HOST/api/v1/bucket/career_monthly?metapi-key=@@API_KEY',
  finance: '@@API_SCHEME_HOST/api/v1/bucket/finance?metapi-key=@@API_KEY',
  hiring: '@@API_SCHEME_HOST/api/v1/bucket/hiring?metapi-key=@@API_KEY&start=2015-05-01',
  offers: '@@API_SCHEME_HOST/api/v1/bucket/offer?metapi-key=@@API_KEY',
  pageviews: '@@API_SCHEME_HOST/api/v1/bucket/pageviews?metapi-key=@@API_KEY',
  signups: '@@API_SCHEME_HOST/api/v1/bucket/signups?metapi-key=@@API_KEY&start=2015-05-24',
  riverMonthlyCum: '@@API_SCHEME_HOST/api/v1/bucket/enigma_monthly_cumulative?metapi-key=@@API_KEY',
  riverDailyCum: '@@API_SCHEME_HOST/api/v1/bucket/enigma_daily_cumulative?metapi-key=@@API_KEY',
  riverDataToday: '@@API_SCHEME_HOST/api/v1/bucket/enigma_datasets_today?metapi-key=@@API_KEY',
  riverDataTotal: '@@API_SCHEME_HOST/api/v1/bucket/enigma_total?metapi-key=@@API_KEY'
};

dashboard.config = {
  enigmaKPIs: {
    name: 'Enigma KPIs',
    areaChart1: {
      name: 'area',
      title: 'Number of Parses, Past Year',
      width: 'w3',
      height: 'h2',
      range: 'year',
      zoomOption: true,
      data: {
        x: 'x',
        url: dashboard.API_MAP.parses,
        mimeType: 'json'
      },
      color: {
        pattern: ['#FCCD52', '#51B8F2', '#19BA4B']
        //pattern: ['#FF297E']
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
        enabled: false
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
        enabled: false
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
    }
  },
  enigmaParsing: {
    name: 'Enigma Parsing Metrics',
    timeSeriesChart1: {
      name: 'timeSeries',
      title: 'River Metrics, Monthly Cumulative',
      width: 'w3',
      height: 'h2',
      range: 'year',
      zoomOption: true,
      transform: ['bytes', 'reduce'],
      exclude: ['rows'],
      addAxis: ['datasets'],
      data: {
        x: 'x',
        url: dashboard.API_MAP.riverMonthlyCum,
        mimeType: 'json'
      },
      color: {
        pattern: ['#C23DFF', '#45E0D3', '#A21ACC']
      },
      zoom: {
        enabled: false
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            fit: true,
            format: '%m-%y'
          }
        },
        y: {
          tick: {
            //format: d3.format(".4f")
            format: function (d) { return d.toFixed(2) + " TB"; }

          },
          label: {
            text: 'Total Data, TB',
            position: 'inner-middle'
          }
        },
        y2: {
          show: true,
          label: {
            text: 'Num. Datasets',
            position: 'inner-middle'
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
    verticalSummary1: {
      name: 'verticalSummary',
      title: 'River Totals',
      width: 'w2',
      height: 'h2',
      range: 'day',
      transform: ['bytes', 'datasets', 'reduce'],
      data: {
        x: 'x',
        url: dashboard.API_MAP.riverDataTotal,
        mimeType: 'json'
      }
    },
    riverListChart1: {
      name: 'riverListChart',
      title: 'River Activity, Today',
      width: 'w3',
      height: 'h2',
      range: 'day',
      transform: ['bytes', 'datasets', 'reduce'],
      data: {
        x: 'x',
        url: dashboard.API_MAP.riverDataToday,
        mimeType: 'json'
      }
    },
    areaChart1A: {
      name: 'area',
      title: 'Number of Parses, Past Year',
      width: 'w2',
      height: 'h2',
      range: 'year',
      zoomOption: true,
      data: {
        x: 'x',
        url: dashboard.API_MAP.parses,
        mimeType: 'json'
      },
      color: {
        pattern: ['#45E0D3']
        //pattern: ['#FF297E']
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
            format: '%m-%d-%y',
            culling: {
              max: 6 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      zoom: {
        enabled: false
      }
    },
  }
};
