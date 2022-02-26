import "./howWorks.css";

export default function Howworks() {
  return (
    <div className="howworks">
      <div className="content">
        <div className="textTitle" style={{ color: "#444" }}>
          ES MUY FÁCIL USARLO..
        </div>
        <div className="textContent">
          <ul>
            <li>
              <strong style={{ color: "lightcoral", fontSize: "18px" }}>
                Paso 1
              </strong>
              <p> Regístrate</p>
            </li>
            <li>
              <strong style={{ color: "lightcoral", fontSize: "18px" }}>
                Paso 2
              </strong>
              <p>
                {" "}
                Haz dobleclick en cualquier lugar que te interese calificar.
              </p>
            </li>
            <li>
              <strong style={{ color: "lightcoral", fontSize: "18px" }}>
                Paso 3
              </strong>
              <p> Deja tu reseña para que otros la puedan ver.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
