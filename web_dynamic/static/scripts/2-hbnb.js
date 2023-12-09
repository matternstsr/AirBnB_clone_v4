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
        url: 'http://localhost:5001/api/v1/status/',
        type: 'GET',
        success: function (data) {
            console.log('API Response:', data);

            // Added console logging to Check if the status is "OK" and add/remove the class accordingly
            if (data.status === 'OK') {
                console.log('API Status is OK. Adding class.');
                $('#api_status').addClass('available');
            } else {
                console.log('API Status is NOT OK. Removing class.');
                $('#api_status').removeClass('available');
            }
        },
        error: function () {
            console.error('Error in API request.');
            $('#api_status').removeClass('available');
        }
    });
}


$(document).ready(DocumentReady);
