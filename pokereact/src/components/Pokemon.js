import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const Pokemon = (props) => {
    const [nivel, setNivel] = useState(1);

    const [nombre, setNombre] = useState("");

    const [imgFrontUrl, setImageFrontUrl] = useState ();

    const [imgBackUrl, setImageBackUrl] = useState ();

    const [baseHP, setBaseHP] = useState ();

    const [baseAttack, setBaseAttack] = useState ();

    const [baseDefense, setBaseDefense] = useState ();

    //FORMA ACCEDER PARTES VARIABLES DE LA URL
    const params = useParams();

    //Cambia estado => redenderiza componente y  lanza efectos
    //COMO CORTA EL BUCLE INFINITO => CAMBIA_ESTADO => REDENDERIZA => SE LANZAN EFECTOS => IMP
    //SOLUCIONAMOS AÑADIENDO UN PARÁMETRO, DE MODO QUE EL EFECTO SE EJECUTA SI
    //SIEMPRE SE EJECUTA UNA VEZ AL INICIO Y SE CAMBIA ALGUNO DE LOS ESTADOS Y SE REPINTA , ENTONCES
    // SE RELANZA
    //efectos fase posterior redenderizado
    // [] => PARA ROMPER EL BUCLE INFINITO

    useEffect(() => { //declarar un efecto, se ejecuta después del redenrizado
          //la sintaxis mas modernilla es async-await
    //.then() => es un método que invoco sobre el .get
    //funcion del then, es la respuesta
    //then sucede cuando hayamos extraido la info
    axios.get("https://pokeapi.co/api/v2/pokemon/" + ID)
    .then( response => {
        console.log(response);//devuelve objeto
        //response.data => es el cuerpo de la respuesta
        //console.log(response.data.name) //bulbasur
        //si console.log algo que no existe => undefined
        setNombre(response.data.name);
        setImageBackUrl(response.data.sprites.back_default);
        setImageFrontUrl(response.data.sprites.front_default);

        //paso nombre y array a getStat, si el array stats es de longitud 0, es decir
        //no existe determinado atributo , devolvemos -1, sino la primera posicion de stats
        setBaseHP (getStat("hp",response.data.stats));
        setBaseAttack (getStat("attack",response.data.stats));
        setBaseDefense (getStat("defense",response.data.stats));
    })

    }, []);
    //siempre que cambia nivel se repinta y se lanza el efecto y si cambia algunos de los otros, el efecto
    //no tiene lugar si cambia BaseHP
    //EL ARRAY SI CAMBIA, DEBE DE ACTIVAR OTRO EFECTO
    //
    // [] => para romper el bucle infinito
    // [] => indica que no hay dependencias, por lo que se 
    

    const ID = params.id;


    function getStat (nombreStat, arrayStats) {
        const filtered_array = arrayStats.filter(s => s.stat.name === nombreStat)
        if (filtered_array.length === 0) {
            return -1
        }
        return filtered_array[0].base_stat;
    }

  

    const onSubirNivel = (event) => { // on cuando suceda esto, buenas prácticas para nombres de f
        setNivel(nivel_antiguo => nivel_antiguo + 1)
    }
    const onBajarNivel = (event) => { // on cuando suceda esto, buenas prácticas para nombres de f
        setNivel(nivel_antiguo => nivel_antiguo - 1)
    }

    const calcularHP  = () => {
        //TODO: USAR LA FÓRMULA REAL
        //This one is made up
        return baseHP + nivel * 3;
    }
    
    const calcularAtaque = ()  => {
        return baseAttack + (nivel * 2)
    }

    const calcularDefensa = ()  => {
        return baseDefense + (nivel * 2)
    }

    return <div>
        <img src = {imgFrontUrl}/>
        <img src = {imgBackUrl}/>
        <h1>{nombre}</h1>
        <p>Nivel: {nivel} </p>
        <button onClick = {onSubirNivel}>Subir nivel</button>
        <button onClick = {onBajarNivel}>Bajar nivel</button>
        <p>HP: { calcularHP() }</p>
        <p>Ataque: { calcularAtaque() } </p>
        <p>Defensa: { calcularDefensa() } </p>
    </div>
}
export default Pokemon

/*
calcular_stat (tipo) {
    switch (tipo) {
        case 0:
            nuevo_stat  =  65 + nivel * 3;
        break;
        case 1:
            nuevo_stat = 130 + nivel * 2
        break;
        case 2:
            nuevo_stat = 60 + nivel * 2
    }
return stat
}

*/