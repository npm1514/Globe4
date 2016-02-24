angular.module("world").service("mainService", function() {
  this.cohorts = [
    {
      "cohortNum": "DM1",
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

});
