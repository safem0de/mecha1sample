// https://stackoverflow.com/questions/59510336/action-reducer-function-not-being-called
import {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getSamples} from '../actions/sampleActions';
// import {getSamples,getSampleGraph,getSituation} from '../actions/sampleActions';
// import {getUser} from '../actions/userActions';

const Loadingz = (props) =>{

    const [state,setState]= useState('')
    const [loading,setLoading]= useState('')
    const [jsx,setJsx]= useState('')

    const loadPage = () => {
        if (state.samplesLoading === undefined){
            props.getSamples();
        }
    }

    useEffect(()=>{
        loadPage()
    },[loading]);

    return loading?jsx:null;
}

function mapStateToProps(state){
    return{
        samplesLoading : state.loading.samples,
        userLoading : state.loading.user,
        user : state.user
    }
}

export default withRouter (connect(mapStateToProps,{getSamples})(Loadingz));