import type { CocktailType } from "src/types/index.type";

export function cocktailCaching(){
    const cocktailCache = {}

    async function addCocktail(cocktail : CocktailType){
        cocktailCache[cocktail.cocktailTitle] = cocktail
    }

    async function selectCocktail(cocktailTitle: string){
        console.log(cocktailCache[cocktailTitle])
        return cocktailCache[cocktailTitle]
    }

    return {
        addCocktail,
        selectCocktail
    }
}