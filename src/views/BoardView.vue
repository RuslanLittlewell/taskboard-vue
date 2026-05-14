<script setup>
import { storeToRefs } from 'pinia'

import TaskColumn from '@/components/TaskColumn.vue'
import { useBoardStore } from '@/stores/board'

const boardStore = useBoardStore()
const { columns } = storeToRefs(boardStore)
</script>

<template>
  <main class="shell">
    <section class="board" aria-label="Task board">
      <TaskColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
      />
    </section>
  </main>
</template>
