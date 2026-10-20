export async function loadCommandes() {
  const response = await fetch("data/data.json");
  if (!response.ok) {
    throw new Error(`Impossible de charger les commandes (${response.status}).`);
  }

  const commandes = await response.json();
  if (!Array.isArray(commandes)) {
    throw new Error("Le fichier JSON doit contenir une liste de commandes.");
  }

  return commandes;
}