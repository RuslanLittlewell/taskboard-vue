<script setup>
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
</script>

<template>
  <div v-bind="forwardedAttrs" :class="cn('rounded-xl border bg-card text-card-foreground shadow', attrs.class)">
    <slot />
  </div>
</template>
