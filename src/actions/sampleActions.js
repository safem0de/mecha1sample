import {GET_SAMPLES,SAMPLES_STATUS} from '../actionTypes';
import {db} from '../firebase';

export function getSamples(){
    return dispatch => {

        dispatch({
            type : SAMPLES_STATUS,
            payload : true
        });

        const element = {}
        const ref = db.collection('Samples').where("Finish","==",false);
        ref.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if (doc.exists){
                    // console.log(doc.id, " => ", doc.data());
                    element[doc.id] = doc.data();
                    }
                })
            })

        .then(()=>{
            dispatch({
                type : GET_SAMPLES,
                payload : element
            })

            dispatch({
                type: SAMPLES_STATUS,
                payload: false
            })
        },()=>{
            dispatch({
                type: SAMPLES_STATUS,
                payload: -1
            })
        })
    }
}

export function countSamples(){
}

export function saveSample(sample,lt){
    const addSampleHandler = (obj,name) => {
        const ref = db.collection('Samples').doc(name)
        ref.set(obj).then(()=>{
            console.log('added success');
            window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    }
    return dispatch => addSampleHandler(sample,lt)
}

export function deleteSample(id){
    const deleteSampleHandler = (key) => {
        const ref = db.collection('Samples').doc(key)
        ref.delete().then(()=>{
            console.log('deleted');
            window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    }
    return dispatch => deleteSampleHandler(id)
}

export function editSample(id,sample){
    const editNoteHandler = (id,sample) => {
        const ref = db.collection('Samples').doc(id)
        ref.update(sample).then(() => {
            console.log("Document successfully updated!");
            window.location.reload();
        })
        .catch((error)=> {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    return dispatch => editNoteHandler(id,sample)
}

export function saveComment(sampleLot,process_with_id){
    function formatDate(ts){
        var date_not_formatted = new Date(ts);
        var formatted_string = date_not_formatted.getFullYear() + "-";

        if (date_not_formatted.getMonth() < 9) {
          formatted_string += "0";
        }
        formatted_string += (date_not_formatted.getMonth() + 1);
        formatted_string += "-";

        if(date_not_formatted.getDate() < 10) {
          formatted_string += "0";
        }
        formatted_string += date_not_formatted.getDate();
        formatted_string += " ";

        if(date_not_formatted.getHours() < 10){
          formatted_string += "0";
        }
        formatted_string += date_not_formatted.getHours();
        formatted_string += ":";

        if(date_not_formatted.getMinutes() < 10){
          formatted_string += "0";
        }
        formatted_string += (date_not_formatted.getMinutes());
        formatted_string += ":";

        if(date_not_formatted.getSeconds() < 10){
          formatted_string += "0";
        }
        formatted_string += date_not_formatted.getSeconds();

        return(formatted_string);
      }
    const addCommentHandler = (doc,obj) => {
        const ref = db.collection('Samples').doc(doc);
            ref
                .set(
                {comments:{
                    [formatDate(Date.now())] : obj
                }},{merge:true}
                ).then(()=> {
                    console.log("Document successfully updated!");
                    window.location.reload();
                }).catch((err)=>{
                    console.error("Update document: ", err);
                });
    }
    return dispatch => addCommentHandler(sampleLot,process_with_id);
}