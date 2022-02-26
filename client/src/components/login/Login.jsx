import "./login.css";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const nameRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: nameRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <div className="contentForm">
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginTitle">LOGIN</div>
          <label>Nombre</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Ingresa tu nombre..."
            ref={nameRef}
          />
          <label>Contraseña</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Ingresa tu contraseña..."
            ref={passwordRef}
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            Login
          </button>
        </form>
        {/* <Link to="/register">
          <button className="loginRegisterButton">Register</button>
        </Link> */}
      </div>
    </div>
  );
}
