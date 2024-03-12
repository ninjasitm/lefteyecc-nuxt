<template>
  <NuxtLoadingIndicator />
  <div
    class="grid h-full grid-rows-[auto,1fr,auto] lg:grid-cols-1"
    style="min-height: 100vh"
  >
    <Navigation lg:order-first />
    <div
      id="app-scroller"
      of-x-hidden
      of-y-auto
      relative
    >
      <NuxtPage />
    </div>
    <Footer lg:order-last />
  </div>
</template>