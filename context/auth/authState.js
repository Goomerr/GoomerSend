import React, { useReducer } from 'react';
import authContext from "./authContext";
import authReducer from './authReducer';
//importar los types
import {
    REGISTRO_CORRECTO,
    REGISTRO_INCORRECTO,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_CORRECTO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({ children }) => {

    //Definir el state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }
    //Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuario', datos);
            //console.log(respuesta.data.msg);
            dispatch({
                type: REGISTRO_CORRECTO,
                payload: respuesta.data.msg
            });

        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: REGISTRO_INCORRECTO,
                payload: error.response.data.msg
            })
        }
        //Limpiar los mensajes de alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })

        }, 3000);
    }

    //Autenticar usuarios
    const iniciarSesion = async datos => {
        //console.log(datos)
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            //console.log(respuesta.data.token);
            dispatch({
                type: LOGIN_CORRECTO,
                payload: respuesta.data.token
            })
        } catch (error) {
            // console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })

        }
        //Limpiar los mensajes de alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })

        }, 3000);
    }

    //Retornar el usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth');
            if (respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //Cerrar sesión
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }


    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;