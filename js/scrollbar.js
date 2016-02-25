angular.module("world").controller("scrollbar", function($scope, mainService) {

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
    .data([{x: 100, y : 20}])
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
    var range = 450;
    var time = d.x;
    var percentdrag = time/range;
    var start = moment().set({
      "year": 2014,
      "month": 10,
      "date": 3
    });
    var end = moment();
    // console.log(start);
    var timeline = end._d - start._d;
    // console.log(timeline);
    var timelinerate = ((time / range) * timeline) + start;
    var scrolldate = moment(timelinerate);
    for (var i = 0; i < mainService.cohorts.length; i++) {

      //if scroll date is greater than the day in the object, include date in object
      if (scrolldate > moment().set(mainService.cohorts[i].start)) {

      }
      if (scrolldate > moment().set(mainService.cohorts[i].end)) {

      }
    }


    d3.select(this)
        .attr("opacity", 0.6)
        .attr("cx", d.x = Math.max(0, Math.min(450, d3.event.x)))
        .attr("cy", d.y = 20);

  }
  //end dragging
  function dragEnd() {
      d3.select(this)
          .attr('opacity', 1);
  }

});
