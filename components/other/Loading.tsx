import React, { useEffect, useRef } from 'react'
import { Animated, View, Text, StyleSheet } from 'react-native'
import Svg, { G, Path } from 'react-native-svg'
import { stylesData } from '../../styles/stylesData'

const Loading = (props:any) => {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1, 2, 4],
    outputRange: ['0deg', '360deg', '540deg', '720deg'],
  })

  return (
    <View style={styles.loading}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg fill="#9385ca" width={40} height={40} viewBox="0 0 399.389 399.389">
          <G><Path d="M340.896,58.489C303.18,20.773,253.031,0.001,199.693,0.001c-53.34,0-103.487,20.771-141.204,58.488 C20.772,96.207,0,146.355,0,199.694c0,53.34,20.772,103.489,58.49,141.206c37.717,37.717,87.864,58.488,141.204,58.488 c53.339,0,103.486-20.771,141.205-58.488c37.717-37.717,58.49-87.865,58.49-141.206C399.387,146.355,378.613,96.207,340.896,58.489 z M77.457,199.694c0-67.401,54.835-122.236,122.236-122.236S321.93,132.293,321.93,199.694s-54.836,122.237-122.237,122.237 S77.457,267.096,77.457,199.694z M328.061,328.063c-34.289,34.287-79.877,53.17-128.368,53.17v-41.147 c77.413,0,140.389-62.979,140.389-140.391c0-77.412-62.979-140.391-140.389-140.391c-4.593,0-9.134,0.229-13.615,0.662V18.655 c4.508-0.332,9.049-0.5,13.615-0.5c48.491,0,94.079,18.883,128.368,53.171c34.289,34.289,53.172,79.878,53.172,128.368 C381.232,248.187,362.35,293.776,328.061,328.063z"/></G>
        </Svg>
      </Animated.View>
      <Text style={styles.loadingText}>Подключение к серверу... Пожалуйста, подождите</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    height: stylesData.height,
    width: stylesData.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: stylesData.accent1,
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
  },
})

export default Loading