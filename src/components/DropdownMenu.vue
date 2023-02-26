<template>
  <div class="flex">
    <!-- /////////////////////// -->
    <VMenu placement="bottom-end" :distance="18">
      <!-- This will be the popover target (for the events and position) -->
      <button class="flex ml-6 font-medium text-center items-center">
        {{ popoverTarget }}

        <span class="flex w-3 ml-4 mt-1"><ChevronDownIcon /></span>
      </button>
      <!-- This will be the content of the popover -->
      <template #popper="{ hide }">
        <div class="flex left-0">
          <ul class="w-96" @click="hide()">
            <li
              v-for="(item, index) in items"
              :key="index"
              class="border-b h-16 py-2 text-gray-red border-gray-200 flex items-center justify-center hover:bg-sesameGreen2 cursor-pointer"
            >
              <VMenu v-if="item.submenu" placement="left-start" :skidding="-22">
                <!-- This will be the popover target (for the events and position) -->
                <div class="flex h-full w-96 items-center justify-center">
                  <div class="absolute z-10 left-0 w-3 ml-4 mt-1">
                    <ChevronDownIcon
                      class="transition-transform duration-300 rotate-90"
                    />
                  </div>
                  {{ item.name }}
                </div>
                <!-- This will be the content of the popover -->
                <template #popper="{ hide }">
                  <div @click="hide()">
                    <ul class="w-96">
                      <li
                        v-for="(submenuItem, index) in item.submenu"
                        :key="index"
                        class="border-b h-16 py-2 text-gray-500 border-gray-200 flex items-center justify-cente hover:bg-sesameGreen2 cursor-pointer"
                      >
                        <div
                          v-if="submenuItem.type === 'account'"
                          class="flex w-96 items-center pl-8"
                        >
                          <div
                            class="flex h-9 w-9 rounded-full font-semibold text-sm items-center justify-center bg-sesameGray2 border border-sesameGray4"
                          >
                            <span class="flex">S{{ index + 1 }}</span>
                          </div>
                          <div class="ml-3">
                            <span class="font-bold"
                              >Sesame{{ index + 1 }}
                            </span>
                            <span class="ml-2"> {{ popoverTarget }}</span>
                            <div class="w-full -mt-1 text-gray-400">
                              Hoy llevas 00:00
                            </div>
                          </div>
                        </div>
                        <div v-else class="w-96">
                          {{ submenuItem.accountId }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </template>
              </VMenu>

              <div v-else class="flex h-full w-96 items-center justify-center">
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>
      </template>
    </VMenu>
  </div>
</template>

<script>
import ChevronDownIcon from '../components/icons/ChevronDownIcon.vue'
import { ref, computed, watchEffect, watch, defineComponent } from 'vue'

export default {
  components: { ChevronDownIcon },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    popoverTarget: {
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
<style scoped></style>
