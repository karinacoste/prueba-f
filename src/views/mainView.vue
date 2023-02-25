<template>
  <div class="flex w-full h-full min-h-screen min-w-fit bg-gray-100">
    <div class="w-full flex items-start justify-center pt-20">
      <div
        class="flex py-2 px-6 rounded-full bg-sesameGray2 items-center space-x-4"
      >
        <div>
          <span>04:05:06 </span>
          <span class="text-gray-400" v-if="!notWorkingNow">/ 07:00:53</span>
        </div>

        <CustomButton
          :text="startWorkingButtonText"
          :buttonClass="startWorkingButtonClass"
          @click="startWorking"
        ></CustomButton>

        <CustomButton
          v-if="!notWorkingNow"
          text="Salir"
          buttonClass="bg-sesameOrange w-40 text-white"
          @click="startWorking"
        ></CustomButton>

        <span class="h-6 w-0.5 bg-sesameGray3"></span>
        <div class="flex items-center">
          <CustomAvatar :image="userImage" :state="userState"></CustomAvatar>
        </div>
        <DropdownMenu :items="menuItems" userName="Kent Pierce"></DropdownMenu>
      </div>
    </div>
  </div>
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
import CustomButton from '../components/buttons/CustomButton.vue'
import CustomAvatar from '../components/CustomAvatar.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
const store = useStore()

let count = 0
export default defineComponent({
  components: { CustomButton, CustomAvatar, DropdownMenu },
  setup() {
    const userImage = ref('user-1-image')
    const userState = computed(() => {
      if (notWorkingNow.value) {
        return 'notWorking'
      } else {
        return 'working'
      }
    })
    const notWorkingNow = ref(true)
    const startWorking = () => {
      notWorkingNow.value = !notWorkingNow.value
      console.log('start working')
    }
    const startWorkingButtonText = computed(() => {
      if (notWorkingNow.value) {
        return 'Entrar'
      } else {
        return 'Pausar'
      }
    })
    const startWorkingButtonClass = computed(() => {
      if (notWorkingNow.value) {
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
      userState,
      userImage,
      menuItems,
      startWorking,
      startWorkingButtonClass,
      notWorkingNow,
      startWorkingButtonText,
    }
  },
})
</script>
