import * as React from 'react'
import { StyleSheet, View, Text, Dimensions} from "react-native"
import Icon from "../../assets/Icons"

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
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18191e',
  },
  loadingIco: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
  },
})