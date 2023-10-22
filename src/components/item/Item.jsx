import React, { useState, useEffect } from 'react'
import './Item.scss'

export const Item = (props) => {

  const [detallesOtros, setDetallesOtros] = useState(props.detalles);


  return (
    <div className='item'>
      <i className="bi bi-grip-vertical"></i>
      <div className="contenedor-titulo-contenido">
        <p className='titulo-item'>{props.tarea}</p>
        <textarea
          className='text-area'
          name="text-area"
          value={detallesOtros}
          placeholder='Detalles'
          onChange={(e) => {
            setDetallesOtros(e.target.value);
            props.setDetallesTarea({ detalles: e.target.value, id: props.id })
          }
          }>
        </textarea>
      </div>
      <i className="bi bi-x-circle-fill" onClick={(e) => props.setEliminarTarea(props.id)}></i>
    </div>
  )
}
