<template>
  <div>
    <div class="pt-[50px] md:px-[50px] flex justify-between items-center px-4">
      <NuxtLink :to="{name:'index'}">
        <img src="/assets/images/perkantas.png" alt="" class="w-1/4 hover:cursor-pointer hover:opacity-50" />
      </NuxtLink>
      <a href="#" onclick="history.back()" class="hover:cursor-pointer hover:opacity-50">
        <img src="/assets/svgs/ric-close-white.svg" alt="" />
      </a>
    </div>
    <Nuxt />
  </div>
</template>