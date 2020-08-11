import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '',
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filteredName: name.toLowerCase(),
        flag,
        population,
      };
    });

    const filteredPopulation = this.calculateTotalPopulation(allCountries);

    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation,
    });
  }

  calculateTotalPopulation = (array) => {
    const totalPopulation = array.reduce((acc, cur) => {
      return (acc += cur.population);
    }, 0);

    return totalPopulation;
  };

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    const filteredText = newText.toLowerCase();

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filteredName.includes(filteredText);
    });

    const filteredPopulation = this.calculateTotalPopulation(filteredCountries);

    this.setState({
      filteredCountries,
      filteredPopulation,
    });
  };

  render() {
    const { filter, filteredCountries, filteredPopulation } = this.state;

    return (
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Countries</h1>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          populationCount={filteredPopulation}
          onChangeFilter={this.handleChangeFilter}
        />
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}
