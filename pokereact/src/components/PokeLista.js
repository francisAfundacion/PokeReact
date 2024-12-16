import axios from "axios"
import { useEffect, useState } from "react";
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
    useEffect( () => {
        axios.get("https://pokeapi.co/api/v2/pokemon").then (response =>  {
            //console.log(response.data)
            setPokemons(response.data.results);
        });
    }, [])
    return <>
    <h1>LISTA</h1>
    {pokemons.map(pokemon  => <p>Bó Nadal</p>)} 
    </>
}
export default PokeLista