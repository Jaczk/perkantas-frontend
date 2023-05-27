<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Form Peminjaman Barang</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Ketik Nama dan Email sesuai dengan ID anda
    </p>
    <form class="w-full card" @submit.prevent="createLoan">
      <div class="form-group">
        <label for="" class="text-grey">Nama</label>
        <input type="text" class="input-field" :placeholder="this.$store.state.auth.user.name"/>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Email</label>
        <input type="email" class="input-field" :placeholder="this.$store.state.auth.user.email"/>
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Buat Peminjaman
      </button>
    </form>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'UserForm',
  data() {
    return {
      currentLoanId: '',
    }
  },
  methods: {
    async createLoan() {
      try {
        // Send Registration Data to Server
        let response = await this.$axios.post('/loan')
        this.currentLoanId = response.data.result.id;
        this.$store.commit('loan/updateLoanId', this.currentLoanId);
        this.$router.push({ name: 'Loan-finish' })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>