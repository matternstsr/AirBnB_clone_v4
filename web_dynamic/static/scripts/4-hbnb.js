function DocumentReady() {
    // Load places on page load
    loadPlaces();
    // Add click event for the search button
    $('button').click(sendSearchRequest);
}

function loadPlaces() {
    // Make an AJAX request to load places
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            console.log('Places Data:', data);

            // Clear existing places
            $('.places').empty();

            // Loop through the result and create article tags
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
    // Get the list of checked amenities
    const amenities = $('input:checked').map(function() {
        return $(this).data('id');
    }).get();

    // Make a new AJAX request for places_search with checked amenities
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({'amenities': amenities}),
        success: function (data) {
            console.log('Search Results:', data);

            // Clear existing places
            $('.places').empty();

            // Loop through the result and create article tags
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
