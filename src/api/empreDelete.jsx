// empresaService.js
import axios from 'axios'; 

const deleteEmpresa = async (nombreEmpresa) => {
  try {
    const response = await axios.delete(`https://daback.onrender.com/api/Empre/empre/delete`, {
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
