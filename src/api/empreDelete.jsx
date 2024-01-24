// empresaService.js
import axios from 'axios'; 

const deleteEmpresa = async (nombreEmpresa) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/Empre/empre/delete`, {
      params: {
        name: nombreEmpresa
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export default deleteEmpresa;
