import React from 'react';

const SampleCard = props =>{
    return(
        <div className='col-sm-3 jumbotron m-2'>
            {props.children}
        </div>
    );
}

export default SampleCard;