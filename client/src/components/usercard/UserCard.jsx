import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import "./userCard.css";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    try {
      const res = await axios.put(`/users/${user._id}`, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  console.log(user);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`/users/${user._id}`, {
        data: { username: user.username },
      });
      console.log("delete");
      await dispatch({ type: "LOGOUT" });
      window.location.replace("/");
    } catch (err) {
      dispatch({ type: "DELETE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <span className="settingsUpdateTitle">Actualiza tu cuenta</span>
        <button
          className="settingsDeleteTitle"
          type="submit"
          onClick={handleDelete}
        >
          Borra tu cuenta
        </button>

        <form className="settingsForm" onSubmit={handleSubmit}>
          <div className="settingsPP">
            <AccountCircleIcon style={{ width: "120px", height: "120px" }} />
          </div>
          <label>Nombre</label>
          <input
            type="text"
            placeholder={user ? user.username : null}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user ? user.email : null}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Tu cuenta ha sido actualizada
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
