import React from 'react';
import { Route } from 'react-router';
import { Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { getEnvVariables } from '../helpers';
import { AuthState } from '../store/auth/authSlice';
import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect } from 'react';

export const AppRouter = () => {
    const { status, checkAuthToken, user } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    // if (status === 'checking' && user !== null) {
    //     console.log(user);
    //     return <h1>Cargando...</h1>;
    // }
    return (
        <Routes>
            {status === 'not-authenticated' || status === 'checking' ? (
                <>
                    <>
                        <Route path='/auth/*' element={<LoginPage />} />
                        <Route
                            path='/*'
                            element={<Navigate to='/auth/login' />}
                        />
                    </>
                    {/* {status === 'checking' && <span>Cargando...</span>} */}
                </>
            ) : (
                // : status === 'checking' ? (
                //     <h2>Cargando...</h2>
                // )
                <>
                    <Route path='/' element={<CalendarPage />} />
                    <Route path='/*' element={<Navigate to='/' />} />
                </>
            )}
        </Routes>
    );
};
