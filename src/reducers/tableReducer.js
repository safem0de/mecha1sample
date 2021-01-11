import {GET_TABLE} from '../actionTypes.js';

export default function table(state={},action){
    switch (action.type){
        case GET_TABLE:
            return action.payload;
        default :
            return state;
    }
}