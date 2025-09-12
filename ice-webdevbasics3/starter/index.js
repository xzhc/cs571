// This is where your JS goes!

fetch("https://cs571.org/rest/s25/ice/pizza", {
  headers: {
    "X-CS571-ID": CS571.getBadgerId(), // You may hardcode your Badger ID instead.
  },
})
  .then((res) => {
    console.log(res.status, res.statusText);
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error();
    }
  })
  .then((data) => {
    console.log(data);
    console.log("The following are the 5-star reviews...");
    const fiveStarReview = data.reviews
      .filter((review) => review.rating === 5)
      .map((rev) => rev.txt);
    console.log(fiveStarReview);

    console.log("The following are the main points...");
    const beforeColon = data.recipe.map((item) => item.split(":")[0]);
    console.log(beforeColon);

    console.log("The following are the ingredients...");
    const ingres = data.ingredients;
    console.log(
      Object.keys(ingres).map(
        (ingre) =>
          ingres[ingre].amount + (ingres[ingre].unit ?? "") + " " + ingre
      )
    );

    console.log("Is there some instruction to bake?");
    console.log(
      data.recipe.some((instruct) => instruct.toLowerCase().includes("bake"))
    );

    console.log("Is every review 4 or 5 stars?");
    console.log(
      data.reviews.every((review) => review.rating === 4 || review.rating === 5)
    );

    console.log("What is the average review rating?");
    console.log(
      data.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
        data.reviews.length
    );

    console.log("What are the unique ingredients unit");
    console.log(
      Object.keys(data.ingredients).reduce((acc, curr) => {
        let currObj = data.ingredients[curr];
        let currUnit = currObj.unit;
        if (!currUnit) {
          return acc;
        }
        if (acc.includes(currUnit)) {
          return acc;
        }

        //return [...acc, currUnit];
        acc.push(currUnit);
        return acc;
      }, [])
    );
  })
  .catch((err) => {
    alert(
      "Uh oh! Something went wrong. Are you logged in with your Badger ID?"
    );
  });
