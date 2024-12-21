import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Games {
  constructor() {
    this.ui = new Ui();

    this.fetchGames("mmorpg");

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => this.handleMenuClick(e));
    });
  }

  async fetchGames(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "757350a43emshde6189eb288174bp1e8c4bjsne7278fe05095",
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          },
        }
      );

      const data = await response.json();
      this.ui.displayGameData(data);
      this.addCardClickEvents();
    } catch (error) {
      console.error("Error fetching games:", error);
      alert("Failed to load games. Please try again.");
    } finally {
      loading.classList.add("d-none");
    }
  }

  handleMenuClick(event) {
    document.querySelector(".menu .active").classList.remove("active");
    event.target.classList.add("active");

    const category = event.target.dataset.category;
    this.fetchGames(category);
  }

  addCardClickEvents() {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => this.showDetails(card.dataset.id));
    });
  }

  showDetails(idGame) {
    new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}
