import React, { Component } from 'react';

import { formatNumber } from '../../utils/formatNumber';

import css from './header.module.css';

export default class Header extends Component {
  handleInputChange = (e) => {
    const newText = e.target.value;

    this.props.onChangeFilter(newText);
  };

  render() {
    const { filter, countryCount, populationCount } = this.props;

    return (
      <div className={css.container}>
        <input
          type="text"
          value={filter}
          placeholder="Filtro"
          onChange={this.handleInputChange}
        />
        |
        <span className={css.countries}>
          Países: <strong>{countryCount}</strong>{' '}
        </span>
        |
        <span className={css.population}>
          População: <strong>{formatNumber(populationCount)}</strong>
        </span>
      </div>
    );
  }
}
