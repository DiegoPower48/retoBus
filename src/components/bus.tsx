import { useEffect, useState } from "react";

interface Props {
  id: number;
}

interface Bus {
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

export default function Bus(prop: Props) {
  const [loading, setLoading] = useState(true);
  const [bus, setBus] = useState<Bus | null>(null);
  const [isError, setIsError] = useState(false);

  const loadBus = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/bus/${id}`);
      const data = await response.json();
      setBus(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    loadBus(prop.id);
  }, [prop.id]);

  return (
    <>
      {loading ? (
        isError ? (
          <div>Error al cargar los datos </div>
        ) : (
          <div>Cargando...</div>
        )
      ) : (
        <div className="w-full h-24 grid grid-cols-8 ">
          <div className="flex items-center justify-center border-1 border-white p-2">
            {bus?.id}
          </div>
          <div className="flex items-center justify-center border-1 border-white p-2">
            {bus?.numeroBus}
          </div>
          <div className="flex items-center justify-center border-1 border-white p-2">
            {bus?.placa}
          </div>
          <div className="flex items-center justify-center border-1 border-white p-2">
            {bus?.fechaCreacion}
          </div>
          <div className="flex items-center justify-center border-1 border-white p-2">
            {bus?.caracteristicas}
          </div>
          <div className="flex items-center justify-center border-1 border-white p-2">
            {bus?.marca.nombre}
          </div>
          <div className="flex items-center justify-center border-1 border-white p-2">
            {bus?.activo}
          </div>
          <div className="flex items-center justify-center border-1 border-white p-2">
            {!bus ? (
              <div></div>
            ) : (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  alert(
                    `Datos del bus:
                  id: ${bus?.id},
                  nombre: ${bus?.nombre},
                  numeroBus: ${bus?.numeroBus},
                  placa: ${bus?.placa},
                  fechaCreacion: ${bus?.fechaCreacion},
                  caracteristicas: ${bus?.caracteristicas},
                  marca: ${bus?.marca.nombre},
                  activo: ${bus?.activo},`
                  )
                }
              >
                Detalle
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
