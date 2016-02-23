angular.module("world").controller("bars", function($scope) {

    var data = [5, 15, 5, 25, 35, 10];

    var text = ["Total Students", "States", "Countries", "", "Out of State Retention", "Total Jobs"];

    d3.select('.bars')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .text(text)
    .style('width', function(d,i){
      return 0;
    });

    data = [75, 40, 20, 0, 50, 60];

    d3.select('.bars')
    .selectAll('div')
    .data(data)
    .transition()
    .duration(4000)
    .style('width', function(d,i){
      return d + '%';
    })
    .style('background-color', function(d,i){
      return d3.hsl(i/data.length*360,0.5,0.5);
    });



});
