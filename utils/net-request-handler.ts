import { warningHook } from '../lib/warning/warning-context'

type requestResult = {
  status: number,
  title: string,
  message: string,
  data?: any
}

export async function netRequestHandler(request: Function, warning: warningHook): Promise<{data?: any}>{
  const result: requestResult = await request();
  if (result.status >= 400 || result.status < 200) {
    warning.showWindow({ title: result.title, message: result.message })
    throw new Error(result.message)
  }
  return result
}