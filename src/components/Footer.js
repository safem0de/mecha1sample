import React from 'react';

const Footer = props =>{
    return(
        <footer className='mt-auto'>
                <hr/>
                <div className='row mx-2'>
                    <p>&copy; Mecha Parts (ENG) - Safem0de</p>

                    {props.children}

                </div>
            </footer>
    );
}

export default Footer;