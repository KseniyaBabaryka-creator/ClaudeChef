import React from 'react'
import IngredientList from './IngredientList'
import ClaudeRecipe  from './CLaudeRecipe'
import { getRecipeFromMistral } from '../../ai'


export default function Main(){
	
	const [ingredients, setIngredients] = React.useState([])

	const [recipe, setRecipe] = React.useState('')


	function handleSubmit(event){
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const newIngridient = formData.get('ingridient');
		setIngredients(ingrArr => [...ingrArr, newIngridient])
	}

	async function showRecipe(){
		const recipeIdea = await getRecipeFromMistral(ingredients)
		setRecipe(recipeIdea)
	}
	
	return(
		<main>
			<form onSubmit={handleSubmit} className="add-ingridient-form">
				<input 
					type="text"
					placeholder="e.g. oregano"
					aria-label='Add ingridient'
					className="form-input"
					name='ingridient'
				/>
				<button className="form-btn" type="submit">+ Add ingridient</button>
			</form>
			{ingredients.length > 0 && <IngredientList ingredients={ingredients} showRecipe={showRecipe}/>
			}
			{recipe && <ClaudeRecipe recipe={recipe}/>}
		</main>
	)
}