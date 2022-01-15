<script context="module" lang="ts">
	import { getCocktail } from '../endpoints/index.endpoint';

	const load = async () => {
		const cocktailResult = await getCocktail();
		return cocktailResult;
	};
</script>

<script lang="ts">
	import type { CocktailType } from 'src/types/index.type';
	import { onMount } from 'svelte';
	import { listStore } from '../stores/lists.store';
	import { cocktailCaching } from '../stores/cocktail.cache.store';
	const cocktailLists = listStore();
	const cocktailCaches = cocktailCaching();

	export let searchLists = undefined;
	export let cocktail: CocktailType = {
		cocktailTitle: '',
		subMenus: [],
		url: ''
	};

	const onClickEvent = async () => {
		const cocktailRecieps = await load();
		await writeStoere(cocktail.cocktailTitle);
		await cocktailCaches.addCocktail(cocktailRecieps);

		cocktail = {
			...cocktailRecieps
		};
	};

	const writeStoere = async (cocktailTitle: string) => {
		cocktailLists.listAdd(cocktailTitle);
		searchLists = cocktailLists.lists;
	};

	const handleChangeCocktailItem = async (cocktailTitle: string) => {
		const selectCocktail = await cocktailCaches.selectCocktail(cocktailTitle);
		cocktail = {
			...selectCocktail
		};
	};

	// useEffect({},[])
	onMount(async () => {
		await onClickEvent();
	});
</script>

<div class="container">
	<!-- search nav bar-->
	<div class="nav-container">
		<h1>Search list</h1>
		{#if searchLists}
			{#each searchLists as item, _}
				<button class="list-button" on:click={() => handleChangeCocktailItem(item)}>{item}</button>
			{/each}
		{/if}
	</div>
	<!-- main view -->
	<div class="header">
		<h1 id="title">CockTail Recipes</h1>
		<button id="header-button" on:click={onClickEvent}> make a cocktail </button>
	</div>
	<div class="main">
		<h1 id="item-title">{cocktail.cocktailTitle}</h1>

		{#each cocktail.subMenus as { subMenuName, subMenuAmount }, _}
			<p class="list">{subMenuName}, {subMenuAmount}</p>
		{/each}

		<img src={cocktail.url} alt="cock tail thumnail" id="item-url" width="300px" />
	</div>
	<div class="footer">
		<p id="footer-description">made by leedonggyu 2022.01.15</p>
	</div>
</div>

<style>
	.container,
	.header,
	.main,
	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.nav-container {
		position: absolute;
		display: flex;
		flex-direction: column;
		width: 300px;
		min-height: 300px;
		right: 0;
		margin-right: 5%;
	}

	#item-url {
		width: 300px;
	}

	.list {
		line-height: 3px;
		font-weight: bold;
	}

	.nav-container h1 {
		text-align: center;
	}

	.list-button {
		border: 0;
		margin: 10px;
		background-color: white;
		text-align: left;
	}

	.list-button:hover {
		opacity: 0.5;
	}
</style>
