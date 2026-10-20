const tableBody = document.querySelector("#commandesTableBody");

export function renderCommandes(commandes) {
  tableBody.replaceChildren();

  if (commandes.length === 0) {
    renderError("Aucun client ne correspond à votre recherche.");
    return;
  }

  for (const commande of commandes) {
    const row = document.createElement("tr");
    const valeurs = [
      commande.id,
      commande.client,
      `${commande.montant} DH`,
      commande.statut,
      commande.paiement,
      commande.date,
    ];

    for (const valeur of valeurs) {
      const cell = document.createElement("td");
      cell.textContent = valeur;
      row.append(cell);
    }

    tableBody.append(row);
  }
}

export function updateStatistics(commandes) {
  document.querySelector("#totalCommandes").textContent = commandes.length;
  document.querySelector("#totalLivrees").textContent = commandes.filter(
    (commande) => commande.statut === "Livrée",
  ).length;
  document.querySelector("#totalPayees").textContent = commandes.filter(
    (commande) => commande.paiement === "Payé",
  ).length;

  const montantTotal = commandes.reduce(
    (total, commande) => total + commande.montant,
    0,
  );
  document.querySelector("#montantTotal").textContent = `${montantTotal} DH`;
}

export function renderError(message) {
  const errorRow = document.createElement("tr");
  const errorCell = document.createElement("td");
  errorCell.colSpan = 6;
  errorCell.textContent = message;
  errorRow.append(errorCell);
  tableBody.replaceChildren(errorRow);
}