export function filterCommandes(commandes, { recherche, statut, payeesSeulement }) {
  const nomRecherche = recherche.trim().toLocaleLowerCase("fr");

  return commandes.filter((commande) => {
    const correspondAuClient =
      !nomRecherche ||
      String(commande.client).toLocaleLowerCase("fr").includes(nomRecherche);
    const correspondAuStatut =
      statut === "Toutes" || commande.statut === statut;
    const correspondAuPaiement =
      !payeesSeulement || commande.paiement === "Payé";

    return correspondAuClient && correspondAuStatut && correspondAuPaiement;
  });
}