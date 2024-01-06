export const netRequestHandler = async(request: any, warning: any) => {
  const result = await request
  if (result.status >= 400 || request.status < 200) {
    warning.showWindow({ title: result.title, message: result.message })
    throw new Error(result.message)
  }
  return result
}