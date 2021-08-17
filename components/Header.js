import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import {useRouter} from 'next/router';

const Header = () => {

    //Routing
    const router = useRouter();

    //Extraer el usuario autenticado del storage
    const AuthContext = useContext(authContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;

    //Context de la aplicación
    const AppContext = useContext(appContext);
    const { limpiarState } = AppContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    const redireccionar = () => {
        router.push('/');
        limpiarState();
    }

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img
            onClick={() => redireccionar()}
             className="cursor-pointer w-64 mb-8 md:mb-0" 
             src="/goomer.svg" />
            <div>
                {
                    usuario ? (
                        <div className="flex items-center">
                            <p className="mr-2 text-lg">Hola <span className="font-bold">{usuario.nombre}</span>  </p>
                            <button
                                type="button"
                                className=" bg-indigo-700 hover:bg-red-600 px-5 py-3 rounded-lg font-bold text-white mr-2 uppercase"
                                onClick={() => cerrarSesion()}
                            >Cerrar Sesión</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-red-600 hover:bg-red-800  px-5 py-3 rounded-lg font-bold text-white mr-2 uppercase">Iniciar Sesión</a>
                            </Link>
                            <Link href="/crearcuenta">
                                <a className="bg-indigo-700 hover:bg-indigo-900 px-5 py-3 rounded-lg font-bold text-white uppercase">Crear Cuenta</a>
                            </Link>
                        </>
                    )
                }

            </div>
        </header>
    )
}

export default Header;
