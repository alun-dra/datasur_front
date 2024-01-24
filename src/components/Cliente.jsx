import { Outlet } from 'react-router-dom';
import { TABLE_HEADERS_CLIENT } from '../constant/clientHeader';

const Cliente = () => {
    return (
        <>
            <Outlet /> 
            <br />
            <br />
            <div className="p-2 max-w-6xl mx-auto text-gray-800 bg-white shadow-lg rounded-lg"> 
                <h3 className='text-gray-800 bg-white'>Clientes</h3>
                <div className="overflow-x-auto mt-2">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                {TABLE_HEADERS_CLIENT.map((header, index) => (
                                    <th key={index} className="px-4 py-3">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {/* Aquí irán las filas de tu tabla */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        
    );
};
  
export default Cliente;
