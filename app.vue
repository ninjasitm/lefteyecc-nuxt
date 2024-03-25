<script setup lang="ts">
import { useBrowserLocation } from "@vueuse/core";
const { origin } = useBrowserLocation();

const details = {
	title: "Malcolm Paul",
	description:
		"Malcolm Paul is a software engineer, entrepreneur, and founder of NITM.",
	image:
		"https://cdn.lefteye.cc/malcolmpaul-me-lefteye-cc%2Fproduction%2Fimages%2Fhero-image.webp",
};

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
	lang: "en",
	icon: "",
	title: details.title,
	description: details.description,
	ogUrl: origin,
	ogTitle: details.title,
	ogImage: details.image,
	ogDescription: details.description,
	twitterTitle: details.title,
	twitterDescription: details.description,
	twitterImage: details.image,
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
