import React from 'react';

const Weather = (props) => {
    const listWeathers = props.fiveDaysWeather.map((item) =>
        <div className="col-xs-4 weather__elem">
            <p className="weather__key">
                <span> {item.date}</span>
            </p>
            <p><img src={`http://openweathermap.org/img/w/${item.icon}.png`}/></p>
            <p><span className="weather__value">{item.temperature}℃</span></p>
        </div>);
    return (
        <div className="weather-info">
            {
                props.fiveDaysWeather.length > 0 && !props.error &&
                <div className="row">{listWeathers}</div>
            }
            {
                props.error && <p>
                    <span className="weather__error">    {props.error} </span>
                </p>
            }
        </div>
    );
};

export default Weather;