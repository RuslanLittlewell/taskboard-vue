<script setup>
import { ref } from 'vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useBoardStore } from '@/stores/board'

const props = defineProps({
  columnId: {
    type: String,
    required: true,
  },
  task: {
    type: Object,
    required: true,
  },
})

const boardStore = useBoardStore()
const isEditing = ref(false)
const editedTitle = ref('')
const editedDescription = ref('')
const editedTag = ref('')

function startEditing() {
  editedTitle.value = props.task.title
  editedDescription.value = props.task.description
  editedTag.value = props.task.tag
  isEditing.value = true
}

function saveTask() {
  if (!editedTitle.value.trim()) return

  boardStore.updateTask(props.task.id, {
    title: editedTitle.value,
    description: editedDescription.value,
    tag: editedTag.value,
  })
  isEditing.value = false
}

function handleDragStart(event) {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', props.task.id)
  boardStore.startDrag(props.columnId, props.task.id)
}
</script>

<template>
  <Card
    class="task-card"
    :draggable="!isEditing"
    @dragstart="handleDragStart"
    @dragend="boardStore.resetDrag"
  >
    <CardContent class="task-card-content">
      <form v-if="isEditing" class="edit-task" @submit.prevent="saveTask">
        <Input
          v-model="editedTitle"
          type="text"
          aria-label="Название задачи"
          placeholder="Название задачи"
        />
        <Textarea
          v-model="editedDescription"
          aria-label="Описание задачи"
          placeholder="Описание задачи"
          rows="3"
        />
        <Select v-model="editedTag" aria-label="Тег задачи">
          <option
            v-for="tag in boardStore.tagOptions"
            :key="tag"
            :value="tag"
          >
            {{ tag }}
          </option>
        </Select>

        <div class="edit-actions">
          <Button type="submit" size="sm">Сохранить</Button>
          <Button type="button" size="sm" variant="outline" @click="isEditing = false">Отмена</Button>
        </div>
      </form>

      <template v-else>
        <div class="task-card-top">
          <Badge variant="secondary">{{ task.tag }}</Badge>
          <Button type="button" size="sm" variant="ghost" @click="startEditing">Изменить</Button>
        </div>
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </template>
    </CardContent>
  </Card>
</template>
