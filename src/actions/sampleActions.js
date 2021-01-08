// https://stackoverflow.com/questions/52953145/maximum-value-from-firebase-firestore-collection
import {GET_SAMPLES,SAMPLES_STATUS} from '../actionTypes';
import {convert,formatDate,getDaysInMonth} from './Actions'
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

export function getSampleGraph(Type){
    console.log('test')
    var year = new Date().getUTCFullYear()
    var month = [];
    var label = [];
    for (let index = 1; index <= 12; index++) {
        month.push(new Date(Date.parse(index +" 1,"+ year)).toLocaleString('en-us', { month: 'long' }))
    }

    // var m_name = month.some(function(x){return x === Type;});
    // console.log(m_name);

    if (Type === 'Month'){
        console.log(year);
        console.log(month);
        label = month
    }else if(month.some((x)=>{return x === Type})){
        var x = new Date(Date.parse(Type +" 1,"+ year)).getMonth()
        var Days = getDaysInMonth(x,year)
        label = Days
        console.log('daily')
        console.log(Days)
    }

    var data = [];
    for (let i = 0; i < label.length; i++) {
        // const element = array[index];
        x = convert(label[i],'MM')
        db.collection('Samples').where("DueDate","==",x)
            .get().then(snap => {
            // var size = snap.size // will return the collection size
            // console.log(size);
            data.push(snap.size);
        });
    }
    console.log('Confirm',data);


    const genDataset = (label,rgb,data_arr) =>{

        const genRGBa = (r,g,b,a) =>{
            return('rgba('+ r+','+ g+','+ b+','+a+')')
        }
        const color = genRGBa(rgb[0],rgb[1],rgb[2],0.4)
        const colorBorder = genRGBa(rgb[0],rgb[1],rgb[2],1)

        const struct = {
            label: label,
            fill: false,
            lineTension: 0.1,
            backgroundColor: color,
            borderColor: colorBorder,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colorBorder,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: colorBorder,
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data_arr
        }
        return struct;
    }

    return dispatch => {}
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
    const editSampleHandler = (id,sample) => {
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
    return dispatch => editSampleHandler(id,sample)
}

export function saveComment(sampleLot,process_with_id){

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