<template>
  <!-- Sidebar -->
  <div
    class="hidden lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]"
    id="sidebarHRIS"
  >
    <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
      <div class="flex items-center justify-between">
        <a href="#" class="flex justify-center">
          <img src="/assets/images/perkantas.png" alt="" />
        </a>
        <a href="#" id="toggleCloseSidebar" class="lg:hidden">
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </a>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-lg font-bold text-secondary">Daily Use</div>
        <NuxtLink :to="{name: 'index'}" class="nav-link ">
            <img src="/assets/svgs/ic-home.svg" alt="" />
            Overview
          </NuxtLink>
        <NuxtLink :to="{ name: 'Loan' }" class="nav-link">
          <img src="/assets/svgs/ic-grid.svg" alt="" />
          Peminjaman
        </NuxtLink>
        <NuxtLink :to="{ name: 'Procurement' }" class="nav-link">
          <img src="/assets/svgs/ic-box.svg" alt="" />
          Form Pengadaan
        </NuxtLink>
        <NuxtLink :to="{ name: 'Good' }" class="nav-link">
          <img src="/assets/svgs/ic-briefcase.svg" alt="" />
          Daftar Barang
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-lg font-bold text-secondary">Others</div>
        <NuxtLink :to="{name: 'Profile'}" class="nav-link">
          <img src="/assets/svgs/ic-users.svg" alt="" />
          Profile
        </NuxtLink>
        <button @click="$auth.logout()" class="nav-link">
          <img src="assets/svgs/ic-signout.svg" alt="" />
          Logout
        </button>
      </div>
    </div>
  </div>
</template>