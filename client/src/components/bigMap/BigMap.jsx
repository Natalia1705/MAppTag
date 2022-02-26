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

  const [previewSource, setPreviewSource] = useState("");

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
    const newPin = new FormData();
    newPin.append("username", currentUser);
    newPin.append("title", title);
    newPin.append("desc", desc);
    newPin.append("rating", rating);
    newPin.append("lat", newPlace.lat);
    newPin.append("long", newPlace.long);

    if (img) {
      newPin.append("file", img);
    }

    try {
      console.log("nuevo pin", newPin);
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setImg(file);
  };
  console.log(pins);
  return (
    <Map
      initialViewState={{
        longitude: -99.14068205412232,
        latitude: 19.436089566049674,
        zoom: 14,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onDblClick={currentUser && handleAddClick}
    >
      {pins.map((p) => (
        <>
          <Marker key={p._id} longitude={p.long} latitude={p.lat}>
            <RoomIcon
              style={{
                fontSize: "50px",
                color: p.username === currentUser ? "lightcoral" : "teal",
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
                <div className="imagen">
                  <img
                    className="imagenImg"
                    src={p.img}
                    alt=""
                    style={{ height: "140px", width: "250px" }}
                  />
                </div>

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
              <div class="content-select">
                <div className="rating">
                  <label>Calificación</label>

                  <select
                    className="content-select"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="file-select">
                  <label>Sube una imágen</label>
                  <input
                    type="file"
                    id="fileInput"
                    autoFocus
                    className="custom-file-upload"
                    onChange={handleFile}
                  />
                </div>
              </div>
              <div className="preview">
                {previewSource && <img src={previewSource} alt="img" />}
              </div>
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
