import { useCallback, useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import {
  MapContainer,
  CircleMarker,
  Popup,
  TileLayer,
  useMap,
  Tooltip,
  MapContainerProps,
} from "react-leaflet";
import { Map } from "leaflet";
import "./App.css";
import { useGetAVAXLocationData } from "./hooks/useGetAVAXLocationData";
import { useGetLatLngs } from "./hooks/useGetLatLng";
import { geocodedLocations } from "./data/geocodedLocations";
import { colours } from "./utils/colours";
import { TooltipBody } from "./components/Tooltip";
import NavBar from "./components/NavBar";

function App() {
  const [hovered, setHovered] = useState(0);
  //   useGetAVAXLocationData()
  //   useGetLatLngs()

  const [map, setMap] = useState<Map | null>(null);
  const [position, setPosition] = useState(() => map?.getCenter());

  const onMove = useCallback(() => {
    setPosition(map?.getCenter());
  }, [map]);

  useEffect(() => {
    if (map) {
      console.log("🚀 ~ file: App.tsx ~ line 31 ~ App ~ map", map);
      map.on("move", onMove);
      console.log("🚀 ~ file: App.tsx ~ line 43 ~ App ~ position", position);
      return () => {
        map.off("move", onMove);
      };
    }
  }, [map, onMove, position]);

  const displayMap = useMemo(
    () => (
      <MapContainer
        id="map"
        center={[51.505, -0.09]}
        zoom={3}
        scrollWheelZoom={true}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=yvLAAkYlosQZA8ZfuvYos73xcsIp6kiId0Qef1phrlXNclBdLh1lOVUYI3nMkBvj"
        />
        {geocodedLocations.map((location, i) => {
          return (
            <CircleMarker
              center={[+location.latLon.lat, +location.latLon.lon]}
              radius={
                +location.stake.networkShare > 0.025
                  ? location.stake.networkShare * 50
                  : 5
              }
              pathOptions={colours(geocodedLocations, i)}
            >
              <Tooltip>
                <TooltipBody location={location} />
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    ),
    []
  );

  return (
    <div className="wrapper">
      <NavBar map={map} />
      {displayMap}
    </div>
  );
}

export default App;
