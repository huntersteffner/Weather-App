'use strict'

const apiKey = '4e98480a953b623b3e964585552f2e66'

console.log('test')

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.74&lon=84.38&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))
fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))
fetch('https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=4e98480a953b623b3e964585552f2e66').then(res => res.json()).then(data => console.log(data))

// let city = <div id="Atlanta" class="city">Atlanta</div>

$('#submit-btn').on('click', function(e) {
    let searchedCity = $('#search-bar').val()
    const city = `<div id="${searchedCity}" class="city">${searchedCity}</div>`
    $('#search-results').append(city)
    $('#title').text(searchedCity)

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