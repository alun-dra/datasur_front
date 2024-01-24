import axios from 'axios';
const API_URL = 'https://daback.onrender.com/api/Empre/empre'; 
export const addEmpresa = async (nombre, giroempresa, telefonoempresa) => {
  try {
    const response = await axios.post(`${API_URL}/ingre`, {
      nombre,
      giroempresa,
      telefonoempresa
    });
    return response.data; 
  } catch (error) {
    console.error('Hubo un error al agregar la empresa:', error.response);
    throw error; 
  }
};
