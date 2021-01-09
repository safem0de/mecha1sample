// https://stackoverflow.com/questions/52953145/maximum-value-from-firebase-firestore-collection
import {GET_SAMPLES,SAMPLES_STATUS,GET_CHART} from '../actionTypes';
import {convert,getDaysInMonth} from './Actions'
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

export function getSituation(){

}

export function getSampleGraph(Type,Things){ // Month Not finish

    const getDataCount = (lbl,doc_key) => {
        var data = [];
        for (let i = 0; i < lbl.length; i++) {
            x = convert(lbl[i],'MM')
            db.collection('Samples').where(doc_key,"==",x)
                .get().then(snap => {
                data.push(snap.size);
            });
        }
        // console.log('Confirm',data);
        return data;
    }

    const genRGBa = (r,g,b,a) =>{
        if (r > 255 || r < 0){
            r = Math.floor(Math.random() * 256);
        }else if(g > 255 || g < 0){
            g = Math.floor(Math.random() * 256);
        }
        else if(b > 255 || b < 0){
            b = Math.floor(Math.random() * 256);
        }
        else if(a > 255 || a < 0){
            a = Math.random().toFixed(2);
        }
        return('rgba('+ r+','+ g+','+ b+','+a+')')
    }

    const genDataset = (label,color,colorBorder,data_arr) =>{

        const struct = {
            label: label,
            fill: false,
            lineTension: 1,
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

    var year = new Date().getUTCFullYear()
    var month = [];
    var label_x = [];
    for (let index = 1; index <= 12; index++) {
        month.push(new Date(Date.parse(index +" 1,"+ year)).toLocaleString('en-us', { month: 'long' }))
    }

    if (Type === 'Month'){
        label_x = month
    }else if(month.some((x)=>{return x === Type})){
        var x = new Date(Date.parse(Type +" 1,"+ year)).getMonth()
        var Days = getDaysInMonth(x,year)
        label_x = Days
    }
    
    var datasets = [];
    var a,b,c,d = null;
    for (let i = 0; i < Things.length; i++) {
        if (Things[i]==='Receive'){
            a = Things[i]
            b = genRGBa(47,79,79,0.8)
            c = genRGBa(47,79,79,1)
            d = getDataCount(label_x,"ReceiveDate");
            datasets.push(genDataset(a,b,c,d));
        }else if (Things[i]==='Confirm'){
            a = Things[i]
            b = genRGBa(72,209,204,0.8)
            c = genRGBa(72,209,204,1)
            d = getDataCount(label_x,"DueDate");
            datasets.push(genDataset(a,b,c,d));
        }else if (Things[i]==='Shipment'){
            a = Things[i]
            b = genRGBa(135,206,250,0.8)
            c = genRGBa(135,206,250,1)
            d = getDataCount(label_x,"FinishDate");
            datasets.push(genDataset(a,b,c,d));
        }
    }

    const datas = {
        labels:label_x,
        datasets:datasets
    }
    console.log(datas);

    return dispatch => {
        dispatch({
            type : GET_CHART,
            payload : datas
        })
    }
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

export function saveComment(id,sap,date_process){

    const addCommentHandler = (doc,sap,obj) => {
        const ref = db.collection('Samples').doc(doc);
            ref
                .set(
                {comments:{
                    [sap] : obj
                }},{merge:true}
                ).then(()=> {
                    console.log("Document successfully updated!");
                    window.location.reload();
                }).catch((err)=>{
                    console.error("Update document: ", err);
                });
    }
    return dispatch => addCommentHandler(id,sap,date_process);
}