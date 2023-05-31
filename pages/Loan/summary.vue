<template>
  <div>
    <section class="py-[70px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">
        Ringkasan Peminjaman
      </div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Daftar Barang yang kamu pinjam kali ini! <br />
        Batas Pengembalian Barang adalah
        <span class="text-lg font-bold text-red-600">2 Minggu</span> dihitung
        dari tanggal peminjaman.
      </p>
      <form class="w-full max-w-2xl card">
        <div class="flex flex-col items-center mb-[14px]">
          <div class="mt-6 mb-1 text-lg font-semibold">
            Daftar Barang Pinjaman
          </div>
        </div>
        <div class="form-group">
          <div class="grid w-full grid-cols-1 grid-rows-none">
            <div v-for="(item, index) in items" :key="item.id" :id="item.id">
              <div class="p-3">
                <div class="justify-end"><img
                      src="/assets/svgs/ric-close-white.svg"
                      alt=""
                      class="hover:cursor-pointer hover:opacity-50"
                      @click="deleteItems(item, index)"
                    /></div>
                <div class="font-semibold text-center text-dark justice-evenly">
                  <div>{{ item.good.goods_name }} ({{ item.good.id }}) </div>

                  <div>
                    <p
                      v-if="item.good.condition === 'broken'"
                      class="mt-1 font-bold text-center text-red-600 uppercase"
                    >
                      {{ item.good.condition }}
                    </p>
                    <p
                      v-else-if="item.good.condition === 'used'"
                      class="mt-1 font-bold text-center text-yellow-300 uppercase"
                    >
                      {{ item.good.condition }}
                    </p>
                    <p
                      v-else-if="item.good.condition === 'new'"
                      class="mt-1 font-bold text-center uppercase text-success"
                    >
                      {{ item.good.condition }}
                    </p>
                  </div>
                </div>
                <!-- <img :src="good.image" width="150" alt="" /> -->
                <p
                  class="mt-2 text-grey"
                  v-if="item.good.description.length < 75"
                >
                  {{ item.good.description }}
                </p>
                <p
                  class="mt-2 text-grey"
                  v-if="item.good.description.length >= 75"
                >
                  {{ item.good.description.substring(0, 75) + '...' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <NuxtLink
          :to="{ name: 'Loan' }"
          class="w-full btn btn-primary mt-[14px]"
        >
          <a href="" @click="deleteLoan()">Selesaikan Pinjaman</a>
        </NuxtLink>
      </form>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  middleware: 'auth',
  layout: 'UserForm',
  data() {
    return {
      items: [],
    }
  },
  async fetch() {
    let loanId = this.$store.state.loan.loan_id
    await this.$axios.get('/items?loan_id=' + loanId).then((response) => {
      this.items = response.data.result.data
    })
  },
  methods: {
    deleteItems(item, index) {
      this.$axios.put('/goods/' + item.good.id, {
        is_available: 1,
      })
      this.$axios.delete('/items/' + item.id)
      this.items.splice(index, 1)
      Swal.fire('Sukses!', 'Barang Berhasil Dihapus', 'warning')
    },
    // alert() {
    //   Swal.fire('Sukses!', 'Anda Berhasil Melakukan Peminjaman', 'success')
    // },
    deleteLoan() {
      if(this.items.length === 0){
        this.$axios.delete('/loan/' + this.$store.state.loan.loan_id)
        return Swal.fire('Warning!', 'Anda Tidak Melakukan Peminjaman', 'question')
      }
      return Swal.fire('Sukses!', 'Anda Berhasil Melakukan Peminjaman', 'success')
    },  
  },
}
</script>
