import {SAMPLES_STATUS,USER_STATUS} from '../actionTypes';

export default function load(state = {},action){
    switch(action.type){
        case SAMPLES_STATUS:
            return{...state, samples:action.payload};
            case USER_STATUS:
                return{...state, user:action.payload};
        default:
            return state;
    }
};