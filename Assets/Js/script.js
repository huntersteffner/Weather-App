'use strict'

const apiKey = '4e98480a953b623b3e964585552f2e66'

console.log('test')

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.74&lon=84.38&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))
fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))
fetch('https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))

// let city = <div id="Atlanta" class="city">Atlanta</div>

const dateToday = moment().format(': MMMM Do, YYYY')
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




$('#submit-btn').on('click', function(e) {
    let searchedCity = $('#search-bar').val()
    const city = `<div id="${searchedCity}" class="city">${searchedCity}</div>`
    $('#search-results').append(city)
    $('#title').text(searchedCity + dateToday)

    const cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`
    console.log(cityApi)
    

    let fetchedObject

    fetch(cityApi).then(function(res) {
        return res.json()
    }).then(function(data) {
        fetchedObject = data
        console.log(fetchedObject)
        // $('#temp').text(fetchedObject.main.temp + '℉')
        // $('#wind').text(fetchedObject.wind.speed + 'MPH')
        // $('#humidity').text(fetchedObject.main.humidity)
        const cityApi2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${fetchedObject.coord.lat}&lon=${fetchedObject.coord.lon}&units=imperial&appid=4e98480a953b623b3e964585552f2e66`
        fetch(cityApi2).then(function(res) {
            return res.json().then(function(data) {
                console.log(data)
                $('#temp').text(data.current.temp + '℉')
                $('#wind').text(data.current.wind_speed + 'MPH')
                $('#humidity').text(data.current.humidity)
                $('#uv').text(data.current.uvi)

                for(let i = 1; i < 6; i++) {
                    const curId = `#day${i}`
                    const curTemp = `#temp${i}`
                    const curWind = `#wind${i}`
                    const curHumidity = `#humidity${i}`
                    console.log(data.daily[i].temp.day)
                    console.log(curId, curTemp)
                    $(curId).children(curTemp).text(`Temp: ${data.daily[i].temp.day} ℉`)
                    $(curId).children(curWind).text(`Wind: ${data.daily[i].wind_speed} MPH`)
                    $(curId).children(curHumidity).text(`Temp: ${data.daily[i].humidity}%`)
                }
            })
        })
        console.log(cityApi2)
    })

  
    
    
    
    
    e.preventDefault()
})


fetch('https://api.openweathermap.org/data/2.5/weather?q=miami&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))
fetch('https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))
fetch('https://api.openweathermap.org/data/2.5/weather?q=MIAmi&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))
fetch('https://api.openweathermap.org/data/2.5/weather?q=mIAMI&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))