<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <!--TODO: Ganti Logo Perkantas -->
    <img src="/assets/images/perkantas.png" style="max-width:25%" alt="" />
    <div class="text-[32px] font-semibold text-dark mt-[70px]">Sign In</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Sistem Informasi Inventaris Perkantas Semarang
    </p>
    <form class="w-full card" @submit.prevent="userLogin">
      <div class="form-group">
        <label for="" class="text-grey">Email Address</label>
        <input type="email" class="input-field" v-model="login.email" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Password</label>
        <input type="password" class="input-field" v-model="login.password" />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Sign In
      </button>
      <div class="text-center">Don't Have Account?</div>
      <NuxtLink
        :to="{ name: 'register' }"
        class="w-full border btn btn-white"
      >
        Register
      </NuxtLink>
    </form>
  </section>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>