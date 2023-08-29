<script setup lang="ts">
import { ref } from "vue";

function asTemporal(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const text = `${min} min`;
  return sec > 0 ? `${text} ${sec} s` : text;
}

const props = defineProps({
  initial: {
    default: 0,
  },
  danger: {
    default: 60,
  },
  warning: {
    default: 30,
  },
});

const initialSeconds = props.initial * 60;
const remaining = ref(initialSeconds);
const text = ref(asTemporal(initialSeconds));
let intervalId;

const startCounter = () => {
  intervalId = setInterval(() => {
    if (remaining.value > 0) {
      remaining.value--;
      text.value = asTemporal(remaining.value);
    }
  }, 1000);
};

const resetTimer = () => {
  clearInterval(intervalId);
  remaining.value = props.initial * 60;
  text.value = asTemporal(remaining.value);
};
</script>

<template>
  <div
    flex="~"
    w="max"
    border="~ main rounded-md"
    :class="{
      'timer-warning': remaining < props.warning && remaining > props.danger,
      'timer-danger': remaining <= props.danger,
    }"
  >
    <span m="auto" p="2" bg="white" v-if="remaining > 0">{{ text }}</span>
    <span bg="white" m="auto" p="2" v-else @click="resetTimer">STOP!!!</span>
    <button
      border="l main"
      p="2"
      font="mono"
      outline="!none"
      bg="white"
      hover:bg="gray-400 opacity-20"
      @click="startCounter"
      v-if="remaining === props.initial * 60"
    >
      Start
    </button>
  </div>
</template>

<style>
.timer-danger {
  background: #ff5757;
}
.timer-warning {
  background: #fafa93;
}
</style>
