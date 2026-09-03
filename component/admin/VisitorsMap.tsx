"use client";

import {
  useEffect,
  useState,
} from "react";

export default function VisitorsMap({
  visitors,
}: {
  visitors: any[];
}) {
  const [Map, setMap] =
    useState<any>(null);

  useEffect(() => {
    async function loadMap() {
      try {
        const leaflet =
          await import(
            "react-leaflet"
          );

        await import(
          "leaflet/dist/leaflet.css"
        );

        setMap(() => leaflet);
      } catch (error) {
        console.error(
          "Erreur chargement carte :",
          error
        );
      }
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
          text-gray-500
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
    Popup,
  } = Map;

  /*
    On ne garde que les visiteurs
    ayant réellement une position.
  */

  const locatedVisitors =
    visitors.filter(
      (visitor) =>
        visitor.latitude !==
          null &&
        visitor.longitude !==
          null &&
        visitor.latitude !==
          undefined &&
        visitor.longitude !==
          undefined
    );

  return (
    <MapContainer
      center={[
        4.05,
        9.70,
      ]}
      zoom={5}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {locatedVisitors.map(
        (visitor) => (
          <Marker
            key={visitor.id}
            position={[
              Number(
                visitor.latitude
              ),
              Number(
                visitor.longitude
              ),
            ]}
          >
            <Popup>
              <div
                className="
                  min-w-[220px]
                  text-sm
                "
              >
                <strong
                  className="
                    text-base
                  "
                >
                  👤 Visiteur
                </strong>

                <br />

                <br />

                <strong>
                  📄 Page :
                </strong>{" "}
                {visitor.page ||
                  "—"}

                <br />

                <strong>
                  📱 Appareil :
                </strong>{" "}
                {visitor.device ||
                  "—"}

                <br />

                <strong>
                  📍 Ville :
                </strong>{" "}
                {visitor.city ||
                  "Non disponible"}

                <br />

                <strong>
                  🌍 Pays :
                </strong>{" "}
                {visitor.country ||
                  "Non disponible"}

                <br />

                <strong>
                  🧭 Position :
                </strong>

                <br />

                {Number(
                  visitor.latitude
                ).toFixed(6)}

                {" , "}

                {Number(
                  visitor.longitude
                ).toFixed(6)}

                <br />

                <br />

                <strong>
                  🕐 Date :
                </strong>

                <br />

                {visitor.created_at
                  ? new Date(
                      visitor.created_at
                    ).toLocaleString()
                  : "—"}
              </div>
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
}