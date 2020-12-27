import {GET_SAMPLES,SAMPLES_STATUS} from '../actionTypes';
import {db} from '../firebase';

export function getSamples(){
    return dispatch => {

        dispatch({
            type: SAMPLES_STATUS,
            payload: true
        });
        const element = {}
        const ref = db.collection('Samples');
        ref.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    element[doc.id] = doc.data()
                    dispatch({
                        type: GET_SAMPLES,
                        payload : element
                    })

                    dispatch({
                        type:SAMPLES_STATUS,
                        payload:false
                    })
                });
            },()=>{
                dispatch({
                    type:SAMPLES_STATUS,
                    payload:-1
                });
            }
        );
    }
}

export function saveSample(sample,lt){
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