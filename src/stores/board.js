import { defineStore } from 'pinia'

const tagOptions = ['Discovery', 'Setup', 'Feature', 'QA', 'Bug', 'Design', 'Done']

const initialColumns = [
  {
    id: 'backlog',
    title: 'Backlog',
    accent: '#7c3aed',
    tasks: [
      {
        id: 'task-1',
        title: 'Посмотри как работает Vue 3 и Pinia',
        description: 'Зафиксировать в можечке.',
        tag: 'Discovery',
      },
    ],
  },
  {
    id: 'progress',
    title: 'In Progress',
    accent: '#0891b2',
    tasks: [
    ],
  },
  {
    id: 'review',
    title: 'Review',
    accent: '#f59e0b',
    tasks: [
    ],
  },
  {
    id: 'done',
    title: 'Done',
    accent: '#16a34a',
    tasks: [
    ],
  },
]

export const useBoardStore = defineStore('board', {
  state: () => ({
    columns: structuredClone(initialColumns),
    draggedTask: null,
    tagOptions,
  }),
  getters: {
    totalTasks: (state) => state.columns.reduce((total, column) => total + column.tasks.length, 0),
  },
  actions: {
    startDrag(columnId, taskId) {
      this.draggedTask = { columnId, taskId }
    },
    moveTask(targetColumnId) {
      if (!this.draggedTask) return

      const sourceColumn = this.columns.find((column) => column.id === this.draggedTask.columnId)
      const targetColumn = this.columns.find((column) => column.id === targetColumnId)

      if (!sourceColumn || !targetColumn) return

      const taskIndex = sourceColumn.tasks.findIndex((task) => task.id === this.draggedTask.taskId)
      if (taskIndex === -1) return

      const [task] = sourceColumn.tasks.splice(taskIndex, 1)
      targetColumn.tasks.push(task)
      this.draggedTask = null
    },
    resetDrag() {
      this.draggedTask = null
    },
    addTask(columnId, title, tag) {
      const trimmedTitle = title.trim()
      const column = this.columns.find((item) => item.id === columnId)

      if (!column || !trimmedTitle) return

      column.tasks.push({
        id: crypto.randomUUID(),
        title: trimmedTitle,
        description: 'Новая задача без описания.',
        tag,
      })
    },
    updateTask(taskId, values) {
      const task = this.columns.flatMap((column) => column.tasks).find((item) => item.id === taskId)

      if (!task) return

      task.title = values.title.trim()
      task.description = values.description.trim()
      task.tag = values.tag
    },
  },
})
