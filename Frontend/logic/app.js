const root = "http://localhost:3000/api/";

function update(id, whatToShow) {
    $(id).empty();
    $(id).append($('<option></option>').attr('value', 'default').text(whatToShow));
}

$.ajax(root + 'continent', {
    dataType: 'json',
    method: "GET",
    success: function (response) {
        for (let i = 1; i <= response.length; i++) {
            $("#continentsId > option").eq(i).toggleClass("show");
            $("#continentsId > option").eq(i).val(response[i - 1].id);
            $("#continentsId > option").eq(i).text(response[i - 1].continent_name);
        }
    },
    error: function (request, error, message) {
        alert("there has been an issue with the ajax call" + message)
    }
});

$("#continentsId").change(function () {
    let selectedContinent = $(this).val();
    if (selectedContinent == 'default') {
        update('#countriesId', 'Countries');
        update('#citiesId', 'Cities');
        return;
    }
    $.ajax(root + 'continent/' + selectedContinent, {
        dataType: 'json',
        method: "GET",
        success: function (response) {
            let countries = response.countries;
            $('#countriesId').empty();
            update('#citiesId', 'Cities');
            for (let i = 1; i <= countries.length; i++) {
                let option = $('<option></option>').attr('value', countries[i - 1].id).text(countries[i - 1].country_name);
                $("#countriesId").append(option);
            }

            let selectedCountries = $('#countriesId').find(":selected").attr('value');
            console.log(selectedCountries);
            ajaxCallForCities(selectedCountries);

        },
        error: function (request, error, message) {
            alert("there has been an issue with the ajax call" + message);
        }
    });

});

function ajaxCallForCities(selectedCountry) {
    $.ajax(root + 'country/' + selectedCountry, {
        dataType: 'json',
        method: "GET",
        success: function (response) {
            let cities = response.cities;
            $('#citiesId').empty();
            for (let i = 1; i <= cities.length; i++) {
                let option = $('<option></option>').attr('value', cities[i - 1].id).text(cities[i - 1].city_name);
                $("#citiesId").append(option);
            }
        },
        error: function (request, error, message) {
            alert("server down" + message);
        }
    });
}

$('#countriesId').on('change', function () {
    let selectedCountry = $(this).val();
    if (selectedCountry == 'default') {
        update('#citiesId', 'Cities');
        return;
    }
    ajaxCallForCities(selectedCountry);
});

let latitude = 44.728004, longitude = 3.585938;
function getCityLocation() {
    let location = $('#citiesId').find(":selected").text();
    if (location == 'Cities') {
        alert("Please select the city!");
    } else {
        console.log(latitude + " , " + longitude);
        geoCode(location,initMap);
        console.log(latitude + " , " + longitude);
    }
}

function initMap() {
    console.log("entered initMap");
    let location = { lat: latitude, lng: longitude };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function geoCode(location,callback) {
    console.log("entered geocode");
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key: 'AIzaSyAjjyXrIzsRrAeRmx6uy0LcOAASvDo8yAE'
        }
    }).then(function (response) {
        console.log(response);
        var addressComponents = response.data.results[0].address_components;
        //geometry
        latitude = response.data.results[0].geometry.location.lat;
        longitude = response.data.results[0].geometry.location.lng;

        // console.log(latitude + " , " + longitude);
        callback();
    }).catch(function (error) {
        console.log(error);
    });
}
