import * as React from 'react'
import { StyleSheet, View, Text } from "react-native"
import Icon from "../assets/Icons"

export default function Loading(){
  return(
  <View style={styles.loading}>
    <View style={styles.fading}>
      <Text style={styles.loadingIco}><Icon.Loading/></Text>
      <Text style={styles.loadingText}>Connecting to the server... Please wait</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  loading: {},
  fading: {},
  loadingIco: {},
  loadingText: {},
})