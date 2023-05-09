<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Empower Your Team</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Add your new people to grow the <br />
      company reaching their goals
    </p>
    <form class="w-full card" @submit.prevent="updateLoan">
      <div class="form-group">
        <label for="" class="text-grey">Pilih Peminjaman</label>
        <select
          name="loans"
          id=""
          v-model="selectedLoans"
          class="appearance-none input-field form-icon-chevron_down"
        >
          <option :value="loan.id" v-for="loan in loans" :key="loan.id">
            {{ loan.id }}
          </option>
        </select>
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Kembalikan
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
      loans: [],
      goods:[],
      selectedLoans: '',
    }
  },
  async fetch() {
    await this.$axios.get('/loan').then((response) => {
      this.loans = response.data.result.data
    })
    await this.$axios.get('/goods?is_returned=0').then((response) => {
      this.goods = response.data.result.data
    })
  },
  methods: {
    async updateLoan() {
      await this.$axios.put('/loan/update/' + this.selectedLoans, {
        is_returned: 1,
      })
      this.$router.push({ name: 'Loan' })
    },
  },
}
</script>