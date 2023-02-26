<template>
  <div class="flex w-full h-full min-h-screen min-w-fit bg-gray-100">
    <div class="w-full flex items-start justify-center pt-20">
      <div
        class="flex py-2 px-6 rounded-full bg-sesameGray2 items-center space-x-4"
      >
        <div>
          <span>{{ lastTimeWorked }} </span>
          <span class="text-gray-400" v-if="workStatus === 'online'"
            >/ {{ timeOnline }}</span
          >
        </div>

        <CustomButton
          :text="startWorkingButtonText"
          :buttonClass="startWorkingButtonClass"
          @click="startWorking"
        ></CustomButton>

        <CustomButton
          v-if="workStatus === 'online'"
          text="Salir"
          buttonClass="bg-sesameOrange w-40 text-white"
          @click="startWorking"
        ></CustomButton>

        <span class="h-6 w-0.5 bg-sesameGray3"></span>
        <div class="flex items-center">
          <CustomAvatar :image="userImage" :state="workStatus"></CustomAvatar>
        </div>
        <DropdownMenu
          :items="menuItems"
          popoverTarget="Kent Pierce"
        ></DropdownMenu>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { timeInterval } from '../assets/js/utils'

import CustomButton from '../components/buttons/CustomButton.vue'
import CustomAvatar from '../components/CustomAvatar.vue'
import DropdownMenu from '../components/DropdownMenu.vue'

export default defineComponent({
  components: { CustomButton, CustomAvatar, DropdownMenu },
  setup() {
    const store = useStore()
    store.dispatch('fetchWorkEntries')
    const workEntryIn = computed(() => {
      return store.state.workEntryIn
    })
    const lastTimeWorked = computed(() => {
      return store.state.lastTimeWorked
    })
    const getRealTimeOnline = () => {
      if (workEntryIn.value) {
        timeOnline.value = timeInterval(workEntryIn.value)
      }
    }
    const timeOnline = ref('00:00:00')
    setInterval(getRealTimeOnline, 1000)
    const lastWorkEntry = computed(() => {
      return store.getters.lastEntry
    })
    const workStatus = computed(() => {
      return store.getters.lastEntry
        ? store.getters.lastEntry.employee.workStatus
        : ''
    })
    const userImage = ref('user-1-image')

    const startWorking = async () => {
      if (workStatus.value === 'offline') {
        await store.dispatch('setWorkEntryIn')
        store.dispatch('fetchWorkEntries')
      } else {
        await store.dispatch('setWorkEntryOut')
        store.dispatch('fetchWorkEntries')
      }
    }
    const startWorkingButtonText = computed(() => {
      if (workStatus.value === 'offline') {
        return 'Entrar'
      } else {
        return 'Pausar'
      }
    })
    const startWorkingButtonClass = computed(() => {
      if (workStatus.value === 'offline') {
        return 'bg-sesameGreen w-40 text-white'
      } else {
        return 'bg-sesameGray5 w-40 text-white'
      }
    })
    const menuItems = [
      {
        name: 'Mis cuentas',
        submenu: [
          { type: 'account', accountId: 1, time: '00:00' },
          { type: 'account', accountId: 2, time: '00:00' },
        ],
      },
      {
        name: 'Vista empleado',
      },
      {
        name: 'Mi perfil',
      },
      {
        name: 'Cerrar sesión',
      },
    ]
    return {
      getRealTimeOnline,
      timeOnline,
      lastTimeWorked,
      workEntryIn,
      workStatus,
      lastWorkEntry,
      userImage,
      menuItems,
      startWorking,
      startWorkingButtonClass,
      startWorkingButtonText,
    }
  },
})
</script>
