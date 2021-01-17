import {combineReducers,createStore} from 'redux'
import {listReducer} from './reducer/listReducer'
export default  createStore(
    // combine diferente reducer
    combineReducers({
        list:listReducer,
    }),
    // for debug
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)