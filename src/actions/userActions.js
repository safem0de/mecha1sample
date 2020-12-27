import {auth,googleProvider} from '../firebase';
import {GET_USER,USER_STATUS} from '../actionTypes'

export function googleLogin(){
    return dispatch => auth.signInWithPopup(googleProvider).then(()=>{
        console.log('login success')
    }).catch((err)=>{
        console.log(err)
    });
}

export function logout(){
    return dispatch => auth.signOut().then(()=>{
        console.log('logout success')
    }).catch((err)=>{
        console.log(err)
    });
}

export function getUser(){
    return dispatch => {

        dispatch({
            type: USER_STATUS,
            payload: true
        });

        auth.onAuthStateChanged(user =>{

            dispatch({
                type: GET_USER,
                payload: user
            });

            dispatch({
                type: USER_STATUS,
                payload: false
            })
        });
    }
}