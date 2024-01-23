import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Dashboard from "./pages/Dashboard"
import Home from "./components/Home";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="panelPrincipal" element={<Home />}/>
        </Route> 
      </Routes>
    </RootLayout>
  );
};

export default App;
