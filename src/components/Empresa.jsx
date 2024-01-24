import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Outlet } from 'react-router-dom';
import { TABLE_HEADERS_EMPRE } from '../constant/empreHeader';
import useFetchEmpresas from "../api/empre";
import deleteEmpresa from '../api/empreDelete';
import ReactModal from 'react-modal';
import { addEmpresa } from '../api/empreIngre';
import { upEmpresa } from '../api/empreUpdate';
const customStyles = {
    content: {
      top: '30%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '500px',
      width: '90%',
      borderRadius: '12px',
      padding: '2rem',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
  };
const Empresas = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data, loading, error } = useFetchEmpresas(1, searchTerm); 

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateEmpresa, setUpdateEmpresa] = useState({
        nombre: '',
        giroempresa: '',
        telefonoempresa: ''
    });

    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newEmpresa, setNewEmpresa] = useState({
        nombre: '',
        giroempresa: '',
        telefonoempresa: ''
    });

    const handleeInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateEmpresa(prev => ({
          ...prev,
          [name]: value
        }));
    };

    const handleUpdateClick = (empresa) => {
        setSelectedEmpresa(empresa); 
        setIsUpdateModalOpen(true);
        
        setUpdateEmpresa({
            nombre: empresa.nombre,
            giroempresa: empresa.giroempresa,
            telefonoempresa: empresa.telefonoempresa
        });
    };

    const handleConfirmUpdate = async () => {
        console.log('Intentando actualizar la empresa:', selectedEmpresa); // Para depuración
    
        if (!selectedEmpresa) {
            console.error('No se ha seleccionado ninguna empresa para actualizar.');
            return;
        }
    
        try {
            const updateEmpresaData = await upEmpresa(
                selectedEmpresa.nombre,
                updateEmpresa.nombre,
                updateEmpresa.giroempresa,
                updateEmpresa.telefonoempresa
            );
            console.log('Empresa actualizada con éxito:', updateEmpresaData); 
            setIsUpdateModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar la empresa:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmpresa(prev => ({
          ...prev,
          [name]: value
        }));
    };
    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };
    const handleConfirmAdd = async () => {
        try {
          const newEmpresaData = await addEmpresa(
            newEmpresa.nombre,
            newEmpresa.giroempresa,
            newEmpresa.telefonoempresa
          );
          
          setIsAddModalOpen(false);
          window.location.reload();
        } catch (error) {
          
          console.error('Error al agregar la empresa:', error);
        }
    }; 

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleDeleteClick = (empresa) => {
        setSelectedEmpresa(empresa);
        setIsModalOpen(true);
    };
    const handleConfirmDelete = async () => {
        if (selectedEmpresa) {
            try {
                await deleteEmpresa(selectedEmpresa.nombre);
                setIsModalOpen(false);
                window.location.reload();
            } catch (error) {
                console.log("error:", error);
            }
        }
    };
    const handleDownloadExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data.results);
        XLSX.utils.book_append_sheet(wb, ws, 'Empresas');
        XLSX.writeFile(wb, 'Empresas.xlsx');
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
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                            onClick={() => handleUpdateClick(empresa)} // Asegúrate de pasar empresa aquí
                                        >
                                        Actualizar
                                        </button>
                                    </td>
                                    <td className=" border-b border-gray-200 bg-white text-sm">
                                        <button  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteClick(empresa)}>
                                        Eliminar
                                        </button>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-end p-4">
                <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                        onClick={handleAddClick}
                    >
                        Agregar
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        onClick={handleDownloadExcel}
                    >
                        Descargar Excel
                    </button>

                </div>
                

            </div>
            {isModalOpen && (
                <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Confirmación de Eliminación"
                    style={customStyles}
               
                >
                    <h2>¿Estás seguro de que quieres eliminar la empresa {selectedEmpresa?.nombre}?</h2>
                    <button 
                        type="button" 
                        className="bg-red-500 text-white py-2 px-2 rounded hover:bg-red-700"
                        onClick={handleConfirmDelete}
                    >Sí, eliminar
                    </button>
                    
                    <button 
                        className="bg-gray-500 text-white py-2 px-2 rounded hover:bg-gray-700" 
                        onClick={() => setIsModalOpen(false)}
                    >No, cancelar</button>
                </ReactModal>
            )}
            {isAddModalOpen && (
                <ReactModal
                    isOpen={isAddModalOpen}
                    onRequestClose={() => setIsAddModalOpen(false)}
                    style={customStyles}
                >
                    <h2 className="text-lg font-bold mb-4">Agregar nueva empresa</h2>
                    <form className="space-y-4">
                        <div>
                            <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la empresa"
                            value={newEmpresa.nombre}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <input
                            type="text"
                            name="giroempresa"
                            placeholder="Giro de la empresa"
                            value={newEmpresa.giroempresa}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <input
                            type="text"
                            name="telefonoempresa"
                            placeholder="Teléfono"
                            value={newEmpresa.telefonoempresa}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button 
                            type="button" 
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                            onClick={handleConfirmAdd}
                            >
                            Confirmar
                            </button>
                            <button 
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors" 
                            onClick={() => setIsAddModalOpen(false)}
                            >
                            Cancelar
                            </button>
                        </div>
                    </form>
                </ReactModal>
            )}
            {isUpdateModalOpen && (
                <ReactModal
                    isOpen={isUpdateModalOpen}
                    onRequestClose={() => setIsUpdateModalOpen(false)}
                    style={customStyles}
                >
                    <h2 className="text-lg font-bold mb-4">Actualizar empresa</h2>
                    <form className="space-y-4">
                        <div>
                            <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la empresa"
                            value={updateEmpresa.nombre}
                            onChange={handleeInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <input
                            type="text"
                            name="giroempresa"
                            placeholder="Giro de la empresa"
                            value={updateEmpresa.giroempresa}
                            onChange={handleeInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <input
                            type="text"
                            name="telefonoempresa"
                            placeholder="Teléfono"
                            value={updateEmpresa.telefonoempresa}
                            onChange={handleeInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button 
                                type="button" 
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                                onClick={ handleConfirmUpdate}
                                >
                                Confirmar
                            </button>
                            <button 
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors" 
                                onClick={() => setIsUpdateModalOpen(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </ReactModal>
            )}
        </>
    );
};

export default Empresas;
