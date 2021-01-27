import {SAMPLES_STATUS,USER_STATUS,CHART_STATUS,TABLE_STATUS} from '../actionTypes';

export default function load(state = {},action){
    switch(action.type){
        case SAMPLES_STATUS:
            return{...state, samples:action.payload};
        case USER_STATUS:
            return{...state, user:action.payload};
        case CHART_STATUS:
            return{...state, chart:action.payload};
        case TABLE_STATUS:
            return{...state, table:action.payload};
        default:
            return state;
    }
};