<template>
  <div>
    <section class="py-[70px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Pilih Barang</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Pilih Barang Yang akan Anda Pinjam! <br />
        Batas Pengembalian Barang adalah
        <span class="text-lg font-bold">2 Minggu</span> dihitung dari tanggal
        peminjaman.
      </p>
      <form class="w-full max-w-2xl card">
        <div class="flex flex-col items-center mb-[14px]">
          <div class="mt-6 mb-1 text-lg font-semibold">
            Daftar Barang yang Tersedia
          </div>
        </div>
        <div class="form-group">
          <div class="grid grid-cols-2 grid-rows-none">
            <a
              class="card !gap-y-0 bg-white hover:bg-sky-500 border-solid border-2 border-indigo-100"
              v-for="good in goods"
              :key="good.id"
              :id="good.id"
              @click="addItem($event)"
            >
              <div class="p-3">
                <div
                  class="font-semibold text-center text-dark justice-between"
                >
                  <div>{{ good.goods_name }} ({{ good.id }})</div>
                  <div>
                    <p
                      v-if="good.condition === 'broken'"
                      class="mt-1 font-bold text-center text-red-600 uppercase"
                    >
                      {{ good.condition }}
                    </p>
                    <p
                      v-else-if="good.condition === 'used'"
                      class="mt-1 font-bold text-center text-yellow-300 uppercase"
                    >
                      {{ good.condition }}
                    </p>
                    <p
                      v-else-if="good.condition === 'new'"
                      class="mt-1 font-bold text-center uppercase text-success"
                    >
                      {{ good.condition }}
                    </p>
                  </div>
                </div>
                <!-- <img :src="good.image" width="150" alt="" /> -->
                <p class="mt-2 text-grey" v-if="good.description.length < 25">
                  {{ good.description }}
                </p>
                <p class="mt-2 text-grey" v-if="good.description.length >= 25">
                  {{ good.description.substring(0, 25) + '...' }}
                </p>
                <div class="justice-between"></div>
              </div>
            </a>
          </div>
        </div>
        <NuxtLink
          :to="{ name: 'Loan-summary' }"
          class="w-full btn btn-primary mt-[14px]"
        >
          Lihat Ringkasan Peminjaman
        </NuxtLink>
      </form>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  middleware: 'auth',
  layout: 'UserForm',
  data() {
    return {
      goods: [],
      selectedItems: '',
    }
  },
  async fetch() {
    await this.$axios.get('/goods?is_available=1').then((response) => {
      this.goods = response.data.result.data
    })
  },
  computed: {
    currentGoodId() {
      return this.$store.state.loan.good_id
    },
  },
  methods: {
    async addItem(event) {
      Swal.fire('Success!', 'Barang berhasil ditambahkan', 'success');
      this.selectedItems = event.currentTarget.id
      this.selectedItems = parseInt(this.selectedItems)
      this.$store.commit('loan/updateGoodId', this.selectedItems)
      await this.$axios.post('/items', {
        good_id: this.$store.state.loan.good_id,
        loan_id: this.$store.state.loan.loan_id,
        user_id: this.$auth.user.id,
      })
      this.$axios.put('/goods/' + this.$store.state.loan.good_id, {
        is_available: 0,
      })
      this.$store.commit('loan/updateGoodId', '')
    },
  },
}
</script>
