<template>
  <div class="flex">
    <div class="relative h-9 w-9 rounded-full">
      <div
        class="absolute z-10 h-4 w-4 bg-green-400 rounded-full -right-2 top-2"
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
      default: '',
    },
  },
  setup(props, context) {
    const userImage = computed(() =>
      require(`@/assets/images/${props.image}.png`)
    )
    return { userImage }
  },
}
</script>
