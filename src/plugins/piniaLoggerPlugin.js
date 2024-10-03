export function piniaLoggerPlugin({ store }) {
    store.$onAction(({ name, args, after, onError }) => {
      console.log(`Action ${name} was called with args:`, args)
      
      after((result) => {
        console.log(`Action ${name} completed with result:`, result)
      })
      
      onError((error) => {
        console.error(`Action ${name} failed with error:`, error)
      })
    })
}