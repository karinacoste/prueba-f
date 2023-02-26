<template>
  <div
    :class="buttonClass"
    class="rounded-3xl h-8 py-1 cursor-pointer flex items-center justify-center focus:outline-none font-semibold"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: 'Guardar',
    },
    buttonClass: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {},
}
</script>
