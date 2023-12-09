function DocumentReady() {
  let amenityList = [];

  $('li input:checkbox').change(function () {
      const amenityObj = { id: $(this).data('id'), name: $(this).data('name') };

      if (this.checked) {
          amenityList.push(amenityObj);
      } else {
          amenityList = amenityList.filter(item => item.id !== amenityObj.id);
      }

      updateSelectedAmenities(amenityList);
  });

  // Request API status on page load
  checkAPIStatus();
}

function updateSelectedAmenities(amenityList) {
  const selectedAmenitiesList = amenityList.map(item => item.name).join(', ');
  $('#selected-amenities').text(selectedAmenitiesList);
}

function checkAPIStatus() {
  // Make an AJAX request to check the API status
  $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      success: function (data) {
          // Check if the status is "OK" and add the class accordingly
          if (data.status === 'OK') {
              $('#api_status').addClass('available');
          } else {
              $('#api_status').removeClass('available');
          }
      },
      error: function () {
          // Remove the class if there is an error
          $('#api_status').removeClass('available');
      }
  });
}

$(document).ready(DocumentReady);
