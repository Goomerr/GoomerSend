import React, { useState, useContext } from 'react';
import appContext from '../context/app/appContext';

const Formulario = () => {

   //Context de la App
   const AppContext = useContext(appContext);
   const { agregarPassword, numeroDescargas } = AppContext;

    const [conPassword, setConPassword] = useState(false);

    return (
        <div className="w_full mt-20 ">
            <div>
                <label className="text-lg text-gray-800 ">Eliminar tras:</label>
                <select 
                className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                onChange={e => numeroDescargas(parseInt(e.target.value))}
                >
                    <option value="" selected disabled>-- Seleccionar --</option>
                    <option value="1">Una Descarga</option>
                    <option value="5">Cinco Descargas</option>
                    <option value="10">Diez Descargas</option>
                    <option value="20">Veinte Descargas</option>
                </select>
            </div>
            <div className="mt-4 ">
                <div className="flex justify-between justify-center ">
                    <label className="text-lg text-gray-800 mr-2">Proteger con Contraseña</label>
                    <input
                        type="checkbox"
                        className="mt-2"
                        onChange={() => setConPassword(!conPassword)} />
                </div>
                {conPassword ? (
                    <input
                        type="password"
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500" 
                        onChange={e => agregarPassword(e.target.value)}
                        />
                ) : null}
            </div>
        </div>
    )
}

export default Formulario;
