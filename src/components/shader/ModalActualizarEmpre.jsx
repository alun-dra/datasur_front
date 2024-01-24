import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  }
};

const ModalActualizar = ({ isOpen, onRequestClose, empresaData, setEmpresaData, onConfirmUpdate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresaData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <ReactModal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      style={customStyles}
      ariaHideApp={false}
    >
      <div>
        <h2 className="text-xl font-bold mb-6">Actualizar Empresa</h2>
        <form onSubmit={onConfirmUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input 
              name="nombre" 
              value={empresaData.nombre} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Giro Empresa</label>
            <input 
              name="giroempresa" 
              value={empresaData.giroempresa} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Teléfono</label>
            <input 
              name="telefonoempresa" 
              value={empresaData.telefonoempresa} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button 
              type="submit" 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Actualizar
            </button>
            <button 
              type="button" 
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" 
              onClick={onRequestClose}
            >
              Cancelar
            </button>
            
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default ModalActualizar;
