<template>
    <!-- Main Content -->
    <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
      <!-- Top Section -->
      <section
        class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
      >
        <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden">
            <svg
              class="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              ></path>
            </svg>
          </a>
          <div class="text-[32px] font-semibold text-dark">
            Profile User
          </div>
        </div>
      </section>
  
      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="flex">
            <div class="w-1/2">
                <img src="/assets/images/profile.png" class="w-3/5 ml-[5px] bg-white rounded-full" alt="" />
            </div>
            <div class="w-1/2">
                <div class="flex flex-col gap-4 mt-[50px]">
                    <div class="text-lg font-bold text-secondary">Nama: </div>
                    <input type="text" disabled :value="this.$store.state.auth.user.name">
                    <div class="text-lg font-bold text-secondary">Email</div>
                    <input type="text" disabled :value="this.$store.state.auth.user.email">
                    <div class="text-lg font-bold text-secondary">Password</div>
                    <input type="password" disabled :value="this.$store.state.auth.user.password">
                </div>  
            </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    middleware: 'auth',
    layout: 'dashboard',
  }
  </script>