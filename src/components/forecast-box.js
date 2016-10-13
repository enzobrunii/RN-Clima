'use strict'

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Easing
} from 'react-native'

class ForecastBox extends Component{
  state = {
    opacity: new Animated.Value(0),
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.forecast) {
      this.state.opacity.setValue(0)
    }
  }

  componentDidUpdate() {
    if (this.props.forecast) {
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
    return !!nextProps.forecast
  }

  render() {
    const { forecast } = this.props

    return (
      <Animated.Text
        style={[ styles.text, { opacity: this.state.opacity } ]}>
        {forecast && `${forecast.clima}`}
      </Animated.Text>

    )
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: 27,
    fontWeight: '100',
    fontFamily: 'Helvetica',
    color: 'white',
  }
})

module.exports = ForecastBox;
