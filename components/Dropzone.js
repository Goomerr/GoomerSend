import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Formulario from './Formulario';

const Dropzone = () => {

    //Context de la App
    const AppContext = useContext(appContext);
    const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = AppContext;

    //Context de Autenticación
    const AuthContext = useContext(authContext);
    const { autenticado } = AuthContext;

    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir max 1 MB. Crea una cuenta gratis o inicia sesión para poder compartir archivos más grandes')
    }

    //Subir los archivos a la BD
    const onDropAccepted = useCallback(async (acceptedFiles) => {

        //crear un Form Data
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);

        //subir archivos
        subirArchivo(formData, acceptedFiles[0].path);
    }, []);

    //Limite tamaño archivos
    const maxSize = autenticado ? 1000000000000 : 1000000;
    //Extraer el contenido de DropZone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize });

    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mt-2 mb-4 shadow-lg rounded max-w-prose ..." >
            <p className="font-bold text-xl max-w-prose ..."> {archivo.path}</p>
            <p className="text-sm text-gray-500">{(archivo.size / Math.pow(1024, 2)).toFixed(3)} MB</p>
        </li>
    ));

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16n lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">

            {acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>
                    {
                        autenticado ? <Formulario/> : ""
                    }
                    {cargando ? <div className="sk-cube-grid">
                        <div className="sk-cube sk-cube1"></div>
                        <div className="sk-cube sk-cube2"></div>
                        <div className="sk-cube sk-cube3"></div>
                        <div className="sk-cube sk-cube4"></div>
                        <div className="sk-cube sk-cube5"></div>
                        <div className="sk-cube sk-cube6"></div>
                        <div className="sk-cube sk-cube7"></div>
                        <div className="sk-cube sk-cube8"></div>
                        <div className="sk-cube sk-cube9"></div>
                    </div> : (
                        <button
                            type="button"
                            className="bg-indigo-700 hover:bg-red-600 w-full py-3 rounded-lg text-white my-10"
                            onClick={() => crearEnlace()}
                        >Crear Enlace</button>
                    )}

                </div>
            ) : (
                <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
                    <input className="h-100" {...getInputProps()} />
                    {
                        isDragActive ? (
                            <p className="text-2xl text-center text-gray-600 ">Suelta el archivo aquí</p>
                        ) : (
                            <div className="text-center">
                                <p className=" text-2xl text-center text-gray-600 ">Selecciona un archivo y arrastralo aquí</p>

                                <button className="bg-indigo-700 hover:bg-red-600 w-full py-3 rounded-lg text-white my-10" type="button">
                                    Selecciona archivos para Subir
                                </button>
                            </div>
                        )
                    }
                </div>
            )
            }
        </div >
    )
}

export default Dropzone;
