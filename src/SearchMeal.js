import React, {useState} from "react";
const search = document.getElementById("search");
const single_mealEl = document.getElementById("single-meal")
const resultHeading = document.getElementById("result-heading");
const mealsEl = document.getElementById("meals");

function SearchMeal() {

  const [term, setTerm] = useState("")
// e.preventDefault()

function handleChange(event) {
  event.preventDefault()
  setTerm(event.target.value)
  console.log(term);
}

const onSearchSubmit = (term) => {

  console.log(term, "btton");
  fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${term}`, {
     	"method": "GET",
     	"headers": {
     		"x-rapidapi-key": "70aa9d5184msh24f489409866b23p1ff84cjsn5832992d4f80",
     		"x-rapidapi-host": "tasty.p.rapidapi.com"
     	}
     })
    .then( res => res.json())
    .then(data => {
      console.log(data.results);
        resultHeading.innerHTML = `<h2> Search results for ${term} </h2>`;

     if(data.results === null) {
       resultHeading.innerHTML = `<p> there are no search resutlts </p>`
     } else {
       mealsEl.innerHTML = data.results.map(meal => `
         <div id="meals">
         <div class="meal">
       <img src=${meal.thumbnail_url} />
       <div class="meal-info" data-mealid="${meal.id}">
         <h3> ${meal.name} </h3>
       </div>
       </div>
       </div>
       `)
       .join("")

     }
   });
}


 // clear single meal
 // single_mealEl.innterHTML = "";
return (
   <form onClick={(e) => e.preventDefault()}>
     <input type="text" id="search" onChange={handleChange} value={term} placeholder="search for stuff" />
     <button onClick={(e) => onSearchSubmit(e.target.value)}> hi </button>
   </form>
)



 //get search term
//  const term = search.value;
//
//  if(term.trim()) {
//    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${term}`, {
//     	"method": "GET",
//     	"headers": {
//     		"x-rapidapi-key": "70aa9d5184msh24f489409866b23p1ff84cjsn5832992d4f80",
//     		"x-rapidapi-host": "tasty.p.rapidapi.com"
//     	}
//     })
//    .then( res => res.json())
//    .then(data => {
//      console.log(data.results);
//        resultHeading.innerHTML = `<h2> Search results for ${term} </h2>`;
//
//     if(data.results === null) {
//       resultHeading.innerHTML = `<p> there are no search resutlts </p>`
//     } else {
//       mealsEl.innerHTML = data.results.map(meal => `
//         <div id="meals">
//         <div class="meal">
//       <img src=${meal.thumbnail_url} />
//       <div class="meal-info" data-mealid="${meal.id}">
//         <h3> ${meal.name} </h3>
//       </div>
//       </div>
//       </div>
//       `)
//       .join("")
//
//     }
//   });
//   //clear search text
//   search.value = ""
// }
 //     else {
 //   alert("please enter a serch term")
 // }

 // console.log(term);
}

export default SearchMeal
