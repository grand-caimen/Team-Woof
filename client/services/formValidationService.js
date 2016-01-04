angular.module('cityQuest.formValidationService', [])

.factory('FormValidation', function(InputConversion){
  var isRequiredQuestFieldMissing = function(scopeQuest){
    var fieldMissing = true;
    if( ! scopeQuest.name){
      alert("Provide a quest title");
      return fieldMissing;
    }

    if( ! scopeQuest.description){
      alert("Provide a quest description");
      return fieldMissing;
    }

    if( ! scopeQuest.image){
      alert("Provide a quest image");
      return fieldMissing;
    }

    if( ! scopeQuest.steps){
      alert("Provide at least one step");
      return fieldMissing;
    }

    fieldMissing = false;
    return fieldMissing;
  };

  var isRequiredStepFieldMissing = function(scopeCurrentStep){
    var fieldMissing = true;
    if( ! scopeCurrentStep.description){
      alert("Provide a task description");
      return fieldMissing;
    }

    if( ! scopeCurrentStep.time){
      alert("Provide a task time");
      return fieldMissing;
    }

    var time = InputConversion.timeExtraction(scopeCurrentStep.time);
    var timeIsNaN = time !== time; // NaN is the only JavaScript value that is treated as unequal to itself.
    var timeIsNotTypeNumber = typeof time !== "number";
    if(timeIsNaN ||
       timeIsNotTypeNumber){
      alert("Minutes is not a valid format: ", scopeCurrentStep.time);
      return fieldMissing;
    }

    if( ! scopeCurrentStep.cost){
      alert("Provide a task cost");
      return fieldMissing;
    }

    var cost = InputConversion.moneyExtraction(scopeCurrentStep.cost);
    var costIsNaN = cost !== cost; // NaN is the only JavaScript value that is treated as unequal to itself.
    var costIsNotTypeNumber = typeof cost !== "number";
    if(costIsNaN || costIsNotTypeNumber){
      alert("Cost is not a valid format: ", scopeCurrentStep.cost);
      return fieldMissing;
    }

    fieldMissing = false;
    return fieldMissing;
  };

  var isMarkerMissing = function(scopeMarkers){
    if(scopeMarkers.length === 0){
      return true;
    } else {
      return false;
    }
  };

  return {
    isRequiredQuestFieldMissing: isRequiredQuestFieldMissing,
    isRequiredStepFieldMissing: isRequiredStepFieldMissing,
    isMarkerMissing: isMarkerMissing
  };
});

