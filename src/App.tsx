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
  const [bus, setBus] = useState<number | null>(null);
  const [list, setList] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = list.slice(startIndex, endIndex);

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
    <div className="w-screen h-screen grid grid-cols-1 grid-rows-[5fr_1fr] place-items-center ">
      <div className="w-full md:w-4/6 h-5/6 p-20  border-gray-500 border-2 rounded-md flex items-center justify-center">
        {bus === null ? (
          <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
            Seleccione un número de bus para ver detalles
          </div>
        ) : (
          <Bus id={bus} />
        )}
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col gap-4 p-10">
          <ul className="w-full h-full flex items-center justify-center gap-10">
            {currentItems.map((item, index) => (
              <li
                key={item.id}
                className="px-4 py-3 rounded-md text-white opacity-50 hover:opacity-100 hover:bg-blue-400 cursor-pointer active:bg-blue-600"
                onClick={() => setBus(item.id)}
              >
                {startIndex + index + 1}
              </li>
            ))}
          </ul>

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
      )}
    </div>
  );
}

export default App;
