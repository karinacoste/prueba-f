<template>
  <div class="flex w-full h-full min-h-screen min-w-fit bg-gray-100"></div>
</template>

<script>
// @ is an alias to /src

import { ref, computed, watchEffect, watch, defineComponent } from 'vue'
import { useStore } from 'vuex'

import {
  addDays,
  getTime,
  endOfWeek,
  startOfISOWeek,
  endOfISOWeek,
  getWeek,
  getISOWeek,
  format,
  formatISO,
} from 'date-fns'
const store = useStore()

let count = 0
export default defineComponent({
  components: {},
  setup() {
    const store = useStore()

    let currentDate = new Date()
    let selectedYear = (date) => {
      return date.getFullYear() || currentDate.getFullYear()
    }

    const weekNumber = (date) => {
      // const timestamp = dateFromFirebase.toDate()
      return getISOWeek(date)
    }
    const startOfWeek = (date) => {
      return format(startOfISOWeek(date), 'd-M')
    }

    const endOfWeek = (date) => {
      return format(endOfISOWeek(date), 'd-M-Y')
    }
    const daysPerWeeks = new Date(2022, 0, 295)

    return {
      startOfWeek,
      endOfWeek,
      weekNumber,
      selectedYear,
    }
  },
})
</script>
<style scoped>
.modal h1 {
  font-size: 30px;
}
.vue-universal-modal {
  /* Change dimmed color */
  background-color: rgba(255, 255, 0, 0.3) !important;
}
.vue-universal-modal-content {
  /* Align to top (flex-direction property value is set to column) */
  background-color: rgba(255, 255, 0, 0.3) !important;
}
</style>
