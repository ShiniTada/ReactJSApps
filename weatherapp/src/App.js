import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as moment from "moment";
import Today from './todaysweather/today'
import Form from './form/form'
import Weather from './weatherforfivedays/weather'
import Service from './service/service'


class App extends React.Component {
    state = {
        icon: undefined,
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        wind: undefined,
        description: undefined,
        date: undefined,
        error: undefined,
        fiveDaysWeather: [],
        weatherByHours: []
    };

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Today
                                        city={this.state.city}
                                        country={this.state.country}
                                        date={this.state.date}
                                        icon={this.state.icon}
                                        temperature={this.state.temperature}
                                        description={this.state.description}
                                        humidity={this.state.humidity}
                                        wind={this.state.wind}
                                        weatherByHours={this.state.weatherByHours}
                                        error={this.state.error}
                                    />
                                </div>
                                <div className="col-xs-7 form-container">
                                    <Form loadWeather={this.getWeather}/>
                                    <Weather
                                        fiveDaysWeather={this.state.fiveDaysWeather}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getWeather = async (e) => {
        let now = moment();
        const site ="http://api.openweathermap.org/data/2.5";
        const appId = "4c435a20f01edba8cdfb66c80ca2daef";
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        e.preventDefault();

            let apiCall;
            if (country === "") {
                apiCall = await fetch(`${site}/forecast?q=${city}&units=metric&APPID=${appId}`);
            } else {
                apiCall = await fetch(`${site}/forecast?q=${city},${country}&units=metric&APPID=${appId}`);
            }
            const forecastWeather =  await apiCall.json();


            if (country === "") {
                apiCall = await fetch(`${site}/weather?q=${city}&units=metric&APPID=${appId}`);
            } else {
                apiCall = await fetch(`${site}/weather?q=${city},${country}&units=metric&APPID=${appId}`);
            }
            const nowWeather = await apiCall.json();

            if (forecastWeather.cod !== "404" && city) {
                this.setState({
                    icon: nowWeather.weather[0].icon,
                    temperature: nowWeather.main.temp,
                    city: nowWeather.name,
                    country: nowWeather.sys.country,
                    humidity: nowWeather.main.humidity,
                    wind: nowWeather.wind.speed,
                    description: nowWeather.weather[0].description,
                    date: now.format('ddd, MMMM DD, LT'),
                    error: "",
                    fiveDaysWeather: Service.findFiveDaysWeather(forecastWeather),
                    weatherByHours: Service.findFullDayWeather(forecastWeather, now)
                })
            } else {
                this.setState({
                    error: "City not found!"
                })
            }
    };
}

export default App;

