import React from 'react';
import * as moment from "moment";

class Day {
    constructor(icon = undefined, temperature = undefined, description = undefined, date = undefined) {
        this.icon = icon;
        this.temperature = temperature;
        this.description = description;
        this.date = date;
    }
}

class Sevice {

    static findFiveDaysWeather(forecastWeather) {
        let thisList = [];
        for (let iter = 0, savedIter = 0; savedIter < 5; iter++) {
            let AtThreeOclock = forecastWeather.list[iter].dt_txt.indexOf("15:00:00");
            if (AtThreeOclock !== -1) {
                thisList.push(new Day(forecastWeather.list[iter].weather[0].icon,
                    forecastWeather.list[iter].main.temp,
                    forecastWeather.list[iter].weather[0].description,
                    moment(forecastWeather.list[iter].dt_txt).format('ddd, MMMM DD')
                ));
                savedIter++;
            }
        }
        return thisList;
    }

    static findFullDayWeather(forecastWeather, now) {
        let thisFullDayWeather = [];
        for (let iter = 0; iter < forecastWeather.list.length; iter++) {
            let isThisDay = forecastWeather.list[iter].dt_txt.indexOf(now.format('YYYY-MM-DD'));
            if (isThisDay !== -1) {
                thisFullDayWeather.push(new Day(forecastWeather.list[iter].weather[0].icon,
                    forecastWeather.list[iter].main.temp,
                    forecastWeather.list[iter].weather[0].description,
                    moment(forecastWeather.list[iter].dt_txt).format('LT')
                ));
            }
        }
        return thisFullDayWeather;
    }
}

export default Sevice;
