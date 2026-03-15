<template>
  <div class="page">
    <h1>整理结果</h1>

    <div class="raw-text-card">
      <h2>原始反馈内容</h2>
      <p>{{ content || '暂无输入内容' }}</p>
    </div>

    <div class="card">
      <h2>大家最常夸什么</h2>
      <ul>
        <li v-for="item in result.goodPoints" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="card">
      <h2>大家最常吐槽什么</h2>
      <ul>
        <li v-for="item in result.badPoints" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="card">
      <h2>最常出现的问题</h2>
      <ul>
        <li v-for="item in result.commonProblems" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="card">
      <h2>宣传时可以强调什么</h2>
      <ul>
        <li v-for="item in result.marketingHighlights" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="btn-area">
      <button @click="goBack">返回输入页</button>
      <button @click="goToHistory" class="secondary">返回历史记录</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const content = sessionStorage.getItem('analyzeContent') || ''

const result = JSON.parse(sessionStorage.getItem('analyzeResult')) || {
  goodPoints: [],
  badPoints: [],
  commonProblems: [],
  marketingHighlights: []
}

const goBack = () => {
  router.push('/')
}

const goToHistory = () => {
  router.push('/history')
}
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 40px auto;
}

.raw-text-card,
.card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

ul {
  padding-left: 20px;
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

button.secondary {
  background: #666;
}
</style>