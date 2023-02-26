<template>
  <div class="flex">
    <div class="relative h-9 w-9 rounded-full">
      <div
        class="absolute z-10 h-4 w-4 rounded-full -right-2 top-2"
        :class="statusIconClass"
      ></div>
      <img :src="userImage" />
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect, watch, defineComponent } from 'vue'
export default {
  components: {},
  props: {
    image: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: 'offline',
    },
  },
  setup(props, context) {
    const userImage = computed(() =>
      require(`@/assets/images/${props.image}.png`)
    )
    const statusIconClass = computed(() => {
      return props.state === 'online' ? 'bg-green-400' : 'bg-gray-400'
    })
    return { userImage, statusIconClass }
  },
}
</script>
