import type { CockTailSubmenuType, CocktailType } from 'src/types/index.type';

export const getCocktail = async (): Promise<CocktailType> => {
	const cocktailResults = await (
		await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
	).json();

	// console.log(cocktailResults);

	const submenus: CockTailSubmenuType[] = [...Array(15)]
		.map((_, index) => ({
			subMenuName: cocktailResults.drinks[0][`strIngredient${index + 1}`],
			subMenuAmount: cocktailResults.drinks[0][`strMeasure${index + 1}`]
		}))
		.filter((sublist) => sublist.subMenuName);

	//	console.log({ submenus });

	const { strDrink, strDrinkThumb } = cocktailResults.drinks[0];
	return {
		cocktailTitle: strDrink,
		url: strDrinkThumb,
		subMenus: submenus
	};
};
