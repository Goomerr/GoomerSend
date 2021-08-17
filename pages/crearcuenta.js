import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alerta from '../components/Alerta';
import {useRouter} from 'next/router';


const crearcuenta = () => {

    const router = useRouter();

    //Acceder al state
    const AuthContext = useContext(authContext)
    const { mensaje, registrarUsuario } = AuthContext;

    //Formulario y validación con formik y yup
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: '',
            confirmarpassword: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre es Obligatorio'),
            email: Yup.string().email('El Email no es Valido').required('El Email es Obligatorio'),
            password: Yup.string().required('La Contraseña es Obligatoria').min(6, 'La Contraseña Debe Tener al Menos 6 Caracteres'),
            confirmarpassword: Yup.string().required('Por Favor Confirme la Contraseña').oneOf([Yup.ref("password"), null], "Las Contraseñas no Coinciden")
        }),
        onSubmit: valores => {
            registrarUsuario(valores);
            router.push('/login');
        }
    });

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center">Crear Cuenta</h2>
                {mensaje && <Alerta />}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form
                            className=" bg-gray-50 rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="nombre"
                                >Nombre</label>
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nombre de Usuario"
                                    id="nombre"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.nombre && formik.errors.nombre ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-600 text-red-800 p-2.5 mt-3">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.nombre}</p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="email"
                                >Email</label>
                                <input
                                    type="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Email de Usuario"
                                    id="email"
                                    values={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-600 text-red-800 p-2.5 mt-3">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="password"
                                >Contraseña</label>

                                <input
                                    type="password"
                                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Contraseña"
                                    id="password"
                                    values={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-600 text-red-800 p-2.5 mt-3">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}

                            <div className="mb-4">
                                <label
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="password2"
                                >Repetir Contraseña</label>
                                <input
                                    type="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Repetir Contraseña"
                                    id="confirmarpassword"
                                    values={formik.values.confirmarpassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.confirmarpassword && formik.errors.confirmarpassword ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-600 text-red-800 p-2.5 mt-3">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.confirmarpassword}</p>
                                    </div>
                                ) : null}
                            </div>
                            <input
                                type="submit"
                                className="cursor-pointer bg-red-600 hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold"
                                value="Crear Cuenta"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default crearcuenta;
