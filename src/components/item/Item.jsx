import React, {useState} from 'react'
import './Item.scss'

export const Item = (props) => {

  return (
    <div className='item'>
      <i className="bi bi-grip-vertical"></i>
      <div className="contenedor-titulo-contenido">
        <p className='titulo-item'>{props.tarea}</p>
      </div>
      <i className="bi bi-trash"></i>
    </div>
  )
}
