<script setup lang="ts">
import MdiLinkedIn from "~icons/mdi/linkedin";

const state = reactive({
	year: new Date().getFullYear(),
	links: [
		{
			title: "LinkedIn",
			icon: MdiLinkedIn,
			url: "https://www.linkedin.com/in/malcolm-paul/",
		},
	],
});
</script>
<template>
	<footer class="flex">
		<div class="grow flex gap4 items-center justify-center">
			<span>&copy; Malcolm Paul {{ state.year }}</span>
			<a
				v-for="link in state.links"
				n-link
				target="_blank"
				class="mx-2"
				:href="link.url"
			>
				<component :is="link.icon" width="2em" height="2em" />
			</a>
		</div>
	</footer>
</template>
