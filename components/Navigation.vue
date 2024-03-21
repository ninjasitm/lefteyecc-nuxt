<script setup lang="ts">
import { ref, reactive } from "vue";
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
	isOpen: false,
});
function onToggleColorMode() {
	colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
}

function onToggleMenu() {
	state.isOpen = !state.isOpen;
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
			<!-- primary nav -->
			<div class="grow hidden md:flex justify-end">
				<NuxtLink
					v-for="item in state.menu"
					:key="item.label"
					:to="item.to"
					class="text-xl mx-3"
					>{{ item.label }}</NuxtLink
				>
			</div>
			<button
				@click="onToggleColorMode"
				class="ml-3 mr-2 text-2xl lg:px-0 lg:mr-0"
			>
				<LightIcon v-if="colorMode.preference === 'dark'" />
				<DarkIcon v-else />
			</button>
			<div class="ml-3 md:hidden flex items-center">
				<button
					@click="onToggleMenu"
					class="md:hidden navbar-toggler navbar-toggler-right text-2xl pa-3"
					type="button"
					data-toggle="collapse"
					data-target="#navbarResponsive"
					aria-controls="navbarResponsive"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
			</div>
		</div>
		<!-- mobile menu -->
		<div
			id="navbarResponsive"
			class="md:hidden"
			:class="state.isOpen ? 'block' : 'hidden'"
		>
			<div class="mobile-menu-content">
				<NuxtLink
					v-for="item in state.menu"
					:key="item.label"
					:to="item.to"
					@click="onToggleMenu"
					class="text-5xl leading-loose block py-2 px-4 hover:bg-gray-200"
					>{{ item.label }}</NuxtLink
				>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
#navbarResponsive {
	display: block;
	text-align: center;
	align-items: center;
	height: calc(0px);
	transition: all 500ms ease-in-out;
}
#navbarResponsive.block {
	height: calc(100vh - 56px);
}
#navbarResponsive.block .mobile-menu-content {
	height: 100%;
	opacity: 1;
	z-index: 10000;
	// position: fixed;
	// top: 0;
	// bottom: 0;
	// right: 0;
	// left: 0;
}

#navbarResponsive .mobile-menu-content {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: center;
	transition: all 300ms linear;
	opacity: 0;
	height: 0px;
	z-index: -1;
}
#navbarResponsive .mobile-menu-content > a {
	// font-size: 2rem;
	// line-height: 3rem;
}
</style>
