import useWarning from "./use-warning"
import React from "react"
import { View, Text,  Pressable, StyleSheet } from "react-native"

export const WarningContext: any = React.createContext(null)

type errorDetails = {
  title: string,
  message: string,
  fn?: (() => void) | null
}

export interface warningHook {
  showWindow: (a: {title: string, message: string, fn?: Function | null}) => void
  closeWindow: () => void
  isError: boolean
  error: errorDetails
}

export default function WarningProvider({children}: any){
  const warningHook = useWarning()

  return(
    <WarningContext.Provider value={warningHook}>
      {warningHook.isError
      ?
        <Pressable onPress={()=>warningHook.closeWindow()}><View style={styles.errorWindow}>
          <Pressable onPress={(e:any)=>e.stopPropagation()}><View style={styles.errorBlock}>
            <View style={styles.errorTitle}>{warningHook.error.title}</View>
            <View style={styles.errorMessage}>{warningHook.error.message}</View>
            <View style={styles.actionButtons}>
              {warningHook.error.fn ? <Pressable><Text onPress={()=>{warningHook.error.fn(); warningHook.closeWindow()}}>Continue</Text></Pressable> : <></>}
              <Pressable><Text onPress={()=>warningHook.closeWindow()}>Close</Text></Pressable>
            </View>
          </View></Pressable>
        </View></Pressable>
      : <></>}
      {children}
    </WarningContext.Provider>
  )
}

const styles = StyleSheet.create({
  errorWindow: {},
  errorBlock: {},
  errorTitle: {},
  errorMessage: {},
  actionButtons: {},
})