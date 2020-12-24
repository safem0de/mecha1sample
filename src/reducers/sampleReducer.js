import {GET_SAMPLES} from '../actionTypes.js';

export default function(state={},action){
    switch (action.type){
        case GET_SAMPLES:
            return action.payload;
        default :
            return state;
    }
}