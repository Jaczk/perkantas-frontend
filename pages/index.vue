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
          <div class="text-[32px] font-semibold text-dark">Overview</div>
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
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">Statistik</div>
              <p class="text-grey">Yang Sudah Kamu Lakukan di Perkantas</p>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-0 min-h-[100px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey text-[24px] font-bold">Total Peminjaman</p>
                <div class="text-[56px] font-bold text-dark mt-[6px]">
                  {{ goods.length }}
                </div>
              </div>
            </div>
            <NuxtLink :to="{ name: 'Loan-create' }" class="self-end w-1/2 btn btn-primary">
              Tambah
            </NuxtLink>
          </div>
          <div class="card !gap-y-0 min-h-[100px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey text-[24px] font-bold">Total Pengajuan</p>
                <div class="text-[56px] font-bold text-dark mt-[6px]">
                  {{ procurements.length }}
                </div>
              </div>
            </div>
            <NuxtLink :to="{ name: 'Procurement-create' }" class="self-end w-1/2 btn btn-primary">
              Tambah
            </NuxtLink>
          </div>
          <div class="card !gap-y-0 min-h-[100px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey text-[24px] font-bold">Barang Dipinjam</p>
                <div class="text-[56px] font-bold text-dark mt-[6px]">
                    {{ filteredItems.length }}
                </div>
              </div>
            </div>
            <NuxtLink :to="{ name: 'Procurement-create' }" class="self-end w-2/3 btn btn-primary">
              Kembalikan
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="pt-[50px]">
        <div class="grid md:grid-cols-2 gap-11">
          <!-- Documents -->
          <div>
            <!-- Section Header -->
            <div class="mb-[30px]">
              <div class="flex items-center justify-between gap-6">
                <div>
                  <div class="text-xl font-medium text-dark">Documents</div>
                  <p class="text-grey">Standard procedure</p>
                </div>
              </div>
            </div>
            <div class="card md:min-h-[468px]">
              <div class="m-auto text-center">
                <div class="text-xl font-bold text-dark">No Documents</div>
                <p class="text-grey mt-5 mb-[30px]">
                  Add guidance or design style for <br />
                  your employees in company
                </p>
                <button type="button" class="btn btn-primary">
                  Upload File
                </button>
              </div>
            </div>
          </div>

          <!-- History -->
          <div>
            <!-- Section Header -->
            <div class="mb-[30px]">
              <div class="flex items-center justify-between gap-6">
                <div>
                  <div class="text-xl font-medium text-dark">History</div>
                  <p class="text-grey">Track the flow</p>
                </div>
              </div>
            </div>
            <div class="card min-h-[468px]">
              <div class="m-auto text-center">
                <div class="text-xl font-bold text-dark">No History</div>
                <p class="text-grey mt-5 mb-[30px]">
                  Information of employees added <br />
                  and promoting shown here
                </p>
                <button type="button" class="btn btn-primary">
                  Upload File
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Raphael from 'raphael/raphael'
global.Raphael = Raphael
import { DonutChart } from 'vue-morris'
export default {
  middleware: 'auth',
  layout: 'dashboard',
  data() {
    return {
      items: [],
      procurements: [],
      goods: [],
    }
  },
  async fetch() {
    await this.$axios.get('/items?is_returned=0&limit=100').then((response) => {
      this.items = response.data.result.data
    })
    await this.$axios.get('/procurement').then((response) => {
      this.procurements = response.data.result.data
    })
    await this.$axios.get('/goods?is_available=1').then((response) => {
      this.goods = response.data.result.data
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
