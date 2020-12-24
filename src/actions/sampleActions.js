// import {GET_SAMPLES} from '../actionTypes';
import {db} from '../firebase';

export function getSamples(){
    return dispatch => {}
}

export function saveSample(sample){
    console.log('press');
    const addSampleHandler = (obj) => {
        const ref = db.collection('Sample')
        ref.add(obj).then(()=>{
            console.log('added success');
        }).catch((err)=>{
            console.log(err);
        });
    }
    return dispatch => addSampleHandler(sample)
}

export function deleteSample(id){
    return dispatch=> {}
}