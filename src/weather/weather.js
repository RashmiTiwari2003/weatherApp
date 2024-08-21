// https://api.openweathermap.org/data/2.5/weather?q=kolkata&units=metric&appid=0750b909aa93c0aee11f4a2084c012ff

import React, { useEffect, useState } from 'react'
import "./style.css"
import WeatherCard from './weatherCard'

const Weather = () => {

    const [searchValue, setSearchValue] = useState("kolkata")
    const [tempInfo, setTempInfo] = useState({})

    const weatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0750b909aa93c0aee11f4a2084c012ff`

            let res = await fetch(url)
            let data = await res.json()

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myWeatherInfo = {
                temp, humidity, pressure, weathermood, name, speed, country, sunset,
            }

            setTempInfo(myWeatherInfo)

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        weatherInfo()
    }, [])

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="search" autofocus id="search" className="searchTerm" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button type="button" className="searchButton" onClick={weatherInfo}>Search</button>
                </div>
            </div>

            <WeatherCard tempInfo={tempInfo}/>
        </>
    )
}

export default Weather
