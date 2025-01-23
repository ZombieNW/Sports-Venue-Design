export async function getEvents() {
	return await fetch('/events.json')
		.then((res) => res.json())
		.then((data) => {
			return data.sort((a, b) => a.date - b.date);
		})
		.catch((err) => {
			return err;
		});
}

export async function getEvent(id) {
	return await fetch('/events.json')
		.then((res) => res.json())
		.then((data) => {
			return data.find((event) => event.id === parseInt(id));
		})
		.catch((err) => {
			return err;
		});
}

export async function getFaqs() {
	return await fetch('/faqs.json')
		.then((res) => res.json())
		.then((data) => {
			return data.sort((a, b) => a.date - b.date);
		})
		.catch((err) => {
			return err;
		});
}
