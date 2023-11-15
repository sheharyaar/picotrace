import { useEffect, useState, useCallback, useRef } from "react";
import * as mqtt from "mqtt/dist/mqtt";
import "./pico.css";
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapGL, { Marker, Source, Layer } from "react-map-gl"; // Assuming you are using react-map-gl for Mapbox
import { NavigationControl } from "react-map-gl";
import DeviceCard from "./DeviceCard";

const PicoTrace = () => {
  const [client, setClient] = useState(null);
  const mapRef = useRef(null);
  const [pathGeoJSON, setGeoJSON] = useState(null);
  const [locations, setLocations] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 22.318,
    longitude: 87.299,
    zoom: 16,
  });

  const ACCESS_TOKEN =
    "pk.eyJ1Ijoic2hlaGFyeWFhciIsImEiOiJjbG9weTEzNmgwZTZvMmpwZWQzNm1wa2tvIn0.dVcL2IDNZ5C3z00n8uJwmA";

  // Function to update the path using the Mapbox Map Matching API
  const updatePath = useCallback(
    (newLocation) => {
      console.log("updatePath", newLocation);
      console.log("viewport", viewport);

      setLocations((prevLocations) => {
        // If this is the first location, simply add it
        console.log("prev-locations", prevLocations);

        if (prevLocations.length === 0) {
          return [newLocation];
        } else {
          // Otherwise, compute the new path
          const coordinates = prevLocations
            .map((loc) => `${loc.lon},${loc.lat}`)
            .join(";");
          const newCoordinates = `${coordinates};${newLocation.lon},${newLocation.lat}`;
          const radiuses = "25" + ";25".repeat(prevLocations.length);
          const url = `https://api.mapbox.com/matching/v5/mapbox/driving/${newCoordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${ACCESS_TOKEN}`;

          // Fetch the new path from Mapbox API
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data.matchings) {
                const matchedCoordinates = data.matchings.map(
                  (match) => match.geometry.coordinates
                );
                const newGeoJSON = {
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: matchedCoordinates.flat(),
                  },
                };

                setGeoJSON(newGeoJSON);
                setViewport({
                  latitude: newLocation.lat,
                  longitude: newLocation.lon,
                  zoom: viewport.zoom,
                });
              }
            })
            .catch((error) => console.error("Error:", error));

          // Add the new location to the state
          return [...prevLocations, newLocation];
        }
      });
    },
    [viewport]
  );

  useEffect(() => {
    if (client === null || client === undefined) {
      const options = {
        keepalive: 100,
      };
      const client = mqtt.connect("ws://localhost:8884", options);

      client.on("connect", () => {
        client.subscribe("ESP32", (err) => {
          if (!err) {
            console.log("Subscribed to ESP32");
          }
        });
      });

      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });

      const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours > 12 ? hours - 12 : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        const today = new Date();
        const yesterday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1
        );
        const dayString =
          date.getDate() === today.getDate()
            ? "Today"
            : date.getDate() === yesterday.getDate()
            ? "Yesterday"
            : `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        return `${formattedHours}:${formattedMinutes} ${ampm} ${dayString}`;
      };

      client.on("message", (topic, message) => {
        // message is Buffer
        console.log(topic.toString(), " : ", message.toString());
        const messageData = JSON.parse(message.toString());
        const now = new Date();
        const formattedTime = formatTime(now);

        updatePath({
          lat: messageData.lat,
          lon: messageData.lon,
          time: formattedTime,
        });
      });

      client.on("close", () => {
        console.log("Connection closed");
      });

      client.on("reconnect", () => {
        console.log("Reconnecting...");
      });

      client.on("disconnect", () => {
        console.log("Disconnected");
      });

      setClient(client);
    }
  }, [client, viewport, locations, updatePath]);

  return (
    <div className="w-full h-full relative" ref={mapRef}>
      <DeviceCard
        name="Adi's Cycle"
        image="/user.png"
        locations={locations.slice(-2)}
        deviceId="ESP32-001A"
        token={ACCESS_TOKEN}
      />
      <MapGL
        width="100%"
        height="100%"
        onViewportChange={(newViewport) => {
          console.log(`Viewport changed: `, newViewport);
          setViewport(newViewport);
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={ACCESS_TOKEN}
      >
        {/* Render path */}
        <Source id="my-data" type="geojson" data={pathGeoJSON}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "#5932EA",
              "line-width": 3,
            }}
          />
        </Source>
        {/* Render markers */}
        {locations &&
          locations.map((location, index) => (
            <Marker
              key={index}
              latitude={location.lat}
              longitude={location.lon}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor:
                    index === locations.length - 1 ? "green" : "blue",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Text inside the bubble */}
                {index + 1}
              </div>
            </Marker>
          ))}
        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <NavigationControl />
        </div>
      </MapGL>
    </div>
  );
};

export default PicoTrace;
