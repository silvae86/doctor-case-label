class LabelService {
  static getAllMedicalConditions(callback)
  {
    $.ajax({
      url: "/api/conditions"
    }).done(function(data) {
      callback(data)
    });
  }

  static getNextUnlabeledMedicalCase(callback)
  {
    $.ajax({
      url: "/api/medical-cases/next-unlabeled",
      method: "GET"
    }).done(function(data) {
      callback(data)
    });
  }

  static associateConditionToCase(caseId, conditionId, callback)
  {
    $.ajax({
      url: "/api/label/" + caseId,
      method: "post",
      body: {
        condition: conditionId
      }
    }).done(function(data) {
      callback(data)
    });
  }
}
