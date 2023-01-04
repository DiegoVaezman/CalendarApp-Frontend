import Swal from 'sweetalert2';
import { useForm, useAuthStore } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
};

const registerFormFields = {
    registerEmail: '',
    registerName: '',
    registerPassword: '',
    registerPassword2: '',
};

export const LoginPage = () => {
    const { startLogin, startRegister } = useAuthStore();

    const {
        loginEmail,
        loginPassword,
        onInputChange: onLoginInputChange,
    } = useForm(loginFormFields);

    const {
        registerEmail,
        registerName,
        registerPassword,
        registerPassword2,
        onInputChange: onRegisterInputChange,
    } = useForm(registerFormFields);

    const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startLogin(loginEmail, loginPassword);
    };

    const registerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            Swal.fire(
                'Error en registro',
                'Contraseñas no son iguales',
                'error'
            );
            return;
        }
        startRegister(registerName, registerEmail, registerPassword);
    };
    return (
        <div className='container login-container'>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className='form-group mb-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Correo'
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                            <input
                                type='submit'
                                className='btnSubmit'
                                value='Login'
                            />
                        </div>
                    </form>
                </div>

                <div className='col-md-6 login-form-2'>
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className='form-group mb-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Nombre'
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Correo'
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Repita la contraseña'
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className='d-flex justify-content-center mt-4'>
                            <input
                                type='submit'
                                className='btnSubmit'
                                value='Crear cuenta'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
