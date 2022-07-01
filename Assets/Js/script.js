'use strict'

const apiKey = '4e98480a953b623b3e964585552f2e66'

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.74&lon=84.38&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))
fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))
fetch('https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))


const dateToday = moment().format('MMMM Do, YYYY')
const datePlus1 = moment().add(1, 'days').format('MMMM Do YYYY')
const datePlus2 = moment().add(2, 'days').format('MMMM Do YYYY')
const datePlus3 = moment().add(3, 'days').format('MMMM Do YYYY')
const datePlus4 = moment().add(4, 'days').format('MMMM Do YYYY')
const datePlus5 = moment().add(5, 'days').format('MMMM Do YYYY')

$('#date1').text(datePlus1)
$('#date2').text(datePlus2)
$('#date3').text(datePlus3)
$('#date4').text(datePlus4)
$('#date5').text(datePlus5)


$('#title').text(`Enter a City Name - ${dateToday}`)

// const updateTitle = function(e) {
//     let searchedCity = $('#search-bar').val()
//     const city = `<div id="${searchedCity}" class="city">${searchedCity}</div>`
//     $('#search-results').append(city)
//     $('#title').text(`${searchedCity} - ${dateToday}`)
//     e.preventDefault()
// }

const getWeather = function (cityApi, fetchedObject) {

    

    fetch(cityApi).then(function(res) {
        return res.json()
    }).then(function(data) {
        fetchedObject = data
        console.log(fetchedObject)
        const cityApi2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${fetchedObject.coord.lat}&lon=${fetchedObject.coord.lon}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`
        fetch(cityApi2).then(function(res) {
            return res.json().then(function(data) {
                console.log(data)
                $('#temp').text(`Temp: ${data.current.temp} ℉`)
                $('#wind').text(`Wind Speed: ${data.current.wind_speed} MPH`)
                $('#humidity').text(`Humidity: ${data.current.humidity}%`)
                $('#uv').text(`UV: ${data.current.uvi}`)
                console.log(data.current.uvi)
                if(data.current.uvi < 4) {
                    console.log('Safe')
                    $('#uv').attr('class', 'uvSafe')
                } else if (data.current.uvi > 6) {
                    console.log('Dangerous')
                    $('#uv').attr('class', 'uvDangerous')
                } else {
                    console.log('Medium')
                    $('#uv').attr('class', 'uvMedium')
                }
                const iconToday = data.current.weather[0].icon 
                const iconTodayUrl = `http://openweathermap.org/img/wn/${iconToday}@2x.png`
                console.log(iconTodayUrl)
                $('#icon').html(`<img src="${iconTodayUrl}" />`)
    
                for(let i = 1; i < 6; i++) {
                    const curId = `#day${i}`
                    const curTemp = `#temp${i}`
                    const curWind = `#wind${i}`
                    const curHumidity = `#humidity${i}`
                    const curIcon = `#icon${i}`
                    const curIconObj = data.daily[i].weather[0].icon
                    const curIconUrl = `http://openweathermap.org/img/wn/${curIconObj}@2x.png`
                    console.log(data.daily[i].temp.day)
                    console.log(curId, curTemp)
                    $(curId).children(curIcon).html(`<img src="${curIconUrl}" />`)
                    $(curId).children(curTemp).text(`Temp: ${data.daily[i].temp.day} ℉`)
                    $(curId).children(curWind).text(`Wind: ${data.daily[i].wind_speed} MPH`)
                    $(curId).children(curHumidity).text(`Humidity: ${data.daily[i].humidity}%`)
                }
            })
        })
        console.log(cityApi2)
    })
} 





$('#submit-btn').on('click', function(e) {
    let searchedCity = $('#search-bar').val()
    const city = `<div id="${searchedCity}" class="city">${searchedCity}</div>`
    $('#search-results').append(city)
    $('#title').text(`${searchedCity} - ${dateToday}`)

    // updateTitle(e)

    let fetchedObject
    
    
    let cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`


    $('.city').on('click', function() {
        const cityCard = $(this).text()
        console.log(cityCard)
        searchedCity = cityCard
        cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`
        
        $('#title').text(`${searchedCity} - ${dateToday}`)


        // updateTitle(e)
        getWeather(cityApi, fetchedObject)
    })
    
    console.log(cityApi)
    

    

    getWeather(cityApi, fetchedObject)

    // fetch(cityApi).then(function(res) {
    //     return res.json()
    // }).then(function(data) {
    //     fetchedObject = data
    //     console.log(fetchedObject)
    //     const cityApi2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${fetchedObject.coord.lat}&lon=${fetchedObject.coord.lon}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`
    //     fetch(cityApi2).then(function(res) {
    //         return res.json().then(function(data) {
    //             console.log(data)
    //             $('#temp').text(`Temp: ${data.current.temp} ℉`)
    //             $('#wind').text(`Wind Speed: ${data.current.wind_speed} MPH`)
    //             $('#humidity').text(`Humidity: ${data.current.humidity}%`)
    //             $('#uv').text(`UV: ${data.current.uvi}`)
    //             console.log(data.current.uvi)
    //             if(data.current.uvi < 4) {
    //                 console.log('Safe')
    //                 $('#uv').attr('class', 'uvSafe')
    //             } else if (data.current.uvi > 6) {
    //                 console.log('Dangerous')
    //                 $('#uv').attr('class', 'uvDangerous')
    //             } else {
    //                 console.log('Medium')
    //                 $('#uv').attr('class', 'uvMedium')
    //             }
    //             const iconToday = data.current.weather[0].icon 
    //             const iconTodayUrl = `http://openweathermap.org/img/wn/${iconToday}@2x.png`
    //             console.log(iconTodayUrl)
    //             $('#icon').html(`<img src="${iconTodayUrl}" />`)

    //             for(let i = 1; i < 6; i++) {
    //                 const curId = `#day${i}`
    //                 const curTemp = `#temp${i}`
    //                 const curWind = `#wind${i}`
    //                 const curHumidity = `#humidity${i}`
    //                 const curIcon = `#icon${i}`
    //                 const curIconObj = data.daily[i].weather[0].icon
    //                 const curIconUrl = `http://openweathermap.org/img/wn/${curIconObj}@2x.png`
    //                 console.log(data.daily[i].temp.day)
    //                 console.log(curId, curTemp)
    //                 $(curId).children(curIcon).html(`<img src="${curIconUrl}" />`)
    //                 $(curId).children(curTemp).text(`Temp: ${data.daily[i].temp.day} ℉`)
    //                 $(curId).children(curWind).text(`Wind: ${data.daily[i].wind_speed} MPH`)
    //                 $(curId).children(curHumidity).text(`Humidity: ${data.daily[i].humidity}%`)
    //             }
    //         })
    //     })
    //     console.log(cityApi2)
    // })

    e.preventDefault()
})

