import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './index'
import './Weather.css'

function Weather() {
    const [ zip, setZip ] = useState('')
    const [ weather, setWeather ] = useState(null)
    async function getWeather() {
        try {
          const json = await client.query({
            query: gql`
              query {
                getWeather(zip:${zip}) {
                    name
                    temperature
                    description
                    temp_max
                    temp_min
                    feels_like
                }
              }
            `
          })
          setWeather(json)
        } catch(err) {
          console.log(err.message)
        }
      }
    return (
      <div className="Weather">

        {weather ? <h1>{weather.data.getWeather.name} <br />{weather.data.getWeather.description}<br />{weather.data.getWeather.temperature+"•C"}<br />{"High of "+ weather.data.getWeather.temp_max+"•C"}<br />{"Low of " + weather.data.getWeather.tenp_min+"•C"}<br />{"Feels like "+ weather.data.getWeather.feels_like+"•C"}</h1>: null}

        <div class = "form">
            <form onSubmit={(e) => {
            e.preventDefault()
            getWeather()
        }}>
            <input 
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            />
            <button type="submit">Submit</button>
            </form>
        </div>
      </div>
    );
  }
  
  export default Weather