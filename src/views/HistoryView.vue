<template>
  <div class="page">
    <h1>历史记录</h1>
    <p>这里展示历史分析记录。</p>

    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <div v-if="loading">加载中...</div>
    <div v-else-if="records.length === 0">暂无历史记录</div>

    <ul v-else class="history-list">
      <li v-for="item in records" :key="item.id" class="history-item">
        <div class="record-content">
          <div class="record-text">{{ formatText(item.rawText) }}</div>
          <div class="record-time">{{ formatTime(item.createdAt) }}</div>
        </div>

        <div class="btn-group">
          <button class="detail-btn" @click="handleViewDetail(item.id)">查看详情</button>
          <button class="delete-btn" @click="handleDelete(item.id)">删除</button>
        </div>
      </li>
    </ul>

    <button @click="goBack">返回输入页</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { deleteRecord, getRecordDetail, getRecordList } from '../api/feedback'

const router = useRouter()
const records = ref([])
const loading = ref(false)
const message = ref('')
const errorMessage = ref('')

const loadRecords = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await getRecordList()
    records.value = response.data
  } catch (error) {
    console.error('获取历史记录失败：', error)
    errorMessage.value = '获取历史记录失败，请检查后端是否正常运行'
  } finally {
    loading.value = false
  }
}

const handleViewDetail = async (id) => {
  errorMessage.value = ''
  message.value = ''

  try {
    const response = await getRecordDetail(id)

    sessionStorage.setItem('analyzeContent', response.data.rawText)
    sessionStorage.setItem(
      'analyzeResult',
      JSON.stringify({
        goodPoints: response.data.goodPoints,
        badPoints: response.data.badPoints,
        commonProblems: response.data.commonProblems,
        marketingHighlights: response.data.marketingHighlights
      })
    )

    router.push('/result')
  } catch (error) {
    console.error('获取详情失败：', error)
    errorMessage.value = '获取详情失败，请稍后重试'
  }
}

const handleDelete = async (id) => {
  errorMessage.value = ''
  message.value = ''

  const confirmed = window.confirm('确定要删除这条历史记录吗？')
  if (!confirmed) {
    return
  }

  try {
    await deleteRecord(id)
    message.value = '删除成功'
    await loadRecords()
  } catch (error) {
    console.error('删除记录失败：', error)
    errorMessage.value = '删除失败，请稍后重试'
  }
}

const goBack = () => {
  router.push('/')
}

const formatText = (text) => {
  if (!text) return ''
  if (text.length <= 20) return text
  return text.slice(0, 20) + '...'
}

const formatTime = (time) => {
  if (!time) return ''

  const date = new Date(time)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}`
}

onMounted(() => {
  loadRecords()
})
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
}

.message {
  color: #2d8a34;
  margin-bottom: 12px;
}

.error {
  color: #d9534f;
  margin-bottom: 12px;
}

.history-list {
  margin: 20px 0;
  padding: 0;
  list-style: none;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}

.record-content {
  flex: 1;
}

.record-text {
  font-size: 15px;
  color: #222;
  margin-bottom: 6px;
}

.record-time {
  font-size: 13px;
  color: #888;
}

.btn-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #222;
  color: white;
  cursor: pointer;
}

.detail-btn {
  background: #5b8def;
}

.delete-btn {
  background: #d9534f;
}
</style>