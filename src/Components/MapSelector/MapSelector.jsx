import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "./MapSelector.css";
import React, { useState, useEffect } from "react";
import { fetchCountries, fetchCountryNameByLatLong } from "../../api";
 
const MapSelector = ({ handleCountryChange }) => {
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };
 
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setFetchedCountries]);
 
  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const name = country;
    const confirmedText = '100';
    layer.bindPopup(`${name} ${confirmedText}`);
    console.log("country name:" + name);
    handleCountryChange(name);
  };
 
  function MyComponent() {
    const map = useMapEvents({
      click: () => {
        map.locate()
      },
      locationfound: (location) => {
        console.log('location found:', location)
        //var countryName = fetchCountryNameByLatLong(location.latlng.lat, location.latlng.lng);
        //console.log("country name: " + countryName)
      },
    })
    return null
  }
 
  return (
        <div style={{width: "100%"}}>
            <MapContainer style={{ width: "100%", height: "90vh" }} zoom={2} center={[20, 60]}>
                  <MyComponent /> 
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                <GeoJSON
                    style={mapStyle}
                    data={fetchedCountries}
                    onEachFeature={onEachCountry}
                />        
            </MapContainer>
        </div>
 
  );
};
 
export default MapSelector;
