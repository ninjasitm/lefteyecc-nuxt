<script setup lang="ts">
import { useColorMode } from "#imports";
import LightIcon from "~icons/mdi/white-balance-sunny";
import DarkIcon from "~icons/mdi/weather-night";

const colorMode: any = useColorMode();

const state = reactive({
	menu: [
		{
			label: "home",
			to: {
				name: "index",
			},
		},
		{
			label: "content",
			to: { name: "content" },
		},
		// {
		//     label: 'ideas',
		//     to: '/ideas',
		// },
		{
			label: "now",
			to: { name: "now" },
		},
		{
			label: "uses",
			to: { name: "uses" },
		},
	],
});
function onToggleColorMode() {
	colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
}
</script>

<template>
	<div class="constrained container mx-auto">
		<div class="flex justify-between items-center w-full h-16">
			<NuxtLink
				v-slot="{ isActive }"
				title="Home"
				class="font-jimmy text-3xl"
				:to="{ name: 'index' }"
			>
				Malcolm Paul
			</NuxtLink>
			<div class="spacer grow"></div>
			<NuxtLink
				v-for="item in state.menu"
				:key="item.label"
				:to="item.to"
				class="text-xl mx-3"
				>{{ item.label }}</NuxtLink
			>
			<button @click="onToggleColorMode" class="ml-3 text-2xl">
				<LightIcon v-if="colorMode.preference === 'dark'" />
				<DarkIcon v-else />
			</button>
		</div>
	</div>
</template>
