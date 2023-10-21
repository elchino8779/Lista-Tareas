import React, {useState, useEffect} from 'react';
import './App.scss'
import { AgregarTabla } from './components/agregar-tabla/AgregarTabla'
import { ContenedorTablas } from './components/contenedor-tablas/ContenedorTablas'

function App() {

  const [nombreTabla, setNombreTabla] = useState("");

  const nombreIngresado = (nombre) => {
    if(nombre != "") setNombreTabla(nombre);
  }


  return (
    <>
      <AgregarTabla nombreIngresado={nombreIngresado}/>
      <ContenedorTablas nombreTabla={nombreTabla} setNombreTabla={setNombreTabla} />
    </>
  )
}

export default App
