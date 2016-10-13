import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native'

const images = {
  'Argentina/la%20plata': require('../images/laplata.jpg'),
  'Argentina/posadas': require('../images/posadas.jpeg'),
  'autoip': require('../images/autoip.jpeg'),
}

class BackgroundImage extends Component {
  state = {
    opacity: new Animated.Value(0),
    currentImage: null,
    oldImage: null
  }

  componentDidMount() {
    this.showImageForCity(this.props.city)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.city !== this.props.city) {
      this.showImageForCity(newProps.city)
    }
  }

  showImageForCity(city) {
    this.setState({
      currentImage: images[city],
    })
    this.state.opacity.setValue(0)
  }

  handleImageLoad() {
    Animated.timing(
      this.state.opacity,
      { toValue: 1, duration: 500, easing: Easing.easeIn }
    )
    .start(() => {
      this.setState({ oldImage: this.state.currentImage })
    });
  }

  render() {
    const { currentImage, oldImage } = this.state

    return (
      <View style={styles.fullScreen}>
        <Image
          source={oldImage}
          style={styles.fullScreen}
        />
        <Animated.Image
          source={currentImage}
          onLoad={() => this.handleImageLoad()}
          style={[
            styles.fullScreen,
            { opacity: this.state.opacity }
          ]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: null,
    height: null,
  },
})

export default BackgroundImage
