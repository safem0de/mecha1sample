import {SAMPLES_STATUS} from '../actionTypes';

export default function(state = {},action){
    switch(action.type){
        case SAMPLES_STATUS:
            return{...state, samples:action.payload};
        default:
            return state;
    }
};