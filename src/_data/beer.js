const Batch = require("../../lib/beer/batch");
const Recipe = require("../../lib/beer/recipe");

module.exports = async function () {
  const pageSize = 50;
  const batches = await Batch.fetchAll(pageSize);
  let recipes = await Recipe.fetchAll(pageSize);

  recipes = recipes
    .map((recipe) => {
      recipe.batch = batches.find((batch) => batch.recipeId === recipe.id);

      return recipe;
    })
    .filter((recipe) => recipe.isPublished && (recipe.isCore || recipe.batch))
    .sort((a, b) => batches.indexOf(a.batch) - batches.indexOf(b.batch))
    .sort((a, b) => {
      // sort core recipes to the top
      if (a.isCore && b.isCore) return 0;
      if (a.isCore) return -1;
      return 1;
    });

  return { batches, recipes };
};
