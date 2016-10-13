import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Text
} from 'react-native'

class WeatherBox extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.weather) {
      this.state.opacity.setValue(0)
    }
  }

  componentDidUpdate() {
    if (this.props.weather) {
      Animated.timing(
        this.state.opacity,
        { toValue: 1, duration: 500, easing: Easing.easeIn }
      )
      .start()
    }
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!nextProps.weather
  }

  render() {
    const { weather } = this.props

    return (
      <Animated.Text
        style={[ styles.text, { opacity: this.state.opacity } ]}>
        {weather && `${weather.temperatura}°`}
        <Text style={styles.text2}>
          {weather && `${weather.condicion}`}
        </Text>
      </Animated.Text>

    )
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: 'transparent',
    fontSize: 80,
    fontWeight: '100',
    fontFamily: 'Helvetica',
    color: 'white',
  },
  text2: {
    flex: 1,
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: '100',
    fontFamily: 'Helvetica',
    color: 'white',
  },
})

export default WeatherBox
