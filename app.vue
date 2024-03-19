<script setup lang="ts">
useHead({
	title: "Malcolm Paul",
	meta: [
		{
			hid: "description",
			name: "description",
			content:
				"Malcolm Paul is a software engineer, entrepreneur, and founder of NITM.",
		},
	],
});

useSeoMeta({
	title: "Malcolm Paul",
	ogTitle: "Malcolm Paul",
	description:
		"Malcolm Paul is a software engineer, entrepreneur, and founder of NITM.",
	ogDescription:
		"Malcolm Paul is a software engineer, entrepreneur, and founder of NITM.",
	ogImage:
		"https://cdn.lefteye.cc/malcolmpaul-me-lefteye-cc%2Fproduction%2Fimages%2Fhero-image.webp",
	twitterCard: "summary_large_image",
});
</script>
<template>
	<NuxtLoadingIndicator />
	<div
		class="grid h-full grid-rows-[auto,1fr,auto] grid-cols-1"
		style="min-height: 100vh"
	>
		<Navigation lg:order-first />
		<div id="app-scroller" class="of-x-hidden of-y-auto w-full">
			<NuxtPage />
		</div>
		<Footer lg:order-last />
	</div>
</template>
<style>
/* .page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
} */
</style>
