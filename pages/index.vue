<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card class="pa-4">
        <v-card-title><h1>Entry your name or nickname</h1></v-card-title>
        <v-form ref="form" v-model="valid" @submit.prevent="submit" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="16"
            :rules="nameRules"
            label="Ваше имя"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Start
          </v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: "empty",
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Введите имя",
      v => (v && v.length <= 16) || "Макс. значение 16 символов"
    ],
  }),

  methods: {
    ...mapMutations(['setUser']),
    submit() {
      if(this.$refs.form.validate()) {
        const user = {
          name: this.name
        }

        this.$socket.emit('userJoined', user, data => {
          if(typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId
            user.room = data.userRoom
            this.setUser(user)
            this.$router.push('/chat')
          }
        })
      }
    },
  }
};
</script>
