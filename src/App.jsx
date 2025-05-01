import { useState, useEffect } from "react"; //li uso per salvare i dati della risposta API

import { useRef } from "react";

export default function App() {

  const renderCount = useRef(0);  //solo per creare un counter per leggere il n° di render
  renderCount.current++;
  console.log("Render numero:", renderCount.current);


  const [Ps, setPs] = useState([]); //variabile in cui salvo i dati fetchati

  useEffect(() => { //effettua la chiamata API
    fetch('https://cors-anywhere.herokuapp.com/https://dragonball-api.com/api/characters')
      .then(res => res.json())
      .then(data => {
        console.log("Risposta completa:", data);
        setPs(data.items); //data è l'oggetto della risposta contenente una proprietà items contenente un array di oggetti che sto andando a mettere dentro setPS e di per sè andrà in Ps---> Ps=data.items!!!
      })
      .catch(error => console.error(error));
  }, []); //la dipendenza vuota è per far sì che la f useEffect con cui si esegue il fetch avvenga una volta sola


  return (
    <div>
      <h1>Lista dei personaggi</h1>
      <div className="PsCardContainer">
        {Ps.map(P => (
          <div className="Card" key={P.id}>

          //La key serve per collegare ogni elemento della lista a una specifica istanza del rendering nel DOM virtuale di React.
            La key è l’identificatore che React usa per dire:

            “Questo è ancora lo stesso elemento, quindi lo riuso.” ✅
            “Questo è un nuovo elemento, lo creo da zero.” ➕
            “Questo elemento è sparito, lo rimuovo.” ❌

            <img src={P.image} alt={P.name} />
            <h1>{P.name}</h1>
            <h2>{P.affiliation}</h2>
            <p>{P.race}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

