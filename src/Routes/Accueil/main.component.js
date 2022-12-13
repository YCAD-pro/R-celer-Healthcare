import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Accueil() {
  const [btn, setBtn] = useState(false);
  const pointerAccueil = useRef(null);
  useEffect(() => {
    pointerAccueil.current.classList.add("startingImg");
    setTimeout(() => {
      pointerAccueil.current.classList.remove("startingImg");
      setBtn(true);
    }, 500);
  }, []);

  const survolSourisGauche = () => {
    pointerAccueil.current.classList.add("leftImg");
  };

  const survolSourisDroite = () => {
    pointerAccueil.current.classList.add("rightImg");
  };

  const sortieSouris = () => {
    if (pointerAccueil.current.classList.contains("leftImg")) {
      pointerAccueil.current.classList.remove("leftImg");
    } else if (pointerAccueil.current.classList.contains("rightImg")) {
      pointerAccueil.current.classList.remove("rightImg");
    }
  };

  const displayBtn = btn && (
    <>
      <div
        className="leftBox"
        onMouseOver={survolSourisGauche}
        onMouseOut={sortieSouris}
      >
        <Link className="btn-welcome" to="/login">
          Connexion
        </Link>
      </div>
      <div
        className="rightBox"
        onMouseOver={survolSourisDroite}
        onMouseOut={sortieSouris}
      >
        <Link className="btn-welcome" to="/create">
          Inscription
        </Link>
      </div>
    </>
  );
  return (
    <main className="welcomePage" ref={pointerAccueil}>
      {displayBtn}
    </main>
  );
}

export default Accueil;
