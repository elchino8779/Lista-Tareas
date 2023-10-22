import React, { useState, useEffect, useRef } from 'react'
import { ReactSortable } from "react-sortablejs";
import './Tabla.scss'
import { Item } from '../item/Item';

export const Tabla = (props) => {

  const [nombreTabla, setNombreTabla] = useState(props.nombre);
  const [editarAgregar, setEditarAgregar] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const [inputEditarAgregarValue, setInputEditarAgregarValue] = useState("");
  const [visibilidad, setVisibilidad] = useState(null);
  const [aceptarCancelar, setAceptarCancelar] = useState(false);
  const [listaTareas, setListaTareas] = useState(JSON.parse(localStorage.getItem(props.id)) || []);
  const [detallesTarea, setDetallesTarea] = useState("");
  const [eliminarTarea, setEliminarTarea] = useState(null);

  const inputAgregarEditarContainer = useRef();

  useEffect(() => {

    if (!aceptarCancelar) return;

    if (editarAgregar == "editar") {
      if (inputEditarAgregarValue != "") {
        props.setActualizarNombre([{ nombre: inputEditarAgregarValue, id: props.id }])
        setNombreTabla(inputEditarAgregarValue);
      }
    }
    if (editarAgregar == "agregar") {
      if (inputEditarAgregarValue != "") {
        let newLista = [...listaTareas, { tarea: inputEditarAgregarValue, detalles: JSON.parse(localStorage.getItem(props.detalles)) || "", id: Date.now() }];
        setListaTareas(newLista);
      }
    }
    setAceptarCancelar(null);

  }, [aceptarCancelar]);


  useEffect(() => {
    setNombreTabla(props.nombre);
  }, []);

  useEffect(() => {
    if (editarAgregar == "editar") {
      setInputEditarAgregarValue('');
      setPlaceholder("Editar nombre");
    }
    if (editarAgregar == "agregar") {
      setInputEditarAgregarValue('');
      setPlaceholder("Nueva tarea");
    }
  }, [editarAgregar]);

  useEffect(() => {
    if (visibilidad) {
      inputAgregarEditarContainer.current.classList.add("active");
      setInputEditarAgregarValue('');
    }
    if (!visibilidad) {
      inputAgregarEditarContainer.current.classList.remove("active");
      setInputEditarAgregarValue('');
    }
  }, [visibilidad]);

  useEffect(() => {

    localStorage.setItem(props.id, JSON.stringify(listaTareas));

  }, [listaTareas])

  useEffect(() => {

    for(let i = 0; i < listaTareas.length; i++){
      if(listaTareas[i].id == detallesTarea.id){
        listaTareas[i].detalles = detallesTarea.detalles;
      }
    }
    localStorage.setItem(props.id, JSON.stringify(listaTareas));

  }, [detallesTarea]);

  useEffect(() => {

    if(eliminarTarea != null){
      for(let i = 0; i < listaTareas.length; i++){
        if(listaTareas[i].id == eliminarTarea){
          let nuevaLista = listaTareas.filter(el => el.id != eliminarTarea);
          setListaTareas(nuevaLista);
        }
      }
    }

  }, [eliminarTarea])


  return (
    <>
      <div className={`tabla ${props.color}`}>
        <button className='eliminar-tabla'><i className="bi bi-x-circle-fill" onClick={() => { props.setEliminarTabla(props.id) }}></i></button>

        <div className="titulo">

          <div className="titulo-botones">
            <p>{nombreTabla}</p>
            <div className="icons-container">
              <span className='boton-editar-nombre'><i className="bi bi-pencil-square" onClick={(e) => { setEditarAgregar("editar"); setVisibilidad(true) }}></i></span>
              <span className='boton-agregar-tarea'><i className="bi bi-file-earmark-plus" onClick={(e) => { setEditarAgregar("agregar"); setVisibilidad(true) }}></i></span>
            </div>
          </div>

          <form ref={inputAgregarEditarContainer} className='container-editar-agregar' onSubmit={(e) => { e.preventDefault(); setVisibilidad(false); setAceptarCancelar(true) }}>
            <input className='input-editar-agregar' name='agregar-editar' value={inputEditarAgregarValue} placeholder={placeholder} type="text" onChange={(e) => { setInputEditarAgregarValue(e.target.value) }} />
            <div className="icons-container-editar-agregar">
              <i className="bi bi-check-circle-fill" onClick={(e) => { setVisibilidad(false); setAceptarCancelar(true) }}></i>
              <i className="bi bi-x-circle-fill" onClick={(e) => { setVisibilidad(false); setInputEditarAgregarValue('') }}></i>
            </div>
          </form>

        </div>

        <ReactSortable
          className='contenedor-items'
          ghostClass='ghostClass'
          handle='.bi-grip-vertical'
          swapThreshold={0.1}
          group="TodoList"
          list={listaTareas}
          setList={setListaTareas}
          animation={400}
          delay={4}
        >
          {listaTareas.map(el => <Item key={el.id} id={el.id} tarea={el.tarea} detalles={el.detalles} setDetallesTarea={setDetallesTarea} setEliminarTarea={setEliminarTarea}/>)}
        </ReactSortable>
      </div>
    </>
  )
}
