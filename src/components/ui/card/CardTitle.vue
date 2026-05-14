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
  <h3 v-bind="forwardedAttrs" :class="cn('font-semibold leading-none tracking-tight', attrs.class)">
    <slot />
  </h3>
</template>
