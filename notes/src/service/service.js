import React from "react";


class Service {

    static save(facts) {
        window.localStorage.setItem("facts", JSON.stringify(facts));
    }

    static get() {
        return window.localStorage.getItem("facts");
    }

    static checkIsStart() {
        if (JSON.parse(Service.get()) === null) {
            return true;
        } else return JSON.parse(Service.get()).length === 0;
    }

    static setId(id) {
        window.localStorage.setItem("id", id);
    }

    static getId() {
        return window.localStorage.getItem("id");
    }

    static getRandomColor() {
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += (Math.random() * 16 | 0).toString(16);
        }
        return color;
    }


}


export default Service;