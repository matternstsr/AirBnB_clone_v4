function DocumentReady() {
    // Checking API status on page load
    checkAPIStatus();
    // Loading places on page load
    loadPlaces();
    // Adding click event for the search button
    $('button').click(sendSearchRequest);
}

function checkAPIStatus() {
    // Making an AJAX request to check the API status
    $.ajax({
        url: 'http://localhost:5001/api/v1/status/',
        type: 'GET',
        success: function (data) {
            console.log('API Status:', data);
            // Updating the circle color based on the API status
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        },
        error: function () {
            console.error('Error checking API status.');
            // If there's an error, assume API is not available.. not sure if needed
            $('#api_status').removeClass('available');
        }
    });
}

function loadPlaces() {
    // Making an AJAX request to load places
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            console.log('Places Data:', data);

            // Clearing existing places
            $('.places').empty();

            // Looping through the result and create article tags
            for (const place of data) {
                const article = `
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`;

                $('.places').append(article);
            }
        },
        error: function () {
            console.error('Error in places request.');
        }
    });
}

function sendSearchRequest() {
    // Getting the list of checked amenities
    const amenities = $('input:checked').map(function() {
        return $(this).data('id');
    }).get();

    // Making a new AJAX request for places_search with checked amenities
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({'amenities': amenities}),
        success: function (data) {
            console.log('Search Results:', data);

            // Clearing existing places
            $('.places').empty();

            // Looping through the result and create article tags
            for (const place of data) {
                const article = `
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`;

                $('.places').append(article);
            }
        },
        error: function () {
            console.error('Error in search request.');
        }
    });
}

$(document).ready(DocumentReady);
