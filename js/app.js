angular.module("world", [])
.directive('body', function() {
 return {
   restrict: 'E',
   scope: {
     zoomin: '=',
     zoomout: '='
   },
   controller: 'mainCtrl'
 };
})
.directive('earth', function() {
 return {
   restrict: 'E',
   scope: {
     zoomin: '=',
     zoomout: '=',
     cohortupdate:'=',
     arcit:'&'
   },
   controller: 'earthCtrl'
 };
})
.directive('bars', function() {
 return {
  restrict: 'E',
  scope: {
    data:'=',
    cohortupdate:'=',
  },
  controller: 'barsCtrl'
 };
})
.directive('scrollbar', function() {
 return {
   restrict: 'E',
   scope: {
     cohortupdate: '=',
     arcit: '&',
     scrolldate: '=',
     play: '='
   },
   controller: 'scrollbarCtrl'
 };
});
