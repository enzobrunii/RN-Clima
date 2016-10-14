
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BackgroundImage from './src/components/background-image'
import Row from './src/components/row'
import Overlay from './src/components/overlay'
import CityPicker from './src/components/city-picker'
import WeatherBox from './src/components/weather-box'
import ForecastBox from './src/components/forecast-box'

import * as weatherService from './src/services/weather'
import * as forecastService from './src/services/forecast'

export default class Pruebas extends Component {
  state = {
    city: 'Argentina/posadas',
  }

  componentDidMount() {
    this.handleCityChange('Argentina/posadas')
  }

  handleCityChange(city) {
    this.setState({
      city,
      weather: null,
      forecast: null
    })

    weatherService
      .getForCity(city)
      .then((weather) => this.setState({ weather }))

    forecastService
      .getForCity(city)
      .then((forecast) => this.setState({ forecast }))
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage city={this.state.city} />
        <Row>
          <Overlay />
          <CityPicker
            selectedValue={this.state.city}
            onValueChange={(city) => this.handleCityChange(city)} />
        </Row>
        <Row>
          <ForecastBox forecast={this.state.forecast} />
        </Row>
        <Row>
          <Overlay footer={true} />
          <WeatherBox weather={this.state.weather} />
        </Row>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
