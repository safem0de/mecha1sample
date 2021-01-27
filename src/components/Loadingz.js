// https://stackoverflow.com/questions/59510336/action-reducer-function-not-being-called
import {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getSamples,getSampleGraph,getSituation} from '../actions/sampleActions';
import {getUser} from '../actions/userActions';

const Loadingz = (props,state) =>{

    const [loading,setLoading]= useState(true)
    const [jsx,setJsx]= useState('')

    const loadPage = () => {
        if (state.samplesLoading === undefined){
            props.getSamples();
        }

        if (state.userLoading === undefined){
            props.getUser();
        }

        if((!state.userLoading && !state.samplesLoading )||props.user === null){
            setLoading(false)
        }
    }

    useEffect(()=>{
        loadPage();
    },[]);

    return loading?jsx:null;
}

function mapStateToProps(state){
    return{
        samplesLoading : state.loading.samples,
        userLoading : state.loading.user,
        user : state.user
    }
}

export default withRouter (connect(mapStateToProps,{getSamples,getUser})(Loadingz));