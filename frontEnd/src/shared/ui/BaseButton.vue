<script setup lang="ts">
  import { type IconProps, BaseIcon} from "./base-icon";
  import { type RouteLocationRaw, RouterLink } from "vue-router";
  import { computed } from "vue";

  interface Props {
    width: number;
    height: number;
    color: string;
    fontSize?: string;
    to?: RouteLocationRaw;
    prependIcon?: string;
    prependIconColor?: string;
    prependIconSize?: IconProps["size"];
    appendIcon?: string;
    appendIconColor?: string;
    appendIconSize?: IconProps["size"];
  }
  const props = withDefaults(defineProps<Props>(), {
    width: undefined,
    height: undefined,
    color: undefined,
    fontSize: "16px",
    to: undefined,
    prependIcon: undefined,
    prependIconColor: undefined,
    prependIconSize: "12",
    appendIcon: undefined,
    appendIconColor: undefined,
    appendIconSize: "12",
  });

  const isLink = computed(() => {
    return !!props.to;
  });

  const componentButton = computed(() => {
    return isLink.value ? RouterLink : "button";
  });

  const width = `${props.width}px`;
  const height = `${props.height}px`;

</script>

<template>
  <component
    :is="componentButton"
    class="ui-button-text"
    :to="props.to"
    :style="{
      '--ui-button-width': width,
      '--ui-button-height': height,
      '--ui-button-bgcolor': props.color,
    }"
  >
    <BaseIcon
      v-if="prependIcon"
      :icon="prependIcon"
      class="ui-button-text__icon ui-button-text__prepend-icon"
      :style="{ '--color': `var(--${prependIconColor})` }"
      :size="prependIconSize"
    />
    <span class="ui-button-text__inner"
    :style="{
      '--ui-button-fz': props.fontSize,
    }">
      <slot />
    </span>
    <BaseIcon
      v-if="appendIcon"
      :icon="appendIcon"
      class="ui-button-text__icon ui-button-text__append-icon"
      :style="{ '--color': `var(--${appendIconColor})` }"
      size="12"
    />
  </component>
</template>

<style scoped lang="scss">
  .ui-button-text {
    appearance: none;
    display: inline-flex;
    vertical-align: top;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 20px;
    background-color:  var(--ui-button-bgcolor);
    opacity: 50;
    width: var(--ui-button-width);
    height: var(--ui-button-height);
    &:hover {
      opacity: 100;
      color: red;
    }

    &__prepend-icon {
      margin-right: 4px;
    }

    &__append-icon {
      margin-left: 4px;
    }

    &__icon {
      color: var(--color);
    }

    &__inner{
      font-size: var(--ui-button-fz);
    }
  }
</style>