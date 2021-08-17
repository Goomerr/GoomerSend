import Layout from "../../components/Layout";
import clienteAxios from '../../config/axios';
import React, { useState, useContext} from 'react';
import appContext from '../../context/app/appContext';
import Alerta from '../../components/Alerta';

export async function getServerSideProps({ params }) {
    const { enlace } = params;
    // console.log(enlace)
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
    console.log(resultado)

    return {
        props: {
            enlace: resultado.data
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get('/api/enlaces');
    // console.log(enlaces.data)
    return {
        paths: enlaces.data.enlaces.map(enlace => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
}

export default ({ enlace }) => {

    //Context de la App
    const AppContext = useContext(appContext);
    const { mostrarAlerta, mensaje_archivo, redireccionar } = AppContext;

    const [conPassword, setConPassword] = useState(enlace.password);
    const [password, setPassword] = useState('');
   
    const verificarPassword = async e => {
        e.preventDefault();

        const data = {
            password
        }
        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            setConPassword(resultado.data.password);
        } catch (error) {
            mostrarAlerta(error.response.data.msg)
        }

    }

    return (
        <Layout>
            {
                conPassword ? (
                    <>
                        <p className="text-center text-lg font-bold">La descarga esta protegida con password, introducelo para descargar.</p>
                        {mensaje_archivo && <Alerta />}
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form
                                    className=" bg-gray-50 rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={e => verificarPassword(e)}
                                >
                                    <div className="mb-4">
                                        <label
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="nombre"
                                        >Password</label>
                                        <input
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Password"
                                            id="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <input
                                            type="submit"
                                            className="cursor-pointer bg-red-600 hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold mt-2"
                                            value="Validar Password"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4-xl text-center text-gray-700">Descarga Tu Archivo:</h1>
                        <div className=" flex items-center justify-center mt-10">
                            <a href={`${process.env.backendURL}/api/archivos${enlace.archivo}`}
                                className="bg-red-600 hover:bg-indigo-700 text-center px-10 py-3 text-white uppercase font-bold rounded cursor-pointer"
                                download
                            >Aquí</a>
                        </div>
                    </>
                )
            }
        </Layout >
    )


}
