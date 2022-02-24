/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { Context } from "../../context/Context";
// import { format } from "timeago.js";
import "./bigMap.css";

function BigMap() {
  const { user } = useContext(Context);
  const currentUser = user ? user.username : null;
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    console.log(e);
    const { lat, lng: long } = e.lngLat;
    setNewPlace({ lat, long });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
      img,
    };
    try {
      console.log(newPin);
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Map
      initialViewState={{
        longitude: -99.1269,
        latitude: 19.4978,
        zoom: 14,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onDblClick={currentUser && handleAddClick}
    >
      65
      {pins.map((p) => (
        <>
          <Marker key={p._id} longitude={p.long} latitude={p.lat}>
            <RoomIcon
              style={{
                fontSize: "50px",
                color: p.username === currentUser ? "purple" : "blue",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup longitude={p.long} latitude={p.lat} anchor="left">
              <div className="card">
                <label>Lugar</label>
                <h4 className="place">{p.title}</h4>
                <label>Opinión</label>
                <p className="desc">{p.desc}</p>
                <label>Calificación</label>
                <div className="starts">
                  {Array(p.rating).fill(<StarIcon className="star" />)}
                </div>
                <label>Autor </label>
                <span className="username">
                  Escrito por <b>{p.username}</b>
                </span>
                {/* <span className="date">{format(p.createdAt)}</span> */}
              </div>
            </Popup>
          )}
        </>
      ))}
      {newPlace && (
        <Popup latitude={newPlace.lat} longitude={newPlace.long} anchor="left">
          <div>
            <form onSubmit={handleSubmit}>
              <label>Titulo</label>
              <input
                placeholder="Titulo"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Descripción</label>
              <textarea
                placeholder="Di algo some el lugar."
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>Calificación</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <input
                type="file"
                autoFocus
                className="imgButton"
                onChange={(e) => setImg(e.target.files[0].name)}
              />
              <button type="submit" className="submitButton">
                Agregar lugar
              </button>
            </form>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default BigMap;
