const { translator } = require('./translator.js')
const fetch = require("node-fetch");
require('dotenv').config()

async function fetchDishes(mealType) {
  const foodFetch = await fetch(`https://api.edamam.com/search?q=${mealType}&app_id=eb414ad7&app_key=${process.env.APPKEY}`);
  const fetchText = await foodFetch.json()
  let hits = fetchText.hits;
  return hits;
};

async function getButtonLables(mealType) {
  let hits = await fetchDishes(mealType)
  let buttonName = Promise.all(hits.map(async (el) => { return [{ text: await translator(el.recipe.label), callback_data: el.recipe.label }] }))
  return buttonName;
};

async function getDish(dish) {
  let mealType = dish;
  let hits = await fetchDishes(mealType);
  let result = `${await translator(hits[0].recipe.label)}\n Ингрeдиенты:\n ${await translator(hits[0].recipe.ingredientLines.toString())}\n Калорийность: ${hits[0].recipe.calories},\n Время приготовления: ${hits[0].recipe.totalTime},\n Ссылка на рецепт:${hits[0].recipe.url}`

  return result;
  
}


module.exports = { getButtonLables, getDish };
