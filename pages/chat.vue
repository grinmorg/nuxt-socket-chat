<template>
  <section class="chat">
    <div class="chat__wrap">
      <Message 
        v-for="(m, idx) in messages" :key="idx"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />
    </div>
    <div class="chat__form">
        <ChatForm />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Message from '@/components/Message'
import ChatForm from '@/components/ChatForm'
export default {
  middleware: "chat",
  computed: mapState(["user", "messages", "rooms"]),
  components: {
      Message,
      ChatForm
  }
};
</script>

<style scoped>
.chat {
    height: 100%;
    position: relative;
    overflow: hidden;
}

.chat__wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;
}

.chat__form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    padding: 1rem;
    background: #212121;
}
</style>
