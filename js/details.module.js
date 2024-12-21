import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    this.ui = new Ui();

    document.getElementById("btnClose").addEventListener("click", () => {
      this.closeDetails();
    });

    this.fetchDetails(id);
  }

  fetchDetails(idGame) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGame}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "757350a43emshde6189eb288174bp1e8c4bjsne7278fe05095",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => this.ui.displayDetails(data))
      .catch((error) => {
        console.error("Error fetching details:", error);
        alert("Failed to load game details. Please try again.");
      })
      .finally(() => {
        loading.classList.add("d-none");
      });
  }

  closeDetails() {
    document.querySelector(".games").classList.remove("d-none");
    document.querySelector(".details").classList.add("d-none");
  }
}
