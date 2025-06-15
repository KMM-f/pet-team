<script setup lang="ts">
import { computed } from 'vue'

  const props = defineProps<{
    title: string,
    date: Date
}>()

  function dateToString(date:Date){
    console.log(date, 'АРГУМЕНТЫ ФУНКЦИИ dateToString')
    const year = date.getFullYear();
    let month:number|string =date.getMonth() + 1;
    let day:number|string =date.getDate();

    if(month < 10){
      month = '0' + month;
    }
    if(day < 10) {
      day = '0' + day
    }
    return `${day}-${month}-${year}`;
  }

  const dateString =computed(()=>{
    return dateToString(props.date)
  })

</script>

<template>
  <div class="meet__container">
    <div class="meet__title">{{props.title}}</div>
    <div class="meet__date">{{dateString}}</div>
  </div>
</template>

<style scroped lang="scss">
.meet {
  &__container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
  }

  &__title {
  }

  &__date {
  }
}

</style>