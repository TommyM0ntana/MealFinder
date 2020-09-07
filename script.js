//const searchBTN = document.getElementById("search");
//const submit = document.getElementById("submit");
const randomBTN = document.getElementById("random");
// const results = document.getElementById("results");
const meals = document.getElementById("meals");
// const singleMealEl = document.getElementById("singleMealEl");

//Search meal and fetch API
const searchMeal = e => {
  e.preventDefault();

  //Clear single meal
  // singleMealEl.innerHTML = "";

  //Get the search term that returns the value typed
  term = document.getElementById("search").value;
  console.log(term);

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}
    `)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        document.getElementById(
          "results"
        ).innerHTML = `  <h2>Search result for: ${term} </h2>`;

        if (data.meals === null) {
          document.getElementById(
            "results"
          ).innerHTML = `<p>There are no results!!</p> `;
        } else {
          document.getElementById("meals").innerHTML = data.meals
            .map(
              meal =>
                `<div class='meal'>
                  <img class='image' src="${meal.strMealThumb}"/>
                  <div class='info' data-mealID="${meal.idMeal}" >
                    <h3>${meal.strMeal}</h3>
                  </div>
                 </div>`
            )
            .join("");
        }
        document.getElementById("search").value = "";
      });
  } else {
    alert("Please add some value");
  }
};

const getMealById = mealID => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}
  `)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      displaySingleMeal(meal);
    });
};

const displaySingleMeal = meal => {
  ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  document.getElementById("single-meal").innerHTML = `
  <div class='single-meal'>
    <h1>${meal.strMeal}</h1>
      <img src='${meal.strMealThumb}'/>
      <div class='meal-infos style='width: 50px''>
        <h2>${meal.strCategory}</p>
        <h3>${meal.strArea}</h3>
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
         ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
  </div>
  `;
};

function showItem(e) {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains("info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
}

//Event listener
document.getElementById("submit").addEventListener("submit", searchMeal);
//meals
document.getElementById("meals").addEventListener("click", showItem);
