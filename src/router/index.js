import { createRouter, createWebHistory } from 'vue-router'
import FeedbackInputView from '../views/FeedbackInputView.vue'
import FeedbackResultView from '../views/FeedbackResultView.vue'
import HistoryView from '../views/HistoryView.vue'

const routes = [
  {
    path: '/',
    name: 'input',
    component: FeedbackInputView
  },
  {
    path: '/result',
    name: 'result',
    component: FeedbackResultView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router