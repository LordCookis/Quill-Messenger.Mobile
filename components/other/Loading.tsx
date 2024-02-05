import * as React from 'react'
import { StyleSheet, View, Text, Dimensions} from "react-native"
import Icon from "../../assets/Icons"
import { stylesData } from '../../styles/stylesData'

export default function Loading(){
  return(
  <View style={styles.loading}>
    <Text style={styles.loadingIco}><Icon.Loading/></Text>
    <Text style={styles.loadingText}>Connecting to the server... Please wait</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    height: stylesData.height,
    width: stylesData.width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: stylesData.accent2,
  },
  loadingIco: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: stylesData.white,
  },
})