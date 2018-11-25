# react-redux-peach

_Make and develop web apps easier with react hooks and redux_


_Hooks make react apps more scalable and more effective_
## Installation
```bash
$ npm install --save reac-redux-peach

# So you need react, react-dom and redux
$ npm install --save react@next react-dom@next redux
# Add @next to install latest react version that support hooks.
```

#### Redux-peach 
More ability of this package is because of 
[`redux-peach`](https://github.com/borvelt/redux-peach)

`redux-peach` make actions and dispatch them in simple shape and it's 
completely favorable with react hooks.


## Usage
#### Store
Create your own redux store like before, but please don't forget these two 
points: 

- `redux-thunk` middleware, append it to middlewares.
- use `rootReducer` as first parameter of `createStore`

Another simple way to start, is that make store with Store type redux-peach, 
you can initialize and configure your store with 3 lines:
```javascript
// -- src/store.js --
import {Store} from 'react-redux-peach'
const store = new Store()
store.configure()
export default store // we need to export store to use in context provider.
```
#### Provider
As you know we need to create a context and pass store through it, here is 
Provider code: 
```javascript 
import { Provider } from 'react-redux-peach'
import store from 'src/store'
<Provider value={store}>...</Provider>
```
#### Actions
For example we want to make a simple counter so we need action to dispatch 
INCREMENT action and then reducers increase counter value.

To find out how to define simple and powerful actions please see 
[redux-peach define actions](https://github.com/borvelt/redux-peach#make-action)

```javascript
import { Action } from 'react-redux-peach'
Action('INCREMENT')
  .setScope('math.numbers')
  .setOnSucceedListener(action => ({ counter: action.payload }))
  .setInitialState({ counter: 0 })
```

#### Hooks
in this example our hook name should be useIncrement that will return counter
 and function that will increase counter. So we will have this:
```javascript
function componentName () {
  const [counter, increment] = useIncrement()
  return <some-jsx></some-jsx>
}
```
Actually in simple examples of hooks we need to write `useState` and call the
 setter function and that's it, but when we want to work with redux, it would
  be a little different, first we need to dispatch an action and then we
   should call setter function.
##### what should be in useIncrement?
I have really really tried to make this codes simple and realizable, I hope 
that's okay.
 
useIncrement should be like this:
```javascript
import {useDispatch, useStateMapper} from 'react-redux-peach'
function useIncrement() {
  // incrementAction: you have defined it before.
  const increment = useDispatch(incrementAction)
  let counter
  counter = useStateMapper(incrementAction, 'counter')
  // OR
  counter = useStateMapper('math.numbers.counter')
  // OR
  counter = useStateMapper(state => state.math.numbers.counter)
  return [counter, useCallback(() => increment(counter + 1), [counter])]
}
```
- `useDispatch` return a dispatcher that just need to pass it payload.
- `useStateMapper` we need to map our scope variable with state. as you seen 
we can use `useStateMapper` in three different shapes.

So with `const [counter, increment] = useIncrement()` we are done. Call 
`increment` will dispatch an action and after update value in store, counter 
will be update.

### Other useful hooks:
##### useFindAction:
After running useDispatch action automatically hook to store and you can 
access action with this function just with actionName.
##### useInitialState:
when you call useDispatch, useInitialState will call in it and will set 
InitialState with use State types. useInitialState will run memoize function 
to prevent run on every render.
##### useAction:
After state Initialization, useAction will call, this method will hook action
 to store and `make` action. (run `make` method of action), Also this method 
 should not run on every rendering, so return memoize function.

## Contribute
Please feel free to contact with me and send your feedback about me and this 
package.
if want to collaborate, it's my pleasure.

## License
*ISC*
