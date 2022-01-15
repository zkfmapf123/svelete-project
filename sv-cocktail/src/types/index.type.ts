export type CockTailSubmenuType = {
	subMenuName: string;
	subMenuAmount: string;
};

export type CocktailType = {
	cocktailTitle: string;
	url: string;
	subMenus: CockTailSubmenuType[];
};
