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
  <div v-bind="forwardedAttrs" :class="cn('flex items-center p-6 pt-0', attrs.class)">
    <slot />
  </div>
</template>
