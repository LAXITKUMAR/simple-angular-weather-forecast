module.exports = {
    request: {
        path: 'http://api.openweathermap.org/data/2.5/weather?q=england&appid=dee099c57ee9f9af0aa04db62e38c3e0',
        method: 'GET'
    },
    response: {
        data: {
            "coord": {
                "lon": -91.97,
                "lat": 34.54
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 292.9,
                "pressure": 1017,
                "humidity": 56,
                "temp_min": 291.15,
                "temp_max": 294.15
            },
            "visibility": 16093,
            "wind": {
                "speed": 6.7,
                "deg": 340,
                "gust": 9.3
            },
            "clouds": {
                "all": 75
            },
            "dt": 1524588960,
            "sys": {
                "type": 1,
                "id": 270,
                "message": 0.0047,
                "country": "US",
                "sunrise": 1524569077,
                "sunset": 1524617257
            },
            "id": 4110001,
            "name": "England",
            "cod": 200
        }
    }
};