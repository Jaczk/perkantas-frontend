<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <!-- TODO: Ganti Logo Perkantas -->
    <img src="/assets/images/perkantas.png" style="max-width:25%" alt="" />
    <div class="text-[32px] font-semibold text-dark mt-[70px]">Sign Up</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Sistem Informasi Inventaris <br />
      Perkantas Semarang
    </p>
    <form class="w-full card" @submit.prevent="userRegister">
      <div class="form-group">
        <label for="" class="text-grey">Name</label>
        <input type="text" class="input-field" v-model="register.name" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Email Address</label>
        <input type="email" class="input-field" v-model="register.email" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Password</label>
        <input
          type="password"
          class="input-field"
          v-model="register.password"
        />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Phone Number</label>
        <input type="text" class="input-field" v-model="register.phone" />
      </div>
      <div class="font-semibold text-red-600" v-if="register.phone.length > 12">Tolong Masukkan no Telepon kurang dari 12 angka</div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Continue
      </button>
      <NuxtLink
        :to="{ name: 'login' }"
        class="w-full border btn btn-white"
      >
        Back to Login
      </NuxtLink>
    </form>
  </section>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
        phone: '',
      },
    }
  },
  methods: {
    async userRegister() {
      try {
        // Send Registration Data to Server
        let response = await this.$axios.post('/register', this.register)

        // if success, redirect to login page or Login User
        try {
          let login = await this.$auth.loginWith('local', {
            data: {
              email: this.register.email,
              password: this.register.password,
            },
          })
          console.log(login)
        } catch (err) {
          console.log(err)
        }
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>