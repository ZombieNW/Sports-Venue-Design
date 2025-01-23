<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	if (browser) {
		if (!$page.params.id) {
			goto('/');
		} else {
			goto(`/events/${$page.params.id}/info`);
		}
	}
</script>
