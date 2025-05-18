<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${parseInt(iconWidth)} ${parseInt(iconHeight)}`"
    fill="currentColor"
    class="ui-icon"
    :style="{
      '--ui-icon-width': iconWidth,
      '--ui-icon-height': iconHeight
    }"
    :width="iconWidth"
    :height="iconHeight"
  >
    <g>
      <component :is="projectIcon" />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { type Component, computed, defineAsyncComponent, shallowRef, watch } from "vue";
import { type IconProps} from "./BaseIcon";

const props = withDefaults(defineProps<IconProps>(), {
  width: undefined,
  height: undefined,
  size: "24",
});

const projectIcon = shallowRef<Component | null>(null);

watch(() => props.icon, () => {
  projectIcon.value = defineAsyncComponent<Component>(() => import(`../../assets/icons/${props.icon}.svg`));
}, { immediate: true });

const iconWidth = computed(() => `${props.width ?? props.size}px`);
const iconHeight = computed(() => `${props.height ?? props.size}px`);
</script>

<style lang="scss" scoped>
.ui-icon {
  width: var(--ui-icon-width);
  height: var(--ui-icon-height);
}
</style>
