"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Image from "next/image";
import MapPlaceholder from "./MapPlaceholder";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useTranslations } from "next-intl";

L.Icon.Default.mergeOptions({
  shadowUrl: "/markerShadow.png",
  iconRetinaUrl: "/markerIcon2x.png",
  iconUrl: "/markerIcon.png",
});

const Map = () => {
  const tMap = useTranslations("aboutUs.map");

  const markerData = [
    {
      cluster: 1,
      position: [46.578, 28.926],
      name: tMap("marker_selemet.name"),
      details: tMap("marker_selemet.details"),
      location: tMap("marker_selemet.location"),
      sector: tMap("marker_selemet.sector"),
      foj: tMap("marker_selemet.foj"),
      image: "/breaker_image.png",
    },
    {
      cluster: 1,
      position: [46.576, 28.919],
      name: "Primăria comunei Codreni",
      details: "0982302453664 - Persoană juridică",
      location: "R-UL CIMIȘLIA, S.CODRENI",
      sector: "Public",
      foj: "Unitate administrativ-teritorială",
      image: "/breaker_image.png",
    },
    {
      cluster: 2,
      position: [47.024, 28.831],
      name: "Primăria orasului Chisinau",
      details: "0777777777777 - Persoană cool",
      location: "R-UL CIMIȘLIA, or.Chisinau",
      sector: "Public",
      foj: "Unitate administrativ-militară",
      image: "/breaker_image.png",
    },
    {
      cluster: 2,
      position: [47.026, 28.835],
      name: "Altceva",
      details: "0777777774357 - Persoană normala",
      location: "R-UL CIMIȘLIA, or.Chisinau",
      sector: "Privata",
      foj: "Unitate administrativ-obisnuita",
      image: "/breaker_image.png",
    },
  ];

  const cluster1 = markerData.filter((m) => m.cluster === 1);
  const cluster2 = markerData.filter((m) => m.cluster === 2);

  return (
    <MapContainer
      center={[46.579, 28.925]}
      zoom={13}
      placeholder={<MapPlaceholder />}
      style={{ height: "100vh", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup>
        {cluster1.map((marker, idx) => (
          <Marker
            key={`cluster1-${idx}`}
            position={marker.position as [number, number]}
          >
            <Popup>
              <div className="w-full h-full text-xs font-[Onest] [&>p]:m-0! flex flex-col gap-2">
                <p>
                  <b>{tMap("name")}</b> {marker.name}
                </p>
                <p>
                  <b>{tMap("details")}</b> {marker.details}
                </p>
                <p>
                  <b>{tMap("location")}</b> {marker.location}
                </p>
                <p>
                  <b>{tMap("sector")}</b> {marker.sector}
                </p>
                <p className="pb-2">
                  <b>{tMap("unit")}</b> {marker.foj}
                </p>
                <Image
                  alt="popup"
                  src={marker.image}
                  width={400}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Cluster 2 */}
      <MarkerClusterGroup>
        {cluster2.map((marker, idx) => (
          <Marker
            key={`cluster2-${idx}`}
            position={marker.position as [number, number]}
          >
            <Popup>
              <div className="w-full h-full text-xs font-[Onest] [&>p]:m-0! flex flex-col gap-2">
                <p>
                  <b>{tMap("name")}</b> {marker.name}
                </p>
                <p>
                  <b>{tMap("details")}</b> {marker.details}
                </p>
                <p>
                  <b>{tMap("location")}</b> {marker.location}
                </p>
                <p>
                  <b>{tMap("sector")}</b> {marker.sector}
                </p>
                <p className="pb-2">
                  <b>{tMap("unit")}</b> {marker.foj}
                </p>
                <Image
                  alt="popup"
                  src={marker.image}
                  width={400}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
