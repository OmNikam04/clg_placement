import { AUTH } from '../constants/actionTypes'

import * as api from '../api/index'


export const studentSignup = ( formData, navigate ) => async ( dispatch )=>{
    try {
        const { data } = await api.studentSignup(formData)
        console.log('Inside actions',data);
        console.log(data);
        dispatch({ type: AUTH, data })
        navigate('/auth')
    } catch (error) {
        console.log(error);
    }
}


export const signIn = ( formData, navigate) => async ( dispatch )=>{
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data })
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}