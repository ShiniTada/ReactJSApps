import React from 'react';

const Today = (props) => {
    const weatherByHours = props.weatherByHours.map((item) =>
        <div className="col-xs-3 weather__elem weather__elem__color">
            <p className="weather__key">
                <span> {item.date}</span>
            </p>
            <img src={`http://openweathermap.org/img/w/${item.icon}.png`}/>
            <p><span className="weather__value">{item.temperature}℃ </span></p>
        </div>);
    return (
        <div>
            {
                (!props.city || props.error) &&
                <div>
                    <h1 className="title-container__title">Weather Scanner </h1>
                    <p className="title-container_subtitle"> Helps you find weather conditions in cities... </p>
                </div>
            }
            {
                props.city && !props.error &&
                <div>
                    <p>
                        <span className="title-container_subtitle"> {props.city}, {props.country}</span>
                        <br/>
                        <span className="title-container_subtitle"> {props.date}</span>
                    </p>
                    <p>
                        <img src={`http://openweathermap.org/img/w/${props.icon}.png`}/>
                        <span className="title-container__big__title">{props.temperature}℃</span>
                    </p>
                    <p>
                        <span className="title-container_subtitle">{props.description}</span>
                    </p>
                    <p>
                        💧
                        <span className="title-container_subtitle">  {props.humidity}% </span>
                    </p>
                    <p>
                        wind:
                        <span className="title-container_subtitle">  {props.wind}m/s </span>
                    </p>

                    <br/><br/>
                    <div className="weather-info row">{weatherByHours}</div>
                </div>
            }
        </div>

    );
};

export default Today;