export function listStore() {
	const lists = [];

	function listAdd(title: string) {
		if (!lists.includes(title)) {
			lists.push(title);
		}
	}

	return {
		listAdd,
		lists
	};
}
