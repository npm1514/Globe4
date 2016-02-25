angular.module("world").service("mainService", function() {
  this.cohorts = [
    {
      "cohortNum": "DM1",
      "start": "2014-11-10T10:20:90Z",
      "end": "2015-03-01T10:20:90Z",
      "people": [
        {
          "fromstate": "NY",
          "fromcountry": "USA",
          "job": true,
          "tostate": "UT"
        },
        {
          "fromstate": "CA",
          "fromcountry": "USA",
          "job": true,
          "tostate": "CA"
        },
        {
          "fromstate": "ON",
          "fromcountry": "Canada",
          "job": true,
          "tostate": "ON"
        }
      ]
    },
    {
      "cohortNum": "DM2",
      "start": "2015-01-05T10:20:90Z",
      "end": "2015-04-20T10:20:90Z",
      "people": [
        {
          "fromstate": "VA",
          "fromcountry": "USA",
          "job": false,
          "tostate": "UT"
        },
        {
          "fromstate": "OR",
          "fromcountry": "USA",
          "job": true,
          "tostate": "UT"
        },
        {
          "fromstate": "England",
          "fromcountry": "UK",
          "job": true,
          "tostate": "FL"
        }
      ]
    },
    {
      "cohortNum": "DM3",
      "start": "2015-03-02T10:20:90Z",
      "end": "2015-06-15T10:20:90Z",
      "people": [
        {
          "fromstate": "MD",
          "fromcountry": "USA",
          "job": true,
          "tostate": "MD"
        },
        {
          "fromstate": "WA",
          "fromcountry": "USA",
          "job": true,
          "tostate": "UT"
        },
        {
          "fromstate": "Mosgow",
          "fromcountry": "RS",
          "job": true,
          "tostate": "UT"
        }
      ]
    }
  ];

  this.cohortchanges = this.cohorts;

});
