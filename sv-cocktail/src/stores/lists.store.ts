import { writable } from 'svelte/store';

export function listStore() {
	const lists = [];

	function listAdd(title) {
		lists.push(title);
	}

	return {
		listAdd,
		lists
	};
}
