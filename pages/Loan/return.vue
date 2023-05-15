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
          :value="loan_id"
          @change="updateLoanId"
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
  layout: 'UserForm',
  data() {
    return {
      loans: [],
      goods:[],
    }
  },
  async fetch() {
    await this.$axios.get('/loan', {
      params: {
        is_returned: 0,
      }
    }).then((response) => {
      this.loans = response.data.result.data
    })
  },
  computed: {
    loan_id() {
      return this.$store.state.loan.loan_id
    }
  },
  methods: {
    async fetchGoods() {
      await this.$axios.get('/items', {
        params: {
          loan_id: this.$store.state.loan.loan_id,
          limit: 100
        }
      }).then(({data}) => {
        this.goods = data.result.data
      })
    },
    updateLoanId(event){
      this.$store.commit('loan/updateLoanId', event.target.value)
      this.fetchGoods()
    },
    async updateLoan() {
      await this.$axios.put('/loan/update/' + this.$store.state.loan.loan_id, {
        is_returned: 1,
      })
      for (let i = 0; i < this.goods.length; i++) {
        await this.$axios.put('/goods/' + this.goods[i].good_id, {
          is_available: 1,
        })
      } 
      this.$router.push({ name: 'Loan' })
    },
  },
}
</script>