import { useEffect, useState } from "react";
import "./App.css";
import Bus from "./components/bus";

interface List {
  id: number;
  nombre: string;
  numeroBus: number;
  placa: string;
  fechaCreacion: string;
  caracteristicas: string[];
  marca: {
    id: number;
    nombre: string;
  };
  activo: boolean;
}

function App() {
  const [list, setList] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; // Número de elementos por página

  const totalPages = Math.ceil(list.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const loadBus = async () => {
    try {
      const response = await fetch("http://localhost:8080/bus");
      const data = await response.json();
      setList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBus();
  }, []);

  return (
    <div className="w-screen h-screen grid grid-cols-1 grid-rows-[5fr_1fr] place-items-center p-4">
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <div className="w-full h-full   border-gray-500 border-2 rounded-md grid grid-rows-[1fr_10fr] items-center">
            <div className="  w-full h-10 grid gap-4 px-10 grid-cols-8 items-center justify-center">
              <div className=" w-full flex items-center justify-center font-bold ">
                Id
              </div>
              <div className="w-full flex items-center justify-center font-bold">
                Número de bus
              </div>
              <div className="w-full flex items-center justify-center font-bold">
                Placa
              </div>
              <div className="w-full flex items-center text-center font-bold">
                Fecha de Creación
              </div>
              <div className="w-full flex items-center justify-center font-bold">
                Caracteristicas
              </div>
              <div className="w-full flex items-center justify-center font-bold">
                Marca de bus
              </div>
              <div className="w-full flex items-center text-center justify-center font-bold">
                Activo o Inactivo
              </div>
              <div className="w-full flex items-center justify-center font-bold"></div>
            </div>
            <div className="w-full  gap-4 px-10 ">
              <Bus id={startIndex + 1} />
              <Bus id={startIndex + 2} />
              <Bus id={startIndex + 3} />
              <Bus id={startIndex + 4} />
              <Bus id={startIndex + 5} />
              <Bus id={startIndex + 6} />
            </div>
          </div>

          <div className="w-full h-full flex items-center justify-center flex-col gap-4 p-10">
            <div className="flex gap-10 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
              >
                Anterior
              </button>

              <span>
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
