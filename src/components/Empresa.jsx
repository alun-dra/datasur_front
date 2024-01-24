import { Outlet } from 'react-router-dom';
import { TABLE_HEADERS_EMPRE } from '../constant/empreHeader';
import { useState } from 'react';
import useFetchEmpresas from "../api/empre";
const Empresas = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, loading, error } = useFetchEmpresas(1, searchTerm); 

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Ocurrió un error al obtener los datos: {error.message}</p>;
    return (
        <>
            <Outlet /> 
            <br />
            <br />
            <div className="flex flex-col items-center justify-center p-4">
                <h3 className='text-lg text-gray-800 font-semibold'>Empresas</h3>
                <div className="w-full max-w-6xl mt-4">
                    <input
                        type="text"
                        className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        placeholder="Buscar Empresa"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="w-full max-w-6xl mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    {TABLE_HEADERS_EMPRE.map((header, index) => (
                                        <th key={index} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.results.map((empresa, index) => (
                                    <tr key={index}>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{empresa.nombre}</p>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{empresa.giroempresa}</p>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{empresa.telefonoempresa}</p>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white text-sm">
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                                        Actualizar
                                        </button>
                                    </td>
                                    <td className=" border-b border-gray-200 bg-white text-sm">
                                        <button  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                                        Eliminar
                                        </button>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Empresas;
