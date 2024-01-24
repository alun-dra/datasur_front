import { BsPersonBoundingBox } from "react-icons/bs";



export const subMenuRecursoHumanos = [
    {
      name: "",
      icon: BsPersonBoundingBox,
      names: [
        {
          nameSubMenu: "Dashboard",
          path: "/dashboard",
          submodules: [
            { name: "Home", path: "/dashboard/panelPrincipal" },
            { name: "Clientes", path: "/dashboard/clientes" },
            { name: "Empresas", path: "/dashboard/empresas" },

            
          ],
        },
      ],        
    },
]

