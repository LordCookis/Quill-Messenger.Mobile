export const tryCatch = async(fn: Function) => {
  try{
    await fn()
  } catch (error) {
    console.log("An error occured!:", error)
  }
}