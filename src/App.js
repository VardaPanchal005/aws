import React, { useEffect } from 'react';

const json = {
  "logoPosition": "right",
  "pages": [
    {
      "name": "personalInfo",
      "elements": [
        { "type": "text", "name": "firstName", "title": "First Name", "isRequired": true },
        { "type": "text", "name": "lastName", "title": "Last Name", "isRequired": true },
        { "type": "text", "name": "email", "title": "Email", "isRequired": true, "inputType": "email" },
        { "type": "text", "name": "phone", "title": "Phone", "inputType": "tel" }
      ]
    },
    {
      "name": "carOwnership",
      "elements": [
        { "type": "radiogroup", "name": "ownsCar", "title": "Do you own a car?", "choices": [{ "value": "Yes", "text": "Yes" }, { "value": "No", "text": "No" }] },
        { "type": "dropdown", "name": "carBrand", "visibleIf": "{ownsCar} = 'Yes'", "title": "What car brand do you own?", "choices": [{ "value": "Toyota", "text": "Toyota" }, { "value": "BMW", "text": "BMW" }, { "value": "Honda", "text": "Honda" }] },
        { "type": "text", "name": "kilometersDriven", "visibleIf": "{ownsCar} = 'Yes'", "title": "How many kilometers do you drive per month?", "inputType": "number" },
        { "type": "radiogroup", "name": "travelFrequently", "visibleIf": "{ownsCar} = 'Yes'", "title": "Do you travel frequently for work?", "choices": [{ "value": "Yes", "text": "Yes" }, { "value": "No", "text": "No" }] },
        { "type": "checkbox", "name": "preferredTransportation", "visibleIf": "{travelFrequently} = 'Yes'", "title": "Which mode of transportation do you prefer?", "choices": [{ "value": "Flight", "text": "Flight" }, { "value": "Train", "text": "Train" }, { "value": "Car", "text": "Car" }, { "value": "Bus", "text": "Bus" }] }
      ]
    },
    {
      "name": "surveyFeedback",
      "elements": [
        { "type": "rating", "name": "surveyEasyRating", "title": "The survey was easy to understand", "isRequired": true, "rateType": "stars" },
        { "type": "rating", "name": "surveyClearRating", "title": "The instructions were clear", "isRequired": true, "rateType": "stars" },
        {
          "type": "file",
          "name": "uploadedFile",
          "title": "Upload a photo of your car or a travel ticket.",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "additionalFeedback",
          "title": "Do you have any additional feedback?",
          "isRequired": false
        }
      ]
    }
  ]
};

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const survey = new window.Survey.Model(json);

      survey.onComplete.add((sender) => {
        const surveyData = sender.data;

        // Use jQuery AJAX call to submit data
        sendSurveyData(surveyData);
      });

      window.$("#surveyElement").Survey({ model: survey });
    }
  }, []);

  const sendSurveyData = (data) => {
    window.$.ajax({
      url: "https://apim.quickwork.co/employeelogin/mypath/version/assignedpath",
      data: JSON.stringify(data),
      contentType: 'application/json;charset=utf-8',
      type: "POST",
      headers: { 'ApiKey': "JjUNK0e7DGwu2A9rTjvJWZ3YHcxdKrE4" },
      success: function() {
        alert('Survey submitted successfully!');
      },
      error: function() {
        alert('Failed to submit survey. Please try again.');
      }
    });
  };

  return (
    <div
      id="surveyElement"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: '100%',
        height: '100%',
      }}
    />
  );
}

export default App;
