'use strict'

// Mutable Variables
let searchedCity
let cityApi
let fetchedObject
let localStorageArray = []

// Initial Local Storage pulls
let storedSearches = JSON.parse(localStorage.getItem('recentSearches'))
console.log(storedSearches)
if(storedSearches === null) {
    storedSearches = ['Atlanta']
}
localStorageArray = storedSearches 
console.log(localStorageArray)
// For Loop to have items in local storage populate
    for(let i = 0;i < localStorageArray.length; i ++) {
        if(localStorageArray[i] !== null) {

            const city =`<div id="${localStorageArray[i]}" class="city">${localStorageArray[i]}</div>`
            $('#search-results').append(city)
        }

    
}
// Using Moment.js this provides the date variables for today's date and the five day forcast
const dateToday = moment().format('MMMM Do, YYYY')
const datePlus1 = moment().add(1, 'days').format('MMMM Do YYYY')
const datePlus2 = moment().add(2, 'days').format('MMMM Do YYYY')
const datePlus3 = moment().add(3, 'days').format('MMMM Do YYYY')
const datePlus4 = moment().add(4, 'days').format('MMMM Do YYYY')
const datePlus5 = moment().add(5, 'days').format('MMMM Do YYYY')
// It puts the dates above in their corresponding fields
$('#date1').text(datePlus1)
$('#date2').text(datePlus2)
$('#date3').text(datePlus3)
$('#date4').text(datePlus4)
$('#date5').text(datePlus5)
// Sets the initial text in the title prior to searching any cities
$('#title').text(`Enter a City Name - ${dateToday}`)
// Variable for clicking on items in recent search history
const recentSearchClick = function() {
    $('.city').on('click', function() {
        const cityCard = $(this).text()
        searchedCity = cityCard
        cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`
        
        $('#title').text(`${searchedCity} - ${dateToday}`)
        getWeather(cityApi, fetchedObject)
    })
}
recentSearchClick()
// Function used to pull data from Weather Api. It's saved as a variable here as it's called more than once
const getWeather = function (cityApi, fetchedObject) {
    fetch(cityApi).then(function(res) {
        return res.json()
    }).then(function(data) {
        fetchedObject = data
        // Due to the limitations in the api url that searches by cities, I pull the longitude and latitude coordinates from the api for the city and then make a second API call, because the call by latitude and longitude has more information than searching by the city
        const cityApi2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${fetchedObject.coord.lat}&lon=${fetchedObject.coord.lon}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`
        fetch(cityApi2).then(function(res) {
            return res.json().then(function(data) {
                // Pull data for today's forecast
                $('#temp').text(`Temp: ${data.current.temp} ℉`)
                $('#wind').text(`Wind Speed: ${data.current.wind_speed} MPH`)
                $('#humidity').text(`Humidity: ${data.current.humidity}%`)
                $('#uv').text(`UV: ${data.current.uvi}`)
                // Determine the severity of UV index today and assign a corresponding class based on its severity
                if(data.current.uvi < 4) {
                    $('#uv').attr('class', 'uvSafe')
                } else if (data.current.uvi > 6) {
                    $('#uv').attr('class', 'uvDangerous')
                } else {
                    $('#uv').attr('class', 'uvMedium')
                }
                // Add icon based on the weather conditions pulled directly from API
                const iconToday = data.current.weather[0].icon 
                const iconTodayUrl = `http://openweathermap.org/img/wn/${iconToday}@2x.png`
                $('#icon').html(`<img src="${iconTodayUrl}" />`)
                // Pull information and icons for the five day forecast
                for(let i = 1; i < 6; i++) {
                    const curId = `#day${i}`
                    const curTemp = `#temp${i}`
                    const curWind = `#wind${i}`
                    const curHumidity = `#humidity${i}`
                    const curIcon = `#icon${i}`
                    const curIconObj = data.daily[i].weather[0].icon
                    const curIconUrl = `http://openweathermap.org/img/wn/${curIconObj}@2x.png`
                    $(curId).children(curIcon).html(`<img src="${curIconUrl}" />`)
                    $(curId).children(curTemp).text(`Temp: ${data.daily[i].temp.day} ℉`)
                    $(curId).children(curWind).text(`Wind: ${data.daily[i].wind_speed} MPH`)
                    $(curId).children(curHumidity).text(`Humidity: ${data.daily[i].humidity}%`)
                }
            })
        })
    })
} 
// Function when clicking the submit button
$('#submit-btn').on('click', function(e) {
    searchedCity = $('#search-bar').val()
    // Add to list of recent searches
    const city = `<div id="${searchedCity}" class="city">${searchedCity}</div>`
    $('#search-results').append(city)
    $('#title').text(`${searchedCity} - ${dateToday}`)
    // Push new recent search to local storage
    localStorageArray.push(searchedCity)
    localStorage.setItem('recentSearches', JSON.stringify(localStorageArray))
    // Set which city the API will search for
    let cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`
    // What happens when you click on a recent searched item
    $('.city').on('click', function() {
        const cityCard = $(this).text()
        searchedCity = cityCard
        cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`
        
        $('#title').text(`${searchedCity} - ${dateToday}`)
        getWeather(cityApi, fetchedObject)
    })
    getWeather(cityApi, fetchedObject)
    e.preventDefault()
})