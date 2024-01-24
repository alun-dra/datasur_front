import ReactModal from 'react-modal';
import deleteEmpresa from '../../api/empreDelete';

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

const ModalEliminar = ({ isOpen, onRequestClose, onConfirmDelete }) => {
    const handleDelete = async () => {
        try {
          await deleteEmpresa(empresaData.nombre); // Usa el nombre de la empresa para la eliminación
          onRequestClose(); // Cierra el modal y actualiza la lista de empresas
          // Aquí puedes colocar cualquier lógica adicional que necesites tras una eliminación exitosa
        } catch (error) {
          console.error("Error al eliminar la empresa:", error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        }
      };

    return (
        <ReactModal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose} 
        style={customStyles}
        ariaHideApp={false}
        >
        <div>
            <h2 className="text-xl font-bold mb-4">Eliminar Empresa</h2>
            <p className="mb-4">¿Estás seguro de que quieres eliminar esta empresa?</p>
            {/* Flex container para los botones */}
            <div className="flex justify-end space-x-4">
                <button 
                    type="button" 
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700" 
                    onClick={handleDelete}
                    >
                    Eliminar
                </button>
                <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" onClick={onRequestClose}>Cancelar</button>
            
            </div>
        </div>
        </ReactModal>
    );
};

export default ModalEliminar;
