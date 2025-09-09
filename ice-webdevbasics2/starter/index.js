// This is where your JS goes!

// You can fetch data from https://cs571api.cs.wisc.edu/rest/s25/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pasta
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pizza
let recipe;
let baseAmounts = [];
let reviewNum = 0;

function updateRecipe() {
  const selectedRecipe = document.getElementById("recipe-selector").value;
  fetch("https://cs571.org/rest/s25/ice/" + selectedRecipe, {
    headers: {
      //"X-CS571-ID": CS571.getBadgerId(),
      "X-CS571-ID": CS571.getBadgerId(),
    },
  })
    .then((res) => {
      //console.log(res.status);
      return res.json();
    })
    .then((data) => {
      //console.log("I have recieved some data!");
      recipe = data;
      console.log(data);

      document.getElementById("recipe-img").src = data.img.location;
      document.getElementById("recipe-img").alt = data.img.description;
      document.getElementById("recipe-name").innerText = data.name;
      document.getElementById("recipe-author").innerText = "by " + data.author;

      document.getElementById("ingredients-body").innerHTML = "";
      baseAmounts = [];
      let ingreNames = Object.keys(data.ingredients);
      for (let ingreName of ingreNames) {
        let ingr = data.ingredients[ingreName];

        const ingrRow = document.createElement("tr");
        const ingrAmount = document.createElement("td");
        const ingrUnit = document.createElement("td");
        const ingrName = document.createElement("td");

        baseAmounts.push(ingr.amount);

        ingrAmount.innerText = ingr.amount;
        if (ingr.unit) {
          ingrUnit.innerText = ingr.unit;
        }
        if (ingr.misc) {
          ingrName.innerText = ingreName + "(" + ingr.misc + ")";
        } else {
          ingrName.innerText = ingreName;
        }

        ingrRow.appendChild(ingrAmount);
        ingrRow.appendChild(ingrUnit);
        ingrRow.appendChild(ingrName);
        document.getElementById("ingredients-body").appendChild(ingrRow);
      }

      document.getElementById("instructions").innerHTML = "";
      for (let step of data.recipe) {
        const node = document.createElement("li");
        node.innerText = step;
        document.getElementById("instructions").appendChild(node);
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
