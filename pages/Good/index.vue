<template>
  <!-- Main Content -->
  <div class="lg:pr-[70px] py-[50px] px-4 lg:pl-0 lg:ml-12">
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
        <div class="text-[32px] font-semibold text-dark">Katalog Barang</div>
      </div>
      <div class="flex items-center gap-4">
        <form class="shrink md:w-[516px] w-full">
          <input
            type="text"
            v-model="search"
            @keyup="getGoodData"
            class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
            placeholder="Cari Barang..."
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
            <div class="text-xl font-medium text-dark">Kategori</div>
            <p class="text-grey">Kategori Barang Perkantas Semarang</p>
          </div>
          <div>
            <select
              name="categories"
              id=""
              v-model="selectedCategory"
              class="appearance-none input-field form-icon-chevron_down"
            >
              <option
                :value="category.id"
                v-for="category in categories"
                :key="category.id"
              >
                {{ category.category_name }}
              </option>
            </select>
            <button
              @click="openCategory"
              class="border btn btn-primary mt-[14px]"
            >
              Buka Kategori
            </button>
          </div>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-6 lg:gap-5">
        <div
          class="card !gap-y-3 hover:bg-slate-100 hover:cursor-pointer"
          v-for="category in categories"
          :key="category.id"
        >
          <div class="flex flex-row items-center justify-between flex-nowrap">
            <div>
              <div class="text-[20px] font-bold text-grey">
                {{ category.category_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-[50px]">
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Daftar Barang</div>
            <p class="text-grey">Daftar Barang Perkantas Semarang</p>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
      >
        <div
          class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0 hover:bg-slate-200 hover:cursor-pointer"
          v-for="good in goods"
          :key="good.id"
        >
          <div class="mx-2 font-semibold text-center text-dark ">
            {{ good.goods_name }}
          </div>
          <img :src="good.image" width="150" class="mt-5" alt="" />
          <p
            v-if="good.condition === 'broken'"
            class="mt-5 font-bold text-center text-red-600 uppercase"
          >
            {{ good.condition }}
          </p>
          <p
            v-else-if="good.condition === 'used'"
            class="mt-5 font-bold text-center text-orange-400 uppercase"
          >
            {{ good.condition }}
          </p>
          <p
            v-else-if="good.condition === 'new'"
            class="mt-5 font-bold text-center uppercase text-success" 
          >
            {{ good.condition }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'dashboard',
  data() {
    return {
      goods: [],
      categories: [],
      selectedCategory: '',
      search: '',
    }
  },
  async fetch() {
    await this.$axios.get('/goods').then((response) => {
      this.goods = response.data.result.data
    })
    await this.$axios.get('/category').then((response) => {
      this.categories = response.data.result.data
    })
  },
  methods: {
    openCategory() {
      this.$router.push({
        name: 'Good-Categories-id',
        params: { id: this.selectedCategory },
      })
    },
    async getGoodData() {
      await this.$axios.get('/goods').then((response) => {
        this.goods = response.data.result.data
        if (this.search) {
          this.goods = response.data.result.data.filter((good) =>
            good.goods_name
              .toLowerCase()
              .includes(this.search.toLowerCase())
          )
        } else {
          this.goods = response.data.result.data
        }
      })
    },
  },
}
</script>