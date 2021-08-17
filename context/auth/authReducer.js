import {
    LIMPIAR_ALERTA,
    REGISTRO_CORRECTO,
    REGISTRO_INCORRECTO,
    LOGIN_ERROR,
    LOGIN_CORRECTO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_CORRECTO:
        case REGISTRO_INCORRECTO:
            return {
                ...state,
                mensaje: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case LOGIN_CORRECTO:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            }
        case CERRAR_SESION:
            localStorage.removeItem('token')
            return {
                ...state,
                usuario: null,
                token: null,
                autenticado: null
            }

        default:
            return state;
    }
}