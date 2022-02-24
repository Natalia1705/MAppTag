import { useRef, useState } from "react";
import axios from "axios";
import "./register.css";

export default function Register() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/auth/register", newUser);
      setSuccess(true);
      setError(false);
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Registro</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Ingresa tu nombre..."
          ref={nameRef}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Ingresa tu email..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Ingresa tu password..."
          ref={passwordRef}
        />
        <button className="registerButton">Regístrate</button>
        {success && (
          <>
            <span className="success">Registro correcto ve a Login</span>
          </>
        )}
        {error && <span className="failure">Ocurrió un error</span>}
      </form>
    </div>
  );
}
