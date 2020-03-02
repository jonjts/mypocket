import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

console.disableYellowBox = true

Reactotron.configure({
  name: 'mypocket',
   host: '192.168.0.6',
   port: 9090
})

// add every built-in react native feature.  you also have the ability to pass
// an object as a parameter to configure each individual react-native plugin
// if you'd like.
Reactotron.useReactNative({
  asyncStorage: { ignore: ['secret'] }
})

// add some more plugins for redux & redux-saga
Reactotron.use(reduxPlugin())
Reactotron.use(sagaPlugin())

// if we're running in DEV mode, then let's connect!
if (__DEV__) {
  Reactotron.connect()
  Reactotron.clear()
}

// make a new one
console.log = (...args) => {

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null
  })
}

Reactotron.onCustomCommand('test', () => console.tron.log('This is an example'))

console.tron = Reactotron