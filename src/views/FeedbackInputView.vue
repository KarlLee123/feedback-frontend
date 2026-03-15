<template>
  <div class="page">
    <h1>客户反馈整理工具</h1>
    <p class="desc">把客户评价或反馈粘贴进来，系统会帮你整理重点。</p>

    <textarea
      v-model="content"
      placeholder="请输入客户反馈内容"
      class="input-box"
    ></textarea>

    <div class="btn-area">
      <button @click="handleAnalyze" :disabled="loading">
        {{ loading ? '整理中...' : '开始整理' }}
      </button>
      <button @click="goToHistory" class="secondary">查看历史记录</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { analyzeFeedback } from '../api/feedback'

const router = useRouter()
const content = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleAnalyze = async () => {
  if (!content.value.trim()) {
    errorMessage.value = '请输入客户反馈内容'
    return
  }

  errorMessage.value = ''
  loading.value = true

  try {
    const response = await analyzeFeedback(content.value)

    sessionStorage.setItem('analyzeContent', content.value)
    sessionStorage.setItem('analyzeResult', JSON.stringify(response.data))

    router.push('/result')
  } catch (error) {
    console.error('调用分析接口失败：', error)

    if (error.response && error.response.data) {
      if (typeof error.response.data === 'string') {
        errorMessage.value = error.response.data
      } else if (error.response.data.message) {
        errorMessage.value = error.response.data.message
      } else {
        errorMessage.value = '分析失败，请稍后重试'
      }
    } else {
      errorMessage.value = '分析失败，请检查后端是否启动或网络是否正常'
    }
  } finally {
    loading.value = false
  }
}

const goToHistory = () => {
  router.push('/history')
}
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
}

.desc {
  color: #666;
  margin-bottom: 20px;
}

.input-box {
  width: 100%;
  height: 260px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
}

.btn-area {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #222;
  color: white;
  cursor: pointer;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}

button.secondary {
  background: #888;
}

.error {
  margin-top: 16px;
  color: #d9534f;
}
</style>