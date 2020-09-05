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
          document.getElementById("singleMealEl").innerHTML = data.meals
            .map(
              meal =>
                `<div style="background: black;">
                   <h2>${meal.strMeal}</h2>
                   <a href="${meal.strYoutube}" target="_blank">Youtube live recepies</a>
                   <p>${meal.strArea}</p>
                   <img src="${meal.strMealThumb}"/>
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

//Event listener
document.getElementById("submit").addEventListener("submit", searchMeal);
