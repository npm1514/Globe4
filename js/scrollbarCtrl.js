angular.module("world").controller("scrollbarCtrl", function($scope, mainService, $rootScope) {

//********************scrollbar
  $scope.scrolldate = moment().set({
    "year": 2014,
    "month": 8,
    "date": 7
  });

  //definition of circle drag
  var drag = d3.behavior.drag()
    .origin(Object)
    .on("drag", dragMove)
    .on('dragend', dragEnd);

    //svg definition
  var svg = d3.select('.scrollbar')
    .append('svg')
    .attr("height", 100)
    .attr("width", 500);

  //svg description
  var g = svg.selectAll('g')
    .data([{x: 0, y : 20}])
    .enter()
    .append('g')
    .attr("height", 100)
    .attr("widht", 450)
    .attr('transform', 'translate(20, 10)');

  //bar description
  var rect = g
    .append('rect')
    .attr('y', 17)
    .attr("height", 5)
    .attr("width", 450)
    .attr('fill', '#C0C0C0');

    //of dragging scroll bar circle
  g.append("circle")
    .attr("r", 15)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("fill", "#2394F5")
    .call(drag);

  //drag scroll bar
  function dragMove(d) {
    $rootScope.$digest();


    var afterData = mainService.cohorts;


    var range = 450;
    var time = d.x;
    var percentdrag = time/range;
    var start = moment().set({
      "year": 2014,
      "month": 8,
      "date": 7
    });
    var end = moment();
    var timeline = end._d - start._d;
    var timelinerate = ((time / range) * timeline) + start;
    $scope.scrolldate = moment(timelinerate);
    $rootScope.cohortupdate = [];

    for (var i = 0; i < afterData.length; i++) {

      var newstart = moment().set({
        "year": parseInt(afterData[i].start.slice(0,4)),
        "month": parseInt(afterData[i].start.slice(5,7)) - 1,
        "date": parseInt(afterData[i].start.slice(8,10))
      });
      var newend = moment().set({
        "year": parseInt(afterData[i].end.slice(0,4)),
        "month": parseInt(afterData[i].end.slice(5,7)) - 1,
        "date": parseInt(afterData[i].end.slice(8,10))
      });


      //if scroll date is greater than the day in the object, include date in object
      if ($scope.scrolldate > newstart && $scope.scrolldate > newend) {
        $rootScope.cohortupdate.push(afterData[i]);
      }

    }
    d3.select(this)
        .attr("opacity", 0.6)
        .attr("cx", d.x = Math.max(0, Math.min(450, d3.event.x)))
        .attr("cy", d.y = 20);  }

  //end dragging
  function dragEnd() {
      d3.select(this)
          .attr('opacity', 1);
  }


});
