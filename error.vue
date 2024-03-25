<script setup>
import Sugar from "sugar";

const props = defineProps({
	error: Object,
});

console.log("Error Object", props.error);
const message = computed(() => String(props.error?.message || ""));
const is404 = computed(
	() => props.error?.statusCode === 404 || message.value?.includes("404")
);
const isDev = process.dev;

const randomImage = computed(() => {
	const items = new Sugar.Array(["leelo", "fry-bed", "fry-bed-2"]);
	return "/images/error/" + items.sample() + ".webp";
});

function handleError() {
	return clearError({ redirect: "/" });
}
</script>

<template>
	<NuxtLayout style="height: 100vh">
		<div
			class="constrained container h-[100vh] mx-auto flex flex-col justify-center"
		>
			<h1 class="text-5xl">Whoops ...</h1>
			<div
				class="h-[500px] w-full overflow-hidden rounded-lg my-6 cursor-zoom-in"
			>
				<img
					:src="randomImage"
					alt="Something happened"
					class="w-full h-120 object-cover hover:scale-125 transition-all"
				/>
			</div>
			<p class="text-xl op50" v-html="message || 'Something happened'"></p>
			<p v-if="isDev" v-html="error" class="mt-3"></p>
			<NuxtLink class="px-4 py-1 text-3xl" @click="handleError" href="#">
				Go Back
			</NuxtLink>
		</div>
	</NuxtLayout>
</template>
