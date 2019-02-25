import React, {Component} from 'react';
import './Explorer.css';


const Explorer = props => {
    var p=[];
    //console.log("start props.countries");
    //console.log(props.countries);
    //console.log("end props.countries");

    for (var i=0; i<props.countries.length;i++){
        p.push(<p id={props.countries[i].alpha3Code} onClick={props.func}>{props.countries[i].name}</p>);
    }
    return (
        <div className="Explorer">
            <h2>Countries:</h2>
            {p}
        </div>
    )
};


export default Explorer;

