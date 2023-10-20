import React, { useState, useEffect, useRef } from 'react'
import { ReactSortable } from "react-sortablejs";
import "./ContenedorTablas.scss"
import { Tabla } from '../Tabla/Tabla';

export const ContenedorTablas = ({ nombreTabla, setNombreTabla }) => {

  const [cantidadTablas, setCantidadTablas] = useState([]);
  const contenedorTabla = useRef();
  const [actualizarNombre, setActualizarNombre] = useState([]);

  useEffect(() => {

    const actualizarTablas = () => {
      if (nombreTabla.length != "") {
        let nuevoArray = [...cantidadTablas, { nombre: nombreTabla, id: Date.now(), lista: [] }]
        setCantidadTablas(nuevoArray);
        setNombreTabla("");
      }
    }
    actualizarTablas();

  }, [nombreTabla]);


  useEffect(() => {

    const visibilitiContenedor = () => {
      if(cantidadTablas.length != 0){
        contenedorTabla.current.classList.add("active");
      }
    };
    visibilitiContenedor();

    console.log(cantidadTablas);

  }, [cantidadTablas])


  useEffect(() => {
    if(actualizarNombre.length != 0){
      for(let i = 0; i < cantidadTablas.length; i++){
        if(cantidadTablas[i].id == actualizarNombre[0].id){
          cantidadTablas[i].nombre = actualizarNombre[0].nombre;
        }
      }
    }

  }, [actualizarNombre]);


  return (
    <div ref={contenedorTabla} className='contenedor-tablas'>
      {cantidadTablas.map(el => <Tabla key={el.id} nombre={el.nombre} id={el.id} lista={el.lista} setActualizarNombre={setActualizarNombre} ></Tabla>)}
    </div>
  )
}
