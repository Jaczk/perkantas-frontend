<template>
  <div>
    <!-- Main Content -->
    <div
      class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0"
    >
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
            Peminjaman Barang
          </div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[516px] w-full">
            <input
              type="text"
              name=""
              id=""
              class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
              placeholder="Search people, team, project"
            />
          </form>
          <a
            href="#"
            class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot"
          >
            <img src="/assets/svgs/ic-bell.svg" alt="" />
          </a>
        </div>
      </section>

      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div
            class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
          >
            <div>
              <div class="text-xl font-medium text-dark">Statistik</div>
              <p class="text-grey">Daftar Peminjaman Barang</p>
            </div>
            <div>
              <NuxtLink :to="{name:'Loan-return'}" class="btn btn-primary"
              >Kembalikan Barang</NuxtLink
            >
              <NuxtLink :to="{name:'Loan-create'}" class="btn btn-primary"
              >Buat Peminjaman</NuxtLink
            >
            </div>
            
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Total Peminjaman</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ items.length }}
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Yang Masih Dipinjam</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ filteredItems.length }}
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Yang Sudah Dikembalikan</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ items.length - filteredItems.length }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">Daftar Barang</div>
              <p class="text-grey">Harap Dikembalikan sebelum waktunya ya!</p>
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
        >
          <!-- Card -->
          <div
            class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
            v-for="item in filteredItems"
            :key="item.id"
          >
            
              <a
                href="#"
                class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
              ></a>
              <div class="mb-2 font-semibold text-center text-dark">
                No Peminjaman {{ item.loan_id }}
              </div>
              <img :src="item.good.image" width="150" alt="" />
              <p
                class="text-center text-grey mt-[8px]"
                v-if="item.good.goods_name"
              >
                {{ item.good.goods_name }}
              </p>
              <div
                class="mt-[10px] px-5 text-red-600 text-lg flex text-center"
                v-if="item.loan.return_date"
              >
                {{ item.loan.return_date | formatDate }}
              </div>
            
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY')
  }
})
export default {
  middleware: 'auth',
  layout: 'dashboard',
  data() {
    return {
      items: [],
    }
  },
  async fetch() {
    await this.$axios.get('/items?is_returned=0&limit=100').then((response) => {
      this.items = response.data.result.data
    })
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        return item.loan.is_returned === 0
      })
    },
  },
}
</script>