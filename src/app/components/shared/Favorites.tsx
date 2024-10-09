import React from "react";

// Funktion zum Abrufen der gespeicherten Immobilien aus dem localStorage
const getSavedEstates = () => {
  if (typeof window !== "undefined") {
    // Überprüfen, ob der Code im Browser ausgeführt wird
    const savedItems = JSON.parse(localStorage.getItem("savedEstates") || "[]");
    return savedItems; // Gibt die gespeicherten Immobilien zurück
  }
  return [];
};

// Beispiel: Abrufen und Konsolen-Ausgabe der gespeicherten Immobilien
const savedEstates = getSavedEstates();
console.log(savedEstates);

export default function Favorites() {
  return <div>Favorites</div>;
}
