import { useState,useRef, useEffect } from 'react';

export const ScrollInfinite = () => {
  //variables de estado
  const [data, setdata] = useState([])  
  const [hasMore, sethasMore] = useState(false)  
  const [offset, setoffset] = useState(0)  

  //Crear un UseRef
  const elementRef = useRef(null);
  
  
  //funcion para realizar la peticion
  const getData = async (cantPoke) =>{
    try{    
        const res = await fetch(`https://pokeapi.co/api/v2/ability/?limit=20&offset=${cantPoke}`)
        const datajson = res.json();
        console.log(datajson)
    }catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
     getData(offset);
  },[data])
  
  return (
    <div className='container text-center'>
        <h3 className='text-primary text-uppercase'>Lista de pokemones</h3>
        <ul className='list-group' style={{width:'350px'}}>
            {
                data.map((elemento, index)=>
                <li key={index} className='list-group-item mt-2 text-uppercase'>
                    <b>{elemento.name}</b>
                </li>)
            }
        </ul>
    </div>
  )
}
