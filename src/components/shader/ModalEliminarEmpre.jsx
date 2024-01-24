import ReactModal from 'react-modal';

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

const ModalEliminar = ({ isOpen, onRequestClose}) => {

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
           
            <div className="flex justify-end space-x-4">

            
            </div>
        </div>
        </ReactModal>
    );
};

export default ModalEliminar;
