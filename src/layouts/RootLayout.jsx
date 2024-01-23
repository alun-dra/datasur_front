import Sidebar from "./sidebar";

function RootLayout({ children }) {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <main className="flex-1 mx-auto py-4">
        {children} {/* Esto renderizará el contenido del componente de la ruta que esté activa */}
      </main>
    </div>
  );
}

export default RootLayout;
