import "./howWorks.css";

export default function Howworks() {
  return (
    <div className="howworks">
      <div className="content">
        <div className="img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1061/1061219.png?w=740"
            alt=""
          />
        </div>
        <div className="text">
          <div className="textTitle">Es muy fácil usarlo..</div>
          <div className="textContent">
            <ul>
              <li>
                <strong style={{ color: "purple", fontSize: "20px" }}>
                  Paso 1
                </strong>
                <p> Regístrate</p>
              </li>
              <li>
                <strong style={{ color: "purple", fontSize: "20px" }}>
                  Paso 2
                </strong>
                <p> Haz click en cualquier lugar que te interese calificar</p>
              </li>
              <li>
                <strong style={{ color: "purple", fontSize: "20px" }}>
                  Paso 3
                </strong>
                <p> Deja tu reseña para que otros la puedan ver</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
