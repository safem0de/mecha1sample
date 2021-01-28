// https://stackoverflow.com/questions/59510336/action-reducer-function-not-being-called
// https://www.youtube.com/watch?v=dIPvgHEM-2s
import {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getSamples,getSampleGraph,getSituation} from '../actions/sampleActions';
import {getUser} from '../actions/userActions';

const Loadingz = (props,state) =>{

    const [jsx,setJsx]= useState(
        <div className='d-flex justify-content-center'>
            <h2>Loading...</h2>
        </div>
    )

    const loadPage = () => {

        if (state.samplesLoading === undefined){
            props.getSamples();
        }

        if (state.userLoading === undefined){
            props.getUser();
        }

        if (state.chartLoading === undefined){
            var x = new Date(Date.now()).toLocaleString('en-us', { month: 'long' });
            props.getSampleGraph(x,['Receive','Confirm','Shipment']);
        }

        if (state.tableLoading === undefined){
            props.getSituation();
        }

        if((!state.userLoading && !state.samplesLoading )|| props.user === null || !state.chartLoading || !state.tableLoading){
            setJsx(
                <div>
                    {props.children}
                </div>
            )
        }
    }

    useEffect(()=>{
        loadPage();
    },[]);

    return jsx;
}

function mapStateToProps(state){
    return{
        samplesLoading : state.loading.samples,
        userLoading : state.loading.user,
        user : state.user,
        chartLoading : state.loading.chart,
        tableLoading : state.loading.table
    }
}

export default withRouter (connect(mapStateToProps,{getSamples,getUser,getSampleGraph,getSituation})(Loadingz));