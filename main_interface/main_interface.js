document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript is running correctly!");

  // Initialize slideshow
  let slideIndex = 0;
  function showSlides() {
      let slides = document.getElementsByClassName("slide");
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) { slideIndex = 1; }
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 4000); // Change slide every 4 seconds
  }
  showSlides();

  // Manual slideshow navigation
  function changeSlide(n) {
      slideIndex += n;
      let slides = document.getElementsByClassName("slide");
      if (slideIndex > slides.length) { slideIndex = 1; }
      if (slideIndex < 1) { slideIndex = slides.length; }
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      slides[slideIndex - 1].style.display = "block";
  }
  document.querySelector(".prev").addEventListener("click", () => changeSlide(-1));
  document.querySelector(".next").addEventListener("click", () => changeSlide(1));

  // Recipe Slideshow - Smooth Transition for 3 recipes at a time
  let recipeIndex = 0;
  const recipeContainer = document.querySelector(".recipe-slider");
  const recipes = document.querySelectorAll(".recipe-slide");
  const visibleRecipes = 3;
  const totalRecipes = recipes.length;

  function updateRecipeSlides() {
      const offset = -(recipeIndex * (100 / visibleRecipes));
      recipeContainer.style.transition = "transform 0.5s ease-in-out";
      recipeContainer.style.transform = `translateX(${offset}%)`;
  }

  function changeRecipeSlide(n) {
      const maxIndex = totalRecipes - visibleRecipes; // Ensure last set fits in viewport
      recipeIndex += n;
      if (recipeIndex > maxIndex) recipeIndex = 0; // Loop back to start
      if (recipeIndex < 0) recipeIndex = maxIndex; // Loop back to end
      updateRecipeSlides();
  }

  document.querySelector(".prev-recipe").addEventListener("click", () => changeRecipeSlide(-1));
  document.querySelector(".next-recipe").addEventListener("click", () => changeRecipeSlide(1));

  // Recipe hover effects
  let recipeItems = document.querySelectorAll(".recipe-slide");
  recipeItems.forEach(recipe => {
      recipe.addEventListener("mouseover", () => {
          recipe.classList.add("hovered");
      });
      recipe.addEventListener("mouseleave", () => {
          recipe.classList.remove("hovered");
      });
  });

  // User ranking podium animation
  let topUsers = document.querySelectorAll(".user-rank");
  topUsers.forEach((user, index) => {
      setTimeout(() => {
          user.classList.add("highlight");
      }, index * 500);
  });

  console.log("Ranking container found?", document.querySelector(".ranking-container"));

  // Set up ranking podium
  setTimeout(() => {
      const rankingContainer = document.querySelector(".ranking-container");
      if (rankingContainer) {
          rankingContainer.innerHTML = `
              <h2 class='ranking-title'>トップランカーユーザ</h2>
              <div class='ranking-podium'>
                  <div class='rank second'>
                      <img src='images/user2.png' class='user-rank' alt='Second Place'>
                      <p>Second</p>
                  </div>
                  <div class='rank first'>
                      <img src='images/user1.png' class='user-rank' alt='First Place'>
                      <p>First</p>
                  </div>
                  <div class='rank third'>
                      <img src='images/user.png' class='user-rank' alt='Third Place'>
                      <p>Third</p>
                  </div>
              </div>
          `;
      } else {
          console.error("Error: .ranking-container not found.");
      }
  }, 500); // Small delay to ensure rendering
});
