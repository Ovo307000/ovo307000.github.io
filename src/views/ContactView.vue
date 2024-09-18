<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const submitForm = () => {
  // 这里可以添加表单提交逻辑
  console.log('Form submitted:', { name: name.value, email: email.value, message: message.value })
  alert('感谢您的留言！我会尽快回复。')
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <div class="contact">
    <h1>联系我</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">姓名：</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">邮箱：</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="message">留言：</label>
        <textarea id="message" v-model="message" required></textarea>
      </div>
      <button type="submit">发送</button>
    </form>
  </div>
</template>

<style scoped>
.contact {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 150px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3aa876;
}
</style>
