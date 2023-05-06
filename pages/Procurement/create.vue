<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">
      Form Permintaan Barang Baru
    </div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Perkantas menerima dengan senang hati <br />
      Segala bentuk komplain dan saran dari anda
    </p>
    <form class="w-full card" @submit.prevent="createProcurement">
      <div class="form-group">
        <label for="" class="text-grey">Nama Barang</label>
        <input
          type="text"
          class="input-field"
          v-model="procurement.goods_name"
        />
      </div>
      <div class="form-group">
        <label for="idRes" class="text-grey">Jumlah Barang</label>
        <input
          type="number"
          class="input-field"
          v-model="procurement.goods_amount"
        />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Alasan Permintaan</label>
        <textarea
          type="text"
          class="input-field"
          v-model="procurement.description"
        />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Ajukan Pengadaan
      </button>
    </form>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'forms',
  data() {
    return {
      procurement: {
        goods_name: '',
        goods_amount: '',
        description: '',
        user_id: this.$auth.user.id,
      },
    }
  },
  methods: {
    async createProcurement() {
      try {
        // Send Registration Data to Server
        let response = await this.$axios.post('/procurement', this.procurement)

        // Redirect to My procurementss Page
        this.$router.push({ name: 'Procurement' })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>