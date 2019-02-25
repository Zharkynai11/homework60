import React, {Component} from 'react';
import './View.css';


const View = props => {
    var p=[];
    if (props.country) {
        console.log(props.borders.length);
        console.log(props.borders);
        for (let i of props.borders){
            console.log(i);
            p.push(<li id = {i}><p id = {i.alpha3Code} onClick={props.func}>{i.name}</p></li>)
        }
    return (
        <div className="View">
            <h1>{props.country.name}</h1>
            <p>Region: {props.country.region}</p>
            <p>Capital:  {props.country.capital}</p>
            <p>Population: {props.country.population}</p>
            <p><b>Borders with:</b></p>
            <ul>{p}</ul>
            <img src={props.country.flag} alt='Flag'/>

        </div>
    )
    }
    else return (
        <div className="View">
            
        </div>
    )
};


export default View;

