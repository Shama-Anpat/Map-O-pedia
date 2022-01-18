import ReactMapGL from "react-map-gl";
import { useState } from "react";

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 19.7515,
    longitude: 75.7139,
    zoom: 4,
  });
  return (
    <div className="MapContainer" style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        width="100%"
        height="100%"
        transitionDuration="100"
        mapStyle="mapbox://styles/shamaanpat/ckwnqmwfw0uvr15jq6wpbnith"
        onViewportChange={(viewport) => setViewport(viewport)}
      ></ReactMapGL>
    </div>
  );
}
export default Map;

// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import { useEffect, useState } from "react";
// import Select from "react-select";
// import axios from "axios";
// import { GiPineTree, GiMountainRoad } from "react-icons/gi";
// import { FaFortAwesome } from "react-icons/fa";
// import "../Map/Map.css";
// // import Slider from 'react-touch-drag-slider';
// // import {Images} from "./Images";
// // import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
// // import 'react-circular-progressbar/dist/styles.css';

// function Map() {
//   const myStorage = window.localStorage;
//   const [currentUsername, setCurrentUsername] = useState(
//     myStorage.getItem("user")
//   );
//   const [pins, setPins] = useState([]);
//   const [currentPlaceId, setCurrentPlaceId] = useState(null);
//   const [newPlace, setNewPlace] = useState(null);
//   const [title, setTitle] = useState(null);
//   const [desc, setDesc] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);

//   const [viewport, setViewport] = useState({
//     latitude: 19.7515,
//     longitude: 75.7139,
//     zoom: 4,
//   });

//   const data = [
//     {
//       value: 1,
//       text: "tree",
//       icon: (
//         <GiPineTree
//           style={{
//             fontSize: viewport.zoom * 10,
//             color: "green",
//             cursor: "pointer",
//           }}
//         ></GiPineTree>
//       ),
//     },
//     {
//       value: 2,
//       text: "mountain",
//       icon: (
//         <GiMountainRoad
//           style={{
//             fontSize: viewport.zoom * 10,
//             color: "brown",
//             cursor: "pointer",
//           }}
//         ></GiMountainRoad>
//       ),
//     },
//     {
//       value: 3,
//       text: "fort",
//       icon: (
//         <FaFortAwesome
//           style={{
//             fontSize: viewport.zoom * 10,
//             color: "red",
//             cursor: "pointer",
//           }}
//         ></FaFortAwesome>
//       ),
//     },
//   ];

//   const [showRegister, setShowRegister] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   const handleMarkerClick = (id, lat, long) => {
//     setCurrentPlaceId(id);
//     setViewport({ ...viewport, latitude: lat, longitude: long });
//   };

//   const handleAddClick = (e) => {
//     e.preventDefault();
//     const [longitude, latitude] = e.lngLat;
//     setNewPlace({
//       lat: latitude,
//       long: longitude,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newPin = {
//       username: currentUsername,
//       title,
//       desc,
//       id: newPlace._id,
//       lat: newPlace.lat,
//       long: newPlace.long,
//       type: selectedOption.text,
//     };

//     const res = async () => {
//       await axios
//         .post("http://localhost:3031/pins", newPin)
//         .then((response) => setPins([...pins, response.data.data]))
//         .catch((error) => console.log(error))
//         .finally(setNewPlace(null));
//     };
//     res();
//   };

//   useEffect(() => {
//     const getPins = async () => {
//       await axios
//         .get("http://localhost:3031/pins")
//         .then((allPins) => setPins(allPins.data.data))
//         .catch((error) => console.log(error));
//     };
//     getPins();
//   });

//   const handleLogout = () => {
//     setCurrentUsername(null);
//     myStorage.removeItem("user");
//   };

//   const handelEditPins = () => {};

//   const handelEditProfile = () => {};

