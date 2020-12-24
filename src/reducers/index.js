import {combineReducers} from 'redux';
import sampleReducer from './sampleReducer';

const rootReducer = combineReducers({
    samples : sampleReducer
})

export default rootReducer;