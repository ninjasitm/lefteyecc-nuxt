<script setup>
const props = defineProps({
	error: Object,
});

const message = computed(() => String(props.error?.message || ""));
const is404 = computed(
	() => props.error?.statusCode === 404 || message.value?.includes("404")
);
const isDev = process.dev;

function handleError() {
	return clearError({ redirect: "/" });
}
</script>

<template>
	<NuxtLayout style="height: 100vh">
		<div
			class="constrained container h-[100vh] mx-auto flex flex-col justify-center"
		>
			<div class="text-3xl">
				{{ is404 ? "This page could not be found" : "An error occurred" }}
			</div>
			<div class="text-xl op50">
				Looks like you've followed a broken link or entered a URL that doesn't
				exist on this site.
			</div>
			<pre v-if="isDev">{{ error }}</pre>
			<NuxtLink class="px-4 py-1 rounded" @click="handleError" href="#">
				Go Back
			</NuxtLink>
		</div>
	</NuxtLayout>
</template>
