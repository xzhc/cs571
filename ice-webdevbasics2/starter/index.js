// This is where your JS goes!

// You can fetch data from https://cs571api.cs.wisc.edu/rest/s25/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pasta
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pizza
let recipe;
let baseAmounts;
let reviewNum = 0;

function updateRecipe() {
  const selectedRecipe = document.getElementById("recipe-selector").value;
  //console.log(selectedRecipe);
  fetch("https://cs571.org/rest/s25/ice/" + selectedRecipe, {
    headers: {
      "X-CS571-ID": CS571.getBadgerId(),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      recipe = data;
      console.log(data);

      const imageHTML = document.getElementById("recipe-img");
      imageHTML.src = recipe.img.location;
      imageHTML.alt = recipe.img.description;

      const nameHTML = document.getElementById("recipe-name");
      nameHTML.innerText = recipe.name;

      const authorHTML = document.getElementById("recipe-author");
      authorHTML.innerText = "by " + recipe.author;

      const ingredientsBodyHTML = document.getElementById("ingredients-body");
      ingredientsBodyHTML.innerHTML = "";
      baseAmounts = [];
      const ingreNames = Object.keys(recipe.ingredients);
      for (let ingreName of ingreNames) {
        const ingre = recipe.ingredients[ingreName];
        const trHTML = document.createElement("tr");
        const tdAmountHTML = document.createElement("td");
        const tdUnitHTML = document.createElement("td");
        const tdNameHTML = document.createElement("td");

        baseAmounts.push(ingre.amount);

        tdAmountHTML.innerText = ingre.amount;
        if (ingre.unit) {
          tdUnitHTML.innerText = ingre.unit;
        }
        if (ingre.misc) {
          tdNameHTML.innerText = ingreName + "(" + ingre.misc + ")";
        } else {
          tdNameHTML.innerText = ingreName;
        }

        trHTML.appendChild(tdAmountHTML);
        trHTML.appendChild(tdUnitHTML);
        trHTML.appendChild(tdNameHTML);
        ingredientsBodyHTML.appendChild(trHTML);
      }

      const instructionsHTML = document.getElementById("instructions");
      instructionsHTML.innerHTML = "";
      for (let step of recipe.recipe) {
        const liHTML = document.createElement("li");
        liHTML.innerText = step;
        instructionsHTML.appendChild(liHTML);
      }
    });
}

//console.log(":)");

// Gathers the original amounts of each ingredient.

// TODO Implement the update yield!
function updateYield() {
  if (!recipe) {
    alert("I'm still loading the recipe!");
  } else {
    const numServings = document.getElementById("serving-selector").value;
    const rows = document
      .getElementById("ingredients-body")
      .getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      rows[i].getElementsByTagName("td")[0].innerText =
        baseAmounts[i] * parseInt(numServings);
    }
  }
}

// TODO Implement the display review!
function displayReview() {
  if (!recipe) {
    alert("I'm still loading the recipe!");
  } else {
    alert(recipe.reviews[reviewNum].txt);
    reviewNum = (reviewNum + 1) % recipe.reviews.length;
  }
}

updateRecipe();
