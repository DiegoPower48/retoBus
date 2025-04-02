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
        <div className=" w-5/6 md:w-4/6 h-full  flex flex-col gap-4  justify-center">
          <div>
            <div className="flex gap-4 pb-2 justify-between">
              <div className="text-yellow-300">NUMERO DE BUS:</div>
              <div> {bus?.numeroBus}</div>
            </div>
            <div className="flex gap-4 pb-2 justify-between">
              <div className="text-yellow-300">PLACA: </div>
              <div>{bus?.placa}</div>
            </div>
            <div className="flex gap-4 pb-2 justify-between">
              <div className="text-yellow-300">MARCA: </div>
              <div>{bus?.marca.nombre}</div>
            </div>
            <div className="flex gap-4 pb-2 justify-between">
              <div className="text-yellow-300">Fecha de registro:</div>
              <div> {bus?.fechaCreacion}</div>
            </div>

            <div className="flex gap-4 pb-2 justify-between">
              <div className="text-yellow-300">Caracteristicas: </div>
              <div>{bus?.caracteristicas}</div>
            </div>
            <div className="flex gap-4 pb-2 justify-between">
              <div className="text-yellow-300">ESTADO:</div>
              <div className={`font-bold ${bus?.activo ? "" : "text-red-400"}`}>
                {bus?.activo ? "ACTIVO" : "INACTIVO"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
