import React from 'react'

const SampleDetail = props =>{
    return(
        <div className='col-sm-3 jumbotron m-2'>
            {props.children}
        </div>
    );
}

export default SampleDetail;