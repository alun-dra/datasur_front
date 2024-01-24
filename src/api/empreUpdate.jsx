import axios from 'axios';

const API_URL = 'https://daback.onrender.com/api/Empre/empre';

export const upEmpresa = async (name, nombre, giroempresa, telefonoempresa) => {
  try {
    const response = await axios.put(`${API_URL}/update?${name}`, {
      nombre,
      giroempresa,
      telefonoempresa
    });
    return response.data;
  } catch (error) {
    console.error('Hubo un error al actualizar la empresa:', error.response);
    throw error;
  }
};
