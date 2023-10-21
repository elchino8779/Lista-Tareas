import React, { useState, useRef, useEffect } from 'react'
import './AgregarTabla.scss'

export const AgregarTabla = ({nombreIngresado}) => {

  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  let containerInput = useRef();

  const cambiarVisibilidad = (e) => {
    e.preventDefault();
    (isVisible) ? setIsVisible(false) : setIsVisible(true);
  }

  useEffect(() => {
    if(isVisible){
      containerInput.current.classList.add("active");
    }
    else{
      containerInput.current.classList.remove("active");
      setInputValue('');
    }
  }, [isVisible]);

  return (
    <>
      <div className='container-agregar-lista'>
        <button className='boton' onClick={(e) => {cambiarVisibilidad(e)}}>
          <i className="bi bi-plus-circle"></i>
          <p>Agregar tabla</p>
        </button>
        <form ref={containerInput} className='container-inputs' >
          <input type="text" name='agregar-tabla' placeholder="Nombre de la tabla" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <div className="container-botones">
            <button className='aceptar' onClick={(e) => {cambiarVisibilidad(e); nombreIngresado(inputValue)}}>Aceptar</button>
            <button className='cancelar' onClick={(e) => {cambiarVisibilidad(e)}}>Cancelar</button>
          </div>
        </form>
      </div>
    </>
  )
}
