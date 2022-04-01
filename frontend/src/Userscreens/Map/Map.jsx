import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { GiPineTree, GiMountainRoad, FaFortAwesome } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { getPin, clearErrors } from "../../actions/pinsActions";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAlert } from "react-alert";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./Map.css";
import tree from "../../Icons/park.png";
import mountain from "../../Icons/mountain.png";
import fort from "../../Icons/red-fort.png";
import forest from "../../Icons/jungle.png";

function Map({ history }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const { loading, error, pins } = useSelector((state) => state.pins);

  const [viewport, setViewport] = useState({
    latitude: 19.7515,
    longitude: 75.7139,
    zoom: 4,
  });

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getPin([]));
  }, [dispatch, error, history, alert]);

  return (
    <div className="MapContainer" style={{ height: "100vh", width: "100%" }}>
      <>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          width="100%"
          height="100%"
          transitionDuration="100"
          mapStyle="mapbox://styles/shamaanpat/ckwnqmwfw0uvr15jq6wpbnith"
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}

          {pins &&
            pins.map((p) => (
              <>
                <Marker
                  key={p._id}
                  latitude={p.lat}
                  longitude={p.long}
                  offsetLeft={-3.5 * viewport.zoom}
                  offsetTop={-7 * viewport.zoom}
                >
                  {p.type === "tree" ? (
                    <img
                      src={tree}
                      alt="tree"
                      style={{
                        height: "45px",
                        width: "45px",
                        fontSize: viewport.zoom * 10,
                        cursor: "pointer",
                        position: "absolute",
                      }}
                      onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                    />
                  ) : p.type === "mountain" ? (
                    <img
                      src={mountain}
                      alt="mountain"
                      style={{
                        height: "65px",
                        width: "65px",
                        fontSize: viewport.zoom * 10,
                        cursor: "pointer",
                        position: "absolute",
                        display: "flex",
                      }}
                      onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                    />
                  ) : p.type === "fort" ? (
                    <img
                      src={fort}
                      alt="fort"
                      style={{
                        height: "45px",
                        width: "45px",
                        fontSize: viewport.zoom * 10,
                        cursor: "pointer",
                        position: "absolute",
                      }}
                      onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                    />
                  ) : p.type === "temple" ? (
                    <img
                      src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-temple-india-icongeek26-linear-colour-icongeek26.png"
                      alt="temple"
                      style={{
                        height: "45px",
                        width: "45px",
                        fontSize: viewport.zoom * 10,
                        cursor: "pointer",
                      }}
                      onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                    />
                  ) : p.type === "forest" ? (
                    <img
                      src={forest}
                      alt="forest"
                      style={{
                        height: "45px",
                        width: "45px",
                        fontSize: viewport.zoom * 10,
                        cursor: "pointer",
                      }}
                      onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                    />
                  ) : (
                    ""
                  )}
                </Marker>
                {p._id === currentPlaceId && (
                  <Popup
                    latitude={p.lat}
                    longitude={p.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                    anchor="left"
                    backgroundColor={"#c1deae"}
                  >
                    <form>
                      <label>Place</label>
                      <h4 className="place">{p.place}</h4>
                      <label>Description</label>
                      <br></br>
                      <p className="desc">{p.desc}</p>
                      <br></br>
                      <label>
                        Created by <br></br>
                      </label>
                      <br></br>
                      <span className="username">~{p.username}</span>
                      <br></br>
                      <label>
                        Created On :<br></br>
                      </label>
                      <br></br>
                      <span className="date">{p.createdAt.substr(0, 10)}</span>
                      <p className="viewmore">
                        <br></br>
                        <Link
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "20px",
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "#FFFDDE",
                          }}
                          to={`/pindetails/${p._id}`}
                        >
                          <b>
                            {" "}
                            <i>View More</i>
                          </b>
                        </Link>
                      </p>
                    </form>
                  </Popup>
                )}
              </>
            ))}
        </ReactMapGL>
      </>
    </div>
  );
}
export default Map;
