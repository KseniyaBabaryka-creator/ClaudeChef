/* eslint-disable react/prop-types */

export default function IngredientList(props){

	const ingredientsListItem = props.ingredients.map(ingr => (
		<li key={ingr}>{ingr}</li>
	))

	return(
		<section className='suggested-recipe-container'>
         <h2>Ingredients on hand:</h2>
         <ul className="ingredients-list" aria-live="polite">{ingredientsListItem}</ul>
			{props.ingredients.length > 3 &&
            <div className="get-recipe-container">
               <div ref={props.rec}>
                  <h3>Ready for a recipe?</h3>
                  <p>Generate a recipe from your list of ingredients.</p>
               </div>
               <button onClick={props.showRecipe}>Get a recipe</button>
            </div>} 
      </section>
	)
}