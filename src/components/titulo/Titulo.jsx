import React from 'react'
import './Titulo.scss'

export const Titulo = () => {
  return (
    <div className='titulo-principal'>
      <h1>Lista de tareas</h1>
      <div className="contenedor-enlaces">
        <a href="https://www.linkedin.com/in/andresgomez87/" target='_blank'><i className="bi bi-linkedin"></i></a>
        <a href="https://github.com/elchino8779" target='_blank'><i className="bi bi-github"></i></a>
      </div>
    </div>
  )
}
