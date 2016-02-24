angular.module("world").controller("earth", function($scope) {

  var scale = 400;


  $scope.zoomin = function () {
    if (scale > 1500) {
      return;
    }
    scale = scale + 50;
    proj.scale(scale);
    sky.scale(scale);
    refresh();
  };

  $scope.zoomout = function () {
    if (scale < 101) {
      return;
    }
    scale = scale - 50;
    proj.scale(scale);
    sky.scale(scale);
    refresh();
  };

  //establish mouse move variable
  d3.select(window)
      .on("mousemove", mousemove)
      .on("mouseup", mouseup);

  var width = 1300,
      height = 1000;

  //view of earth
  var proj = d3.geo.orthographic()
      .translate([width / 2.5, height / 2.25])//position of earth on page
      .clipAngle(90)//determines projection of map on globe
      .scale(scale)
      .rotate([104,-30]);//size of projection

  //view of sky
  var sky = d3.geo.orthographic()
      .translate([width / 2.5, height / 2.25])//position of sky on page
      .clipAngle(90)
      .scale(scale*1.3)
      .rotate([104,-30]);//size of projection




  //location points
  var path = d3.geo.path()
  .projection(proj);

  //function for projection of arc lines
  var swoosh = d3.svg.line()
        .x(function(d) {
          return d[0];
        })
        .y(function(d) {
          return d[1];
        })
        .interpolate("cardinal")//type of lines, may be straight, ,linear, with a peek, or just rounded like we have
        .tension(-0.05);//curvature of arc lines -1 to 1

  var linkcamp = [],
      linkjob = [];
      arcLines = [];


  var svg = d3.select(".earth").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousedown", mousedown);

  //call in json of world svg and coordinates
  queue()
    .defer(d3.json, "json/world-110m.json")
    .defer(d3.json, "json/places.json")
    .await(ready);


  function ready(error, world, places) {
    console.log(world);
    //ocean fill
    var ocean_fill = svg.append("defs").append("radialGradient")
        .attr("id", "ocean_fill")
        .attr("cx", "75%")//light position x direction
        .attr("cy", "25%");//light position y direction
        ocean_fill.append("stop")
        .attr("offset", "5%")
        .attr("stop-color", "lightblue");//light color
        ocean_fill.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#1b85b8");//background color

    //globe fill
    var globe_highlight = svg.append("defs")
        .append("radialGradient")
        .attr("id", "globe_highlight")
        .attr("cx", "75%")//light position x direction
        .attr("cy", "25%");//light position y direction
        globe_highlight.append("stop")
        .attr("offset", "5%")
        .attr("stop-color", "#fff")//light color
        .attr("stop-opacity","0.6");
        globe_highlight.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#000")//background-color
        .attr("stop-opacity","0.2");

    //globe shading
    var globe_shading = svg.append("defs").append("radialGradient")
          .attr("id", "globe_shading")
          .attr("cx", "55%")
          .attr("cy", "45%");
        globe_shading.append("stop")
          .attr("offset","30%")
          .attr("stop-color", "#fff")
          .attr("stop-opacity","0");
        globe_shading.append("stop")
          .attr("offset","100%").attr("stop-color", "#000")
          .attr("stop-opacity","0.6");

    //some other shadow
    var drop_shadow = svg.append("defs").append("radialGradient")
          .attr("id", "drop_shadow")
          .attr("cx", "50%")
          .attr("cy", "50%");
        drop_shadow.append("stop")
          .attr("offset","20%")
          .attr("stop-color", "#fff")
          .attr("stop-opacity",".5");
        drop_shadow.append("stop")
          .attr("offset","100%")
          .attr("stop-color", "#fff")
          .attr("stop-opacity","0");

  //actually append svgs
  //of shadow
    svg.append("ellipse")
      .attr("cx", 450)
      .attr("cy", 450)
      .attr("r", proj.scale()*1.5)
      .attr("class", "noclicks")
      .style("fill", "url(#drop_shadow)");

  //of ocean
    svg.append("circle")
      .attr("cx", width / 2.5)
      .attr("cy", height / 2.25)
      .attr("r", proj.scale())
      .attr("class", "noclicks")
      .style("fill", "url(#ocean_fill)");

  //of land
    svg.append("path")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land noclicks")
      .attr("d", path);

    svg.append("path")
      .datum(topojson.feature(world, world.objects.countries))
      .attr("class", "land noclicks")
      .attr("d", path);

  //of globe highlight
    svg.append("circle")
      .attr("cx", width / 2.5)
      .attr("cy", height / 2.25)
      .attr("r", proj.scale())
      .attr("class","noclicks")
      .style("fill", "url(#globe_highlight)");

  //of globe shading
    svg.append("circle")
      .attr("cx", width / 2.5)
      .attr("cy", height / 2.25)
      .attr("r", proj.scale())
      .attr("class","noclicks")
      .style("fill", "url(#globe_shading)");

  //of globe points
    // svg.append("g")
    // .attr("class","points")
    //     .selectAll("text")
    //     .data(places.features)
    //     .enter()
    //     .append("path")
    //     .attr("class", "point")
    //     .attr("d", path);
    //     console.log(places.features);

    // spawn links between cities as source/target coord pairs
    places.features.forEach(function(a) {
          linkcamp.push({
            "source": a.geometryfrom.coordinates,
            "target": a.geometrycamp.coordinates
          });
          linkjob.push({
            "source": a.geometrycamp.coordinates,
            "target": a.geometryto.coordinates
          });
    });

    // create shadow definition
    linkcamp.forEach(function(e,i,a) {

      var feature = {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [e.source,e.target]
        }
      };
      arcLines.push(feature);
    });

    linkjob.forEach(function(e,i,a) {

      var feature = {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [e.source,e.target]
        }
      };
      arcLines.push(feature);
    });

  // append arc shadows
    svg.append("g")
      .attr("class","arcs")
      .selectAll("path")
      .data(arcLines)
      .enter()
      .append("path")
      .attr("class","arc")
      .attr("d",path);

  //create flyin arcs
    svg.append("g")
      .attr("class","flyin")
      .selectAll("path")
      .data(linkcamp)
      .enter()
      .append("path")
      .attr("class","flyer")
      .attr("d", function(d) {
        return swoosh(flying_arc(d));
      });

  //create flyout arcs
    svg.append("g")
      .attr("class","flyout")
      .selectAll("path")
      .data(linkjob)
      .enter()
      .append("path")
      .attr("class","flyer")
      .attr("d", function(d) {
        return swoosh(flying_arc(d));
      });
    refresh();
  }

  //sets values for creating arc, start point, mid point, and end point
  function flying_arc(pts) {
    var source = pts.source,
        target = pts.target;

    var mid = location_along_arc(source, target, 0.5);
    var result = [ proj(source),
                   sky(mid),
                   proj(target)
                 ];
    return result;
  }

  function refresh() {
    svg.selectAll(".land")
    .attr("d", path);

    svg.selectAll(".noclicks")
    .attr("r", proj.scale());

    svg.selectAll(".arc")
    .attr("d", path)
      .attr("opacity", function(d) {
          return fade_at_edge(d);
      });

    svg.selectAll(".flyer")
      .attr("d", function(d) {
        return swoosh(flying_arc(d));
      })
      .attr("opacity", function(d) {
        return fade_at_edge(d);
      });
  }

  //fades atrc lines as they sink behind earth
  function fade_at_edge(d) {
    var centerPos = proj.invert([width/4,height/4]),
        arc = d3.geo.greatArc(),
        start, end;
    if (d.source) {
      start = d.source;
      end = d.target;
    }
    else {
      start = d.geometry.coordinates[0];
      end = d.geometry.coordinates[1];
    }

    var start_dist = 1.57 - arc.distance({source: start, target: centerPos}),
        end_dist = 1.57 - arc.distance({source: end, target: centerPos});

    var fade = d3.scale.linear()
    .domain([-0.1,0])
    .range([0,0.1]);

    var dist = start_dist < end_dist ? start_dist : end_dist;

    return fade(dist);
  }

  function location_along_arc(start, end, loc) {
    var interpolator = d3.geo.interpolate(start,end);
    return interpolator(loc);
  }

  var m0, o0;
  function mousedown() {
    m0 = [d3.event.pageX, d3.event.pageY];
    o0 = proj.rotate();
    d3.event.preventDefault();
  }

  //function used to update rotational position based on click and drag position
  function mousemove() {
    if (m0) {
      var m1 = [d3.event.pageX, d3.event.pageY];
      o1 = [o0[0] + (m1[0] - m0[0]) / 6, o0[1] + (m0[1] - m1[1]) / 6];
      o1[1] = o1[1] > 30  ? 30  :
              o1[1] < -30 ? -30 :
              o1[1];
      proj.rotate(o1);
      sky.rotate(o1);
      refresh();
    }
  }

  //ends click and drag of earth
  function mouseup() {
    if (m0) {
      mousemove();
      m0 = null;
    }
  }

});
