import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const PokeLista = (props) => {
    /*lista pokemon, clickar sobre uno y mostrar detalles del mismo*/
    // va devolviendo en una cantidad concreta de pokemons
    //https://pokeapi.co/api/v2/pokemon => url de la api para consultar lista pokemons
    //Devuelve 1 json lista
    /*
    {clave:valor} => denota objeto
    [] => significa lista, sucesión de elementos, NO HAY CLAVE-VALOR
     EL DE HOY NOS DEVUELVE UNA LISTA JSON [{} ,{} ...]
    */
   //next => para consultar la siguiente página
    //results => lista json
    //count => n total de pokemons
    //UseEffect
    //Evitar bucle infinito de peticiones? USAR USEEFFECT
    //Si cambia un estado(1), se redenderize(2) y luego se lanzan efectos(3).
    //Los efecctos se especifican con useEffect
    //sintaxis
    //  useEffect(función parámetro , se ejecuta como un parámetro)



    const [pokemons, setPokemons] = useState ([]) // array vacio, pq será lista json a futuro
    const navigate = useNavigate();
    useEffect( () => {
        axios.get("https://pokeapi.co/api/v2/pokemon").then (response =>  {
            //console.log(response.data)
            setPokemons(response.data.results);
        });
    }, [])

    const  funcionNavegarASnivy = () => {
        navigate("/pokemon/495");
    }
    return <>
    <h1>LISTA</h1>
    <button onClick = {funcionNavegarASnivy}>Navegar a Snivy</button>
    <Link to= "/pokemon/25">ir a pikachu</Link>
    {pokemons.map(pokemon  => {
        return <><p>
            Este pokemon es {pokemon.name} 
        </p>
        <div  onClick = {() => {navigate("/pokemon/" + pokemon.name)}}>Navegar</div>
        <Link to={"pokemon/" + pokemon.name}>Navegar</Link>
        </>
    })}

    </>
}
export default PokeLista

/*
no queremos que  enlaces href , provoca que se vuelva  a descargar el contenido a presentar,
por ello deberemos emplear link, para evitar enviar una petición al setvidor
componente de la libreria react-router-dom

ALTERNATIVA  A LINK => useNavigate , sirve para navegar a una página sin recargar con una petición,
pero en vez de usar une etiqueta , sería con con una función
NECESITA LIBRERÍA Navigate de react-router-dom
Navigate importante, en lugares dónde recibimos respuestas del servidor.

cuando la ruta en navigate("/navigate/495") ) => ruta absoluta

Navigate SINÓNIMO DE LINK

PARA NAVEGAR PONIENDO NOMBRE POKEMON
*/