import React, { useState, useEffect, useRef } from 'react'
import "./ContenedorTablas.scss"
import { Tabla } from '../Tabla/Tabla';

export const ContenedorTablas = ({ nombreTabla, setNombreTabla }) => {

  const [cantidadTablas, setCantidadTablas] = useState([]);
  const contenedorTabla = useRef();
  const [actualizarNombre, setActualizarNombre] = useState([]);
  const [eliminarTabla, setEliminarTabla] = useState(null);

  useEffect(() => {
    (localStorage.getItem("tablas"))
    ? setCantidadTablas(JSON.parse(localStorage.getItem("tablas"))) 
    : localStorage.setItem("tablas", JSON.stringify([]));
  }, [])

  useEffect(() => {

    const colorDeTabla = () => {
      let colores = ["rojo", "azul", "verde", "violeta", "naranja", "amarillo", "celeste", "gris"];
      return colores[Math.floor(Math.random() * 8)];
    }

    const actualizarTablas = () => {
      if (nombreTabla.length != "") {
        let idTabla = Date.now();
        localStorage.setItem(idTabla, JSON.stringify([]));
        let nuevoArray = [...cantidadTablas, { nombre: nombreTabla, id: idTabla, lista: JSON.parse(localStorage.getItem(idTabla)), color: colorDeTabla()}]
        setCantidadTablas(nuevoArray);
        setNombreTabla("");
      }
    }
    actualizarTablas();

  }, [nombreTabla]);


  useEffect(() => {

    setTimeout(() => {
      const visibilitiContenedor = () => {
        if (cantidadTablas.length != 0) {
          contenedorTabla.current.classList.add("active");
          localStorage.setItem('tablas', JSON.stringify(cantidadTablas));
        }else{
          contenedorTabla.current.classList.remove("active");
          localStorage.setItem("tablas", JSON.stringify([]));
        }
      };
      visibilitiContenedor();
      
    });

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

  useEffect(() => {

    if(eliminarTabla != null){
      let indice;
      for(let i = 0; i < cantidadTablas.length; i++){
        if(cantidadTablas[i].id == eliminarTabla){
          indice = i;
        }
      }

      let nuevoArray = cantidadTablas.filter((el, pos) => pos != indice);
      localStorage.removeItem(eliminarTabla);
      setCantidadTablas(nuevoArray);
      localStorage.setItem('tablas', JSON.stringify(cantidadTablas));

    }

  }, [eliminarTabla])


  return (
    <div ref={contenedorTabla} className='contenedor-tablas'>
      {cantidadTablas.map(el => <Tabla key={el.id} nombre={el.nombre} id={el.id} lista={el.lista} color={el.color} setActualizarNombre={setActualizarNombre} setEliminarTabla={setEliminarTabla}></Tabla>)}
    </div>
  )
}
