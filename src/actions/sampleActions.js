// import {GET_SAMPLES} from '../actionTypes';
import {db} from '../firebase';

export function getSamples(){
    return dispatch => {}
}

export function saveSample(sample,lt){
    console.log('press');
    const addSampleHandler = (obj,name) => {
        const ref = db.collection('Samples').doc(name)
        ref.set(obj).then(()=>{
            console.log('added success');
        }).catch((err)=>{
            console.log(err);
        });
    }
    return dispatch => addSampleHandler(sample,lt)
}

export function deleteSample(id){
    return dispatch=> {}
}