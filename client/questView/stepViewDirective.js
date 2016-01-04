angular.module('cityQuest.stepViewDirective', [])

.directive('stepViewDirective',function(){
  function populateDirectiveWithStreetView(scope, directiveMatchedElements, attrs){
    var streetViewDomElement =
      findStreetViewDomElementInTemplate(directiveMatchedElements);
      createStreetView(scope.step, streetViewDomElement);
  };

  function findStreetViewDomElementInTemplate(directiveMatchedElements){
    var directiveElement = directiveMatchedElements[0];
    var borderDiv = directiveElement.children[0];
    var streetViewDomElement = borderDiv.children[1];
    return streetViewDomElement;
  };

  function createStreetView(questStep, streetViewDomElement){
    var stepLatLng = new google.maps.LatLng(questStep.location.latitude,
                                            questStep.location.longitude);
    new google.maps.StreetViewPanorama(
      streetViewDomElement, {
        position: stepLatLng,
        pov: {
          heading: 0,
          pitch: 0
        },
        // Hiding extra controls
        addressControl: false,
        panControl: false,
        zoomControl: false
      }
    );
  };

  var stepViewDirective =  {
    replace: false,
    templateUrl: 'client/questView/stepViewTemplate.html',
    link: populateDirectiveWithStreetView
  };

  return stepViewDirective;
});
