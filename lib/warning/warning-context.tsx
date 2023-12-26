import useWarning from "./use-warning"
import React from "react"
import { StyleSheet } from "react-native"

export const WarningContext: any = React.createContext(null)

export default function WarningProvider({children}: any){
  const warningHook = useWarning()

  return(
    <WarningContext.Provider value={warningHook}>
      {warningHook.isError
      ?
        <div style={styles.errorWindow} onClick={()=>warningHook.closeWindow()}>
          <div style={styles.errorBlock} onClick={(e)=>e.stopPropagation()}>
            <div style={styles.errorTitle}>{warningHook.error.title}</div>
            <div style={styles.errorMessage}>{warningHook.error.message}</div>
            <div style={styles.actionButtons}>
              {warningHook.error.fn ? <button onClick={()=>{warningHook.error.fn(); warningHook.closeWindow()}}>Continue</button> : <></>}
              <button onClick={()=>warningHook.closeWindow()}>Close</button>
            </div>
          </div>
        </div>
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