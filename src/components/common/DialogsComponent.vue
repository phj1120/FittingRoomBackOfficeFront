<template>
  <div class="text-center">
    <v-dialog v-model="props.dialog" width="auto" @click.passive="emits('handleClickDialogs')">
      <v-card>
        <v-card-text>
          <slot name="dialogContent"></slot>
        </v-card-text>
        <v-card-actions>
          <slot name="dialogBtn"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import {ref} from "vue";


  const props = defineProps(['dialog'])
  const emits = defineEmits(['handleClickDialogs'])
</script>

<style scoped>

</style>
