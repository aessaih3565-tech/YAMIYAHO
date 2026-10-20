import { loadCommandes } from "./dataservice.js";
import { filterCommandes } from "./state.js";
import { renderCommandes, renderError, updateStatistics } from "./view.js";

const searchInput = document.querySelector("#client");
const statusButtons = document.querySelectorAll("[data-status]");
const paidOnlyCheckbox = document.querySelector("#commandesPayees");
let selectedStatus = "Toutes";

async function init() {
  try {
    const commandes = await loadCommandes();

    function updateTable() {
      const filteredCommandes = filterCommandes(commandes, {
        recherche: searchInput.value,
        statut: selectedStatus,
        payeesSeulement: paidOnlyCheckbox.checked,
      });
      renderCommandes(filteredCommandes);
    }

    updateStatistics(commandes);
    updateTable();
    searchInput.addEventListener("input", updateTable);
    paidOnlyCheckbox.addEventListener("change", updateTable);

    for (const button of statusButtons) {
      button.addEventListener("click", () => {
        selectedStatus = button.dataset.status;

        for (const statusButton of statusButtons) {
          const isSelected = statusButton === button;
          statusButton.classList.toggle("active", isSelected);
          statusButton.setAttribute("aria-pressed", String(isSelected));
        }

        updateTable();
      });
    }
  } catch (error) {
    console.error("Erreur lors du chargement des commandes :", error);
    renderError(
      "Impossible de charger les commandes. Vérifiez le fichier JSON et ouvrez le projet avec un serveur local.",
    );
  }
}

init();
