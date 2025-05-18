<script setup lang="ts">
  import {BaseButton} from '@/shared/ui';

  const emit = defineEmits<{
    closePopUp: [event: Event],
    putPoint:[event: Event]
  }>()
</script>

<template>
  <div class="popup__container">
    <div class="popup__close" @click="emit('closePopUp', $event)">
      <img class="img__cross" src="/src/shared/assets/icons/cross_icon-icons.com_72347.png" alt="">
    </div>
    <BaseButton @click="emit('putPoint', $event)"
      :width="260"
      :height="60"
      color="aqua"
      font-size="20px">
      Добавить мероприятие!
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
  .popup {
    &__container {
      width: 300px;
      height: 150px;
      background-color: white;
      padding: 10px 10px 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-radius: 0 20px 20px 20px;
    }

    &__close {
      align-self: flex-end;
    }

    &__button {
      width: 250px;
      height: 60px;
      align-self: center;
      font-size: 20px;
      background-color: aqua;
      border-radius: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .img {

    &__cross {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }

</style>
