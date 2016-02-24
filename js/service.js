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
          "tostate": "VA"
        },
        {
          "fromstate": "OR",
          "fromcountry": "USA",
          "job": true,
          "tostate": "OR"
        },
        {
          "fromstate": "England",
          "fromcountry": "UK",
          "job": true,
          "tostate": "FL"
        }
      ]
    }
  ];

});
