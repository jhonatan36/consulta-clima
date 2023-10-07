import React, { Fragment, useState } from "react";
import axios from "axios";
import quente from "./img/quente.jpg";
import frio from "./img/frio.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [location, setLocation] = useState();
    const [weather, setWeather] = useState();
    const [isLoading, setIsLoading] = useState();
    const api = {
        key: "3ee32176fbc4070662893138e0e9dea6",
        base: "https://api.openweathermap.org/data/2.5/weather"
    };

    let icons = {
        "01d": "./img/icons/01d@2x.png",
        "01n": "./img/icons/01n@2x.png",
        "02d": "./img/icons/02d@2x.png",
        "02n": "./img/icons/02n@2x.png",
        "03d": "./img/icons/03d@2x.png",
        "03n": "./img/icons/03n@2x.png",
        "04d": "./img/icons/04d@2x.png",
        "04n": "./img/icons/04n@2x.png",
        "09d": "./img/icons/09d@2x.png",
        "09n": "./img/icons/09n@2x.png",
        "10d": "./img/icons/10d@2x.png",
        "10n": "./img/icons/10n@2x.png",
        "11d": "./img/icons/11d@2x.png",
        "11n": "./img/icons/11n@2x.png",
        "13d": "./img/icons/13d@2x.png",
        "13n": "./img/icons/13n@2x.png",
        "50d": "./img/icons/50d@2x.png",
        "50n": "./img/icons/50n@2x.png",
    };
    
    let getWeather = async () => {
        setIsLoading(true);
        try {
            let res = await axios.get(api.base, {
                params: {
                    q: location,
                    appid: api.key,
                    lang: 'pt',
                    units: 'metric'
                }
            });
            setWeather(res.data);
        } catch(error) {
            alert('Erro da api: '+error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        getWeather();
    }

    return (
        <Fragment>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <form className="form-inline" action="" onSubmit={handleSubmit}>
                            <input className="form-control mb-3" type="text" name="cidade" placeholder="Digite a cidade aqui" value={location} onChange={event => setLocation(event.target.value)} autoComplete="off" />
                            
                            <button type="submit" className="btn btn-primary">
                                    {
                                        isLoading 
                                        ? <span>Carregando</span>
                                        : <span>Pesquisar</span>
                                    }
                            </button>
                        </form>
                        <hr/>

                        {weather && (
                            <>
                                <div className="row" style={{
                                            backgroundImage: `url(${weather.main.temp > 15 ? quente : frio})`,
                                            backgroundSize: `100% 100%`,
                                            height: `500px`,
                                            width: `300px`,
                                            opacity: 0.8
                                        }}>
                                    <div className="col">
                                        <h3 className="text-center">{weather.name}</h3>
                                        <p className="text-center"><b>{Math.round(weather.main.temp)}º</b></p>
                                        <p className="text-center"><b>{weather.weather[0].description}</b></p>
                                        <p className="text-center">
                                            <img src={icons[weather.weather[0].icon]} />
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </Fragment>
    );
    
}

export default App;
