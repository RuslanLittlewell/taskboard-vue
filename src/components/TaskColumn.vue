<script setup>
import { ref } from 'vue'

import TaskCard from '@/components/TaskCard.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useBoardStore } from '@/stores/board'

defineProps({
  column: {
    type: Object,
    required: true,
  },
})

const boardStore = useBoardStore()
const draftTitle = ref('')
const draftTag = ref(boardStore.tagOptions[0])

function addTask(columnId) {
  boardStore.addTask(columnId, draftTitle.value, draftTag.value)
  draftTitle.value = ''
}
</script>

<template>
  <Card
    class="column"
    @dragover.prevent
    @drop="boardStore.moveTask(column.id)"
  >
    <CardHeader class="column-header" :style="{ '--accent': column.accent }">
      <div>
        <CardTitle>{{ column.title }}</CardTitle>
        <p class="column-count">{{ column.tasks.length }} задач</p>
      </div>
      <Badge class="column-badge" variant="secondary">{{ column.tasks.length }}</Badge>
    </CardHeader>

    <CardContent class="task-list">
      <TaskCard
        v-for="task in column.tasks"
        :key="task.id"
        :column-id="column.id"
        :task="task"
      />

      <p v-if="column.tasks.length === 0" class="empty-state">
        Перетащи задачу сюда
      </p>
    </CardContent>

    <CardFooter>
      <form class="add-task" @submit.prevent="addTask(column.id)">
      <Input
        v-model="draftTitle"
        type="text"
        placeholder="Новая задача"
        :aria-label="`Добавить задачу в ${column.title}`"
      />
      <Select v-model="draftTag" :aria-label="`Выбрать тег для ${column.title}`">
        <option
          v-for="tag in boardStore.tagOptions"
          :key="tag"
          :value="tag"
        >
          {{ tag }}
        </option>
      </Select>
      <Button type="submit">Добавить</Button>
      </form>
    </CardFooter>
  </Card>
</template>
