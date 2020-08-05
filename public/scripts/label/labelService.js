class LabelService {
  static getAllMedicalConditions(callback) {
    $.ajax({
      url: '/api/conditions',
    }).done(function (data) {
      callback(data);
    });
  }

  static getNextUnlabeledMedicalCase(callback) {
    $.ajax({
      url: '/api/medical-cases/next-unlabeled',
      method: 'GET',
    }).done(function (data) {
      callback(data);
    });
  }

  static associateConditionToCase(caseId, conditionId, callback) {
    $.ajax('/api/medical-cases/' + caseId + '/label/' + conditionId, {
      method: 'POST',
      data: JSON.stringify({
        condition: conditionId,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).done(function (data) {
      callback(data);
    });
  }
}
