import { useState,useRef, useEffect } from 'react';

export const ScrollInfinite = () => {
  //variables de estado
  const [data, setdata] = useState([])  
  const [hasMore, sethasMore] = useState(true)  
  const [offset, setoffset] = useState(0)  

  //Falta hacer la referencia a un elemento en concreto
  const elementRef = useRef(null);

  useEffect(() => {
    //va a recibir una collback en donde recibira un array de entradas
    const observer = new IntersectionObserver(OnIntersection);
    console.log('creando el intersection observer');
    if(observer && elementRef.current) observer.observe(elementRef.current);
    return () => {
      if(observer) observer.disconnect();
    }
  },[data])

  //recibe un array con una sola posicion dependiendo de los elementos observados
  const OnIntersection = async (entries) =>{
    const firstEntry = entries[0];
    //si la entrada esta siendo intersectada con el parametro
    if(firstEntry.isIntersecting && hasMore){
          await getData(offset);
    }
  }
  
    //funcion para realizar la peticion
    const getData = async (cantPoke) =>{
      try{    
          const res = await fetch(`https://pokeapi.co/api/v2/ability/?limit=20&offset=${cantPoke}`)
          const datajson = await res.json();
          console.log('cargando pokemones');
          console.log(datajson);
          if(datajson.results.length === 0){
            sethasMore(false)
          }else{
            setdata((data) => [...data,...datajson.results]);
            setoffset((offset)=>offset + 20);
          }
      }catch(error){
          console.log(error)
      }
    }

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
        {
          hasMore && <p ref={elementRef} className='text-secondary text-uppercase p-2'>Cargando pokemones .....</p>
        }
    </div>
  )
}
