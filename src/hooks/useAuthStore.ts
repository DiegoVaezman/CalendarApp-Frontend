import { useAppDispatch, useAppSelector } from './reduxToolkit';
import calendarApi from '../api/calendarApi';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';
import { AuthSuccessResponse, RenewTokenResponse } from '../interfaces/interfaces';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


export const useAuthStore = () => {

    const {status, user, errorMessage} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

     const startLogin = async (email: string, password: string) => {
        dispatch(onChecking());
        try {
            const {data}: {data: AuthSuccessResponse} = await calendarApi.post('/auth', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', String(new Date().getTime()));
            dispatch(onLogin({uid: data.uid, name: data.name}));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    };

    const startRegister = async (name: string, email: string,  password: string) => {
        dispatch(onChecking());
        try {
            const {data}: {data: AuthSuccessResponse} = await calendarApi.post('/auth/new', {name, email,  password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', String(new Date().getTime()));
            dispatch(onLogin({uid: data.uid, name: data.name}));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || Object.values<any>(error.response.data.errors)[0].msg || 'Unexpected error'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout(null));

        try {
            const {data}: {data: RenewTokenResponse} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', String(new Date().getTime()));
            dispatch(onLogin({uid: data.uid, name: data.name}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout(null))
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout(null));
    };

     useEffect(() => {
       if (errorMessage !== null) {
        Swal.fire('Error en la autenticación', errorMessage);
       };
     }, [errorMessage]);
     

    return {
        status, 
        user, 
        errorMessage,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    };
};