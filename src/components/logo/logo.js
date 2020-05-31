import React from 'react';
import Classes from './logo.module.css';
import covidLogo from '../../assets/coronavirus.png'

const logo = () => {
    return(
        <div className={Classes.Logo}>
        <img src={covidLogo} ></img>
        </div>
    )
}

export default logo;