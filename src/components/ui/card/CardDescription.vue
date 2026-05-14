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
  <p v-bind="forwardedAttrs" :class="cn('text-sm text-muted-foreground', attrs.class)">
    <slot />
  </p>
</template>
