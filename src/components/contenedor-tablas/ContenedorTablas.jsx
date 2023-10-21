import React, { useState, useEffect, useRef } from 'react'
import "./ContenedorTablas.scss"
import { Tabla } from '../Tabla/Tabla';

export const ContenedorTablas = ({ nombreTabla, setNombreTabla }) => {

  const [cantidadTablas, setCantidadTablas] = useState([]);
  const contenedorTabla = useRef();
  const [actualizarNombre, setActualizarNombre] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("tablas")){
      setCantidadTablas(JSON.parse(localStorage.getItem("tablas")))
    }
  },[])

  useEffect(() => {

    const actualizarTablas = () => {
      if (nombreTabla.length != "") {
        let idTabla = Date.now();
        localStorage.setItem(idTabla, JSON.stringify([]));
        let nuevoArray = [...cantidadTablas, { nombre: nombreTabla, id: idTabla, lista: JSON.parse(localStorage.getItem(idTabla))}]
        setCantidadTablas(nuevoArray);
        setNombreTabla("");
      }
    }
    actualizarTablas();

  }, [nombreTabla]);


  useEffect(() => {

    const visibilitiContenedor = () => {
      if (cantidadTablas.length != 0) {
        contenedorTabla.current.classList.add("active");
        localStorage.setItem('tablas', JSON.stringify(cantidadTablas));
      }
    };
    visibilitiContenedor();

  }, [cantidadTablas])


  useEffect(() => {
    if (actualizarNombre.length != 0) {
      for (let i = 0; i < cantidadTablas.length; i++) {
        if (cantidadTablas[i].id == actualizarNombre[0].id) {
          cantidadTablas[i].nombre = actualizarNombre[0].nombre;
        }
      }
      localStorage.setItem('tablas', JSON.stringify(cantidadTablas));
    }

  }, [actualizarNombre]);



  return (
    <div ref={contenedorTabla} className='contenedor-tablas'>
      {cantidadTablas.map(el => <Tabla key={el.id} nombre={el.nombre} id={el.id} lista={el.lista} setActualizarNombre={setActualizarNombre} ></Tabla>)}
    </div>
  )
}
