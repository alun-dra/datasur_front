import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Dashboard from "./pages/Dashboard";
import Home from "./components/Home";
import Empresas from "./components/Empresa";
import Cliente from "./components/Cliente";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="panelPrincipal" element={<Home />}/>
          <Route path="empresas" element={<Empresas />}/>
          <Route path="clientes" element={<Cliente />}/>
        </Route> 
      </Routes>
    </RootLayout>
  );
};

export default App;
