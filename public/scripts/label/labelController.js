class LabelController {
  static init(callback) {
    // add conditions to the selection list
    const conditionsSelect = document.getElementById('condition-select');
    if (conditionsSelect != null) {
      LabelService.getAllMedicalConditions(function (allConditions) {
        for (let i = 0; i < allConditions.length; i++) {
          const condition = allConditions[i];
          const newOption = document.createElement('option');
          newOption.setAttribute('value', condition.id);
          newOption.innerText =
            condition.description + ' (' + condition.code + ')';
          conditionsSelect.appendChild(newOption);
        }

        LabelController.getNextMedicalCase(callback);
      });
    }
  }

  static showNoMoreCasesToLabelNotice()
  {
    const labelingForm = document.getElementById('labeling-form');
    if (labelingForm)
    {
      document.createElement("div")
      labelingForm.insertAdjacentHTML('beforebegin', "<div class=\"alert alert-success\" role=\"alert\">\n" +
        "  No more cases to label\n" +
        "</div>");
    }
  }

  static getNextMedicalCase(callback) {
    // add id of the medical case to an id
    const ehrTextArea = document.getElementById('ehr-textarea');
    const labelingForm = document.getElementById('labeling-form');
    if (ehrTextArea != null && labelingForm != null) {
      LabelService.getNextUnlabeledMedicalCase(function (medicalCase) {
        if(medicalCase === null)
        {
          LabelController.showNoMoreCasesToLabelNotice()
        }
        else
        {
          ehrTextArea.innerText = medicalCase.ehr;
          let currentMedicalCaseHiddenInput = document.querySelector(
            '#labeling-form > #medical-case-id',
          );

          if (currentMedicalCaseHiddenInput === null) {
            currentMedicalCaseHiddenInput = document.createElement('input');
            labelingForm.appendChild(currentMedicalCaseHiddenInput);
          }

          currentMedicalCaseHiddenInput.setAttribute('type', 'hidden');
          currentMedicalCaseHiddenInput.setAttribute('id', 'medical-case-id');
          currentMedicalCaseHiddenInput.setAttribute('value', medicalCase.id);
          callback();
        }
      });
    } else {
      callback();
    }
  }

  static submitAssociationAndGetNextCase(button) {
    button.setAttribute('disabled', '');
    try {
      const currentMedicalCaseHiddenInput = document.querySelector(
        '#labeling-form > #medical-case-id',
      );
      const currentMedicalCaseID = currentMedicalCaseHiddenInput.getAttribute(
        'value',
      );
      const selectedConditions = document.querySelectorAll(
        '#condition-select > option:checked',
      );
      let selectedConditionID;

      if (selectedConditions.length !== 1) {
        throw Error('You must select only one condition');
      } else {
        selectedConditionID = selectedConditions[0].getAttribute('value');
      }

      LabelService.associateConditionToCase(
        currentMedicalCaseID,
        selectedConditionID,
        function (result) {
          LabelController.getNextMedicalCase(function (medicalCase) {
            if(medicalCase === null)
            {
              LabelController.showNoMoreCasesToLabelNotice()
            }

            button.removeAttribute('disabled');
          });
        },
      );
    } catch (e) {
      alert(e);
      button.removeAttribute('disabled');
    }
  }
}

$(window).on('load', function () {
  LabelController.init(function () {});
});
