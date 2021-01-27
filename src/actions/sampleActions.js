// https://stackoverflow.com/questions/52953145/maximum-value-from-firebase-firestore-collection
import {GET_SAMPLES,SAMPLES_STATUS,GET_CHART,CHART_STATUS,GET_TABLE,TABLE_STATUS} from '../actionTypes';
import {convert,getDaysInMonth,formatDate} from './Actions'
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
    const getData = (obj,key) =>{
        var val = ''
        if(obj[key] !== undefined){
            val = obj[key]
        }else{
            val = '-'
        }
        return val
    }
    const getDataSap = (obj,key) =>{
        var val = ''
        if(obj[key] !== undefined){
            if (obj[key].SAP!=='-'){
                val = obj[key].SAP
            }else{
                val = obj[key].PartNo
            }
        }else{
            val = '-'
        }
        return val
    }

    const getStatus = (obj,part) =>{
        var max = 0;
        for (var property in obj) {
            max = (max < parseFloat(property)) ? parseFloat(property) : max;
        }
        
        if(max !== 0 && obj[max].PartNo === part){
            console.log(obj[max].processinput);
            return formatDate(parseInt(max)) +'\n'+ obj[max].processinput;
        }else{
            return '-';
        }
        
    }

    var no = 0
    const datas = []
    const ref = db.collection('Samples').where("Finish","==",false);
    ref.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var lotno = ''
                var zone = ''
                var issue = ''
                var receive = ''
                var duedate = ''
                var shaft = ''
                var rotor = ''
                var stator = ''
                var front = ''
                var rear = ''
                var cover = ''
                var _shaft = ''
                var _rotor = ''
                var _stator = ''
                var _front = ''
                var _rear = ''
                var _cover = ''
                if (doc.exists){
                    no++
                    lotno = doc.id
                    zone = getData(doc.data(),"Zone");
                    issue = getData(doc.data(),"IssueDate");
                    receive = getData(doc.data(),"ReceiveDate");
                    duedate = getData(doc.data(),"DueDate");
                    shaft = getDataSap(doc.data().ComponentPart,"shaft");
                    rotor = getDataSap(doc.data().ComponentPart,"rotor ass'y");
                    stator = getDataSap(doc.data().ComponentPart,"stator stack");
                    front = getDataSap(doc.data().ComponentPart,"front flange");
                    rear = getDataSap(doc.data().ComponentPart,"rear flange");
                    cover = getDataSap(doc.data().ComponentPart,"cover");
                    _shaft = getStatus(doc.data().comments,shaft);
                    _rotor = getStatus(doc.data().comments,rotor);
                    _stator = getStatus(doc.data().comments,stator);
                    _front = getStatus(doc.data().comments,front);
                    _rear = getStatus(doc.data().comments,rear);
                    _cover = getStatus(doc.data().comments,cover);

                }
                var obj = {no,lotno,zone,issue,receive,duedate,shaft,rotor,stator,front,rear,cover,_shaft,_rotor,_stator,_front,_rear,_cover}
                console.log(obj);
                datas.push(obj);

            })
        })

    return dispatch => {
        console.log(datas)
        dispatch({
            type: TABLE_STATUS,
            payload: true
        });

        dispatch({
            type : GET_TABLE,
            payload : datas
        })

        dispatch({
            type: TABLE_STATUS,
            payload: false
        });
    }
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
            type: CHART_STATUS,
            payload: true
        });

        dispatch({
            type : GET_CHART,
            payload : datas
        })

        dispatch({
            type: CHART_STATUS,
            payload: false
        });
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

    const addCommentHandler = (doc,obj) => {
        const ref = db.collection('Samples').doc(doc);
            ref
                .set(
                {comments:{
                    [Date.now()] : obj
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