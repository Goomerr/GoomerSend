import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import Alerta from '../components/Alerta';

const index = () => {

  //Extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  //Extraer el mensaje de error y la url de subida de archivos
  const AppContext = useContext(appContext);
  const { mensaje_archivo, url } = AppContext;


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      usuarioAutenticado();
    }
  }, [])
  return (
    <Layout>
      <div className="md:w-44/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <Link href={`${process.env.frontendURL}/enlaces/${url}`}>
              <p className="text-center text-2xl">
                <span className="font-bold text-red-700 text-3xl uppercase "> Tu URL para descargar es:</span>
                <p className="cursor-pointer hover:text-red-500 mt-10 text-indigo-600">
                  <a >{`${process.env.frontendURL}/enlaces/${url}`} </a></p>
              </p>
            </Link>
            <button
              type="button"
              className="cursor-pointer bg-red-600 hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold mt-10 "
              onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}enlaces/${url}`)}
            > Copiar Enlace</button>
          </>
        ) : (
          <>
            {mensaje_archivo && <Alerta />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16n lg: mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Comparte Archivos de Forma sencilla y Privada</h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-600 font-bold">Goomer Send</span> te permite compartir archivos
                  con cifrado de extremo a extremo y archivos que son eliminados después de ser descargados.
                  Así que puedés mantener lo que compartes en privado y asegurarte de que lo que compartas no permanezcan en linea para siempre.
                </p>
                <Link href='/crearcuenta'>
                  <a className="text-red-600 font-bold text-lg hover:text-red-800" title="Crear Cuenta">Crea una cuenta para un mayor beneficio</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout >
  )
}

export default index;