//   const handleChange = (e) => {
//     setSelectedOption(e);
//   };

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <ReactMapGL
//         {...viewport}
//         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
//         width="100%"
//         height="100%"
//         transitionDuration="100"
//         mapStyle="mapbox://styles/shamaanpat/ckwnqmwfw0uvr15jq6wpbnith"
//         onViewportChange={(viewport) => setViewport(viewport)}
//         onDblClick={currentUsername && handleAddClick}
//       >
//         {pins.map((p) => (
//           <>
//             <Marker
//               latitude={p.lat}
//               longitude={p.long}
//               offsetLeft={-3.5 * viewport.zoom}
//               offsetTop={-7 * viewport.zoom}
//             >
//               {p.type === "tree" ? (
//                 <GiPineTree
//                   style={{
//                     fontSize: viewport.zoom * 10,
//                     color: "green",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
//                 />
//               ) : p.type === "mountain" ? (
//                 <GiMountainRoad
//                   style={{
//                     fontSize: viewport.zoom * 10,
//                     color: "brown",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
//                 />
//               ) : p.type === "fort" ? (
//                 <FaFortAwesome
//                   style={{
//                     fontSize: viewport.zoom * 10,
//                     color: "red",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
//                 />
//               ) : (
//                 ""
//               )}
//             </Marker>
//             {p._id === currentPlaceId && (
//               <Popup
//                 key={p._id}
//                 latitude={p.lat}
//                 longitude={p.long}
//                 closeButton={true}
//                 closeOnClick={false}
//                 onClose={() => setCurrentPlaceId(null)}
//                 anchor="left"
//               >
//                 <form>
//                   <label>Place</label>
//                   <h4 className="place">{p.title}</h4>
//                   <label>Information</label>
//                   <p className="desc">{p.desc}</p>
//                   <label>who created?</label>
//                   <span className="username">
//                     Created by <b>{p.username}</b>
//                   </span>
//                   {/* <span className="date">
//                     <TimeAgo
//                       datetime={
//                         p.createdAt.substr(0, 10) +
//                         " " +
//                         p.createdAt.substr(11, 19)
//                       }
//                     />
//                   </span> */}
//                   {/* <Slider
//                       onSlideComplete={(i) => {
//                         console.log('finished dragging, current slide is', i)
//                       }}
//                       onSlideStart={(i) => {
//                         console.log('started dragging on slide', i)
//                       }}
//                       activeIndex={0}
//                       threshHold={100}
//                       transition={0.5}
//                       scaleOnDrag={true}
//                     >
//                       {Images.files.map((file, index) =>
//                         <img src={`http://localhost:3031/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
//                       )}
//                   </Slider> */}
//                 </form>
//               </Popup>
//             )}
//           </>
//         ))}
//         {newPlace && (
//           <>
//             <Popup
//               id={newPlace._id}
//               latitude={newPlace.lat}
//               longitude={newPlace.long}
//               closeButton={true}
//               closeOnClick={false}
//               onClose={() => setNewPlace(null)}
//               anchor="left"
//             >
//               <div>
//                 <form onSubmit={handleSubmit}>
//                   <label>Title</label>
//                   <input
//                     placeholder="Enter a title"
//                     autoFocus
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                   <label>Description</label>
//                   <textarea
//                     placeholder="Say us something about this place."
//                     onChange={(e) => setDesc(e.target.value)}
//                   />
//                   <Select
//                     placeholder="Select Option"
//                     options={data}
//                     onChange={handleChange}
//                     getOptionLabel={(e) => (
//                       <div style={{ display: "flex", alignItems: "center" }}>
//                         {e.icon}
//                         <span style={{ marginLeft: 5 }}>{e.text}</span>
//                       </div>
//                     )}
//                   />

//                   <button type="submit" className="submitButton">
//                     Add Pin
//                   </button>
//                 </form>
//               </div>
//             </Popup>
//           </>
//         )}
//         {/* {currentUsername ? (
//           <div className="buttonss">
//             <button className="button logout" onClick={handleLogout}>
//               Log out
//             </button>
//             <button className="button profile" onClick={handelEditProfile}>
//               Edit Profile
//             </button>
//             <button className="button pins" onClick={handelEditPins}>
//               Edit Pins
//             </button>
//           </div>
//         ) : (
//           <div className="buttons">
//             <button className="button login" onClick={() => setShowLogin(true)}>
//               Log in
//             </button>
//             <button
//               className="button register"
//               onClick={() => setShowRegister(true)}
//             >
//               Register
//             </button>
//           </div>
//         )}
//         {showRegister && <Register setShowRegister={setShowRegister} />}
//         {showLogin && (
//           <Login
//             setShowLogin={setShowLogin}
//             setCurrentUsername={setCurrentUsername}
//             myStorage={myStorage}
//           />
//         )} */}
//       </ReactMapGL>
//     </div>
//   );
// }

// export default Map;
