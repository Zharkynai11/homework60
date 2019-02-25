import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Explorer from './containers/Explorer/Explorer';
import View from './containers/View/View';

//https://restcountries.eu/rest/v2/all?fields=name

class App extends Component {
  state = {
    countries: [],
    selected: "KGZ",
    current: undefined,
    helper: [],
    borders: [],
    n: 0
  }

  constructor() {
    super();
    //this.setCountry(this.state.selected);
    fetch('https://restcountries.eu/rest/v2/all').then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong with network request');
    }).then(countries => {
      const updated = countries.map(country => {
        return {
          ...country
        }
      });

      this.setState({countries: updated});
    }).catch(error => {
      //console.log(error);
    })
    this.setCountry(this.state.selected);
    this.getBorders(this.state.selected);
    //console.log(this.state.countries);
  }
  changeCountry = e => {
    this.setCountry(e.target.id);
    this.getBorders(e.target.id);
  }
  setCountry = alpha => {
    const P_URL = 'https://restcountries.eu/rest/v2/alpha/'+alpha;
    var m = fetch(P_URL).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong with network request');
    });

    m.then(country => {
        this.setState({current: country})
    });
    return this.state.current;
}
componentDidUpdate(){
  if (this.state.n<3)
    {
      this.setCountry(this.state.selected);
      this.getBorders(this.state.selected);
      this.setState({n:this.staten+1})
    }
    console.log(this.state);
}
getCountry = alpha => {
  let hp = this.state.helper;
  let P_URL = 'https://restcountries.eu/rest/v2/alpha/'+alpha;
  var m = fetch(P_URL).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong with network request');
  });

  m.then(country => {
    hp.push(country);
    this.setState({helper: hp})
  });
  return this.state.helper;
}
getBorders(alpha) {
  let hp = [];
  if (this.state.current)
  {
    console.log('Current'+this.state.current);
  for (let i of this.state.current.borders){
    console.log(i);
    let P_URL = 'https://restcountries.eu/rest/v2/alpha/'+i;
    var m = fetch(P_URL).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong with network request');
    });

    m.then(country => {
      hp=this.state.borders;
      hp.push(country);
      this.setState({borders: hp})
    });
  }
  //this.setState({helper: hp})
  console.log("BORDERS: "+this.state.borders);
  this.setState({borders: hp})
  }
}


  render() {
    return (
      <div className="App">

        <Explorer countries={this.state.countries} func={this.changeCountry}/>
        <View country={this.state.current} borders={this.state.borders} func={this.changeCountry}/>
      </div>
    );
  }
}

export default App;
