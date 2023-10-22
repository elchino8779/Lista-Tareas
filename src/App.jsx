import React, { useState } from 'react';
import './App.scss'
import { AgregarTabla } from './components/agregar-tabla/AgregarTabla'
import { ContenedorTablas } from './components/contenedor-tablas/ContenedorTablas'
import { Titulo } from './components/titulo/Titulo'

function App() {

  const [nombreTabla, setNombreTabla] = useState("");

  const nombreIngresado = (nombre) => {
    if (nombre != "") setNombreTabla(nombre);
  }


  return (
    <> <Titulo />
      <AgregarTabla nombreIngresado={nombreIngresado} />
      <ContenedorTablas nombreTabla={nombreTabla} setNombreTabla={setNombreTabla} />
    </>
  )
}

export default App
