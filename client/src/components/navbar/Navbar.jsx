import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon">
          <img
            src="https://media.istockphoto.com/vectors/worldwide-icon-vector-sign-and-symbol-isolated-on-white-background-vector-id1020322386?k=20&m=1020322386&s=612x612&w=0&h=Rm2nFurXdACk81WHwKiv_iaK1z2Mt7l1IPYNiSdb6R8="
            alt=""
            className="topIconImg"
          />
        </i>
        <Link className="link" to="/">
          <i className="topIconLetter">MAppTag</i>
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              MAP
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              COMO FUNCIONA
            </Link>
          </li>
          {user && (
            <li className="topListItem link" onClick={handleLogout}>
              SALIR
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {!user && (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTRO
              </Link>
            </li>
          </ul>
        )}
        {user && (
          <ul className="topList">
            <li
              className="topListItem link"
              style={{ marginTop: "14px", fontSize: "22px" }}
            >
              {`Hola! ${user.username}`}
            </li>
            <Link to={"/users"}>
              <AccountCircleIcon
                className="topIcon"
                style={{
                  color: "#fff",
                  height: "35px",
                  width: "35px",
                  marginTop: "7px",
                }}
              />
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
}
