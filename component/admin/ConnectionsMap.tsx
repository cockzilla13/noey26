"use client";

import { useEffect, useState } from "react";

export default function ConnectionsMap({
  logs
}: {
  logs: any[];
}) {

  const [Map, setMap] =
    useState<any>(null);

  useEffect(() => {

    async function loadMap() {

      const leaflet =
        await import(
          "react-leaflet"
        );

      await import(
        "leaflet/dist/leaflet.css"
      );

      setMap(() => leaflet);

    }

    loadMap();

  }, []);

  if (!Map) {

    return (

      <div
        className="
        h-[600px]
        flex
        items-center
        justify-center
        "
      >

        Chargement carte...

      </div>

    );

  }

  const {
    MapContainer,
    TileLayer,
    Marker,
    Popup
  } = Map;

  return (

    <MapContainer
      center={[4.05, 9.70]}
      zoom={5}
      style={{
        height: "600px",
        width: "100%"
      }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {logs.map((log) => (

        log.latitude &&
        log.longitude && (

          <Marker
            key={log.id}
            position={[
              Number(log.latitude),
              Number(log.longitude)
            ]}
          >

            <Popup>

              <div>

                <strong>
                  {log.email}
                </strong>

                <br />

                {log.role}

                <br />

                {new Date(
                  log.created_at
                ).toLocaleString()}

              </div>

            </Popup>

          </Marker>

        )

      ))}

    </MapContainer>

  );

}