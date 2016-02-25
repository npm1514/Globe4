angular.module("world").controller("bars", function($scope, mainService) {

  //***************************bars****************************

    $scope.data = [0, 0, 0, 0, 0];

    var text = ["Total Students", "States", "Countries", "Out of State Retention", "Total Jobs"];

    d3.select('.bars')
    .selectAll('div')
    .data($scope.data)
    .enter()
    .append('div')
    .text(text)
    .style('width', function(d,i){
      return 0;
    });
      var stateArray = [];
      var countryArray = [];
      var retentionCount = 0;
      var jobs = 0;
      for(var i = 0; i < mainService.cohorts.length; i++) {

        $scope.data[0] = $scope.data[0] + mainService.cohorts[i].people.length;

        for (var j = 0; j < mainService.cohorts[i].people.length; j++) {
          stateArray.push(mainService.cohorts[i].people[j].geometryfrom.state);
          countryArray.push(mainService.cohorts[i].people[j].geometryfrom.country);
          if (mainService.cohorts[i].people[j].job) {
            jobs++;
          }
          if (mainService.cohorts[i].people[j].geometryto.state === "UT") {
            retentionCount++;
          }
        }
      }
      $scope.data[4] = (jobs/($scope.data[0])*100).toFixed(0);
      $scope.data[3] = (retentionCount/($scope.data[0])*100).toFixed(0);

      for (var k = 0; k < stateArray.length; k++) {
        for (var l = k + 1; l < stateArray.length; l++) {
          if (stateArray[l] === stateArray[k]) {
            stateArray.splice(l, 1);
            l--;
          }
        }
      }
      $scope.data[1] = stateArray.length;

      for (var m = 0; m < countryArray.length; m++) {
        for (var n = m + 1; n < countryArray.length; n++) {
          if (countryArray[n] === countryArray[m]) {
            countryArray.splice(n, 1);
            n--;
          }
        }
      }
      $scope.data[2]= countryArray.length;

      d3.select('.bars')
      .selectAll('div')
      .data($scope.data)
      .transition()
      .duration(4000)
      .style('width', function(d,i){
        return d + '%';
      })
      .style('background-color', function(d,i){
        return d3.hsl(i/$scope.data.length*360,0.5,0.5);
      });

});
