import {GET_CHART} from '../actionTypes.js';

export default function chart(state={},action){
    switch (action.type){
        case GET_CHART:
            return action.payload;
        default :
            return state;
    }
}