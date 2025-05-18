<script setup lang="ts">
  import { ref, onMounted, computed} from 'vue';

  const emit = defineEmits<{
    (e: 'changeYear', event: Event): void,
    (e: 'changeMonth', event: Event): void,
    (e: 'changeDay', event: Event): void
  }>()

  const props = defineProps({
    title: String,
  })
  const year = ref('noselect')
  const month = ref('noselect')
  const day = ref('noselect')

  const daysInMonth= ref<31|30|29|28>(31);

  const currentYear = new Date().getFullYear();
  const currentMonth= new Date().getMonth();
  const currentDate = new Date().getDate();

  const isYearArrived = computed(()=> {
    return +year.value === currentYear ? false : true;
  })

  const isSelectCurrentMonth = computed(()=>{
    if (!isYearArrived.value) {
      return +month.value === (currentMonth + 1) ? true : false;
    } else {
      return false
    }
  })

  function selectLastDayInMonth () {
    if(daysInMonth.value === 28 && +day.value > 28) {
      day.value = '28';
    } else if(daysInMonth.value === 29 && +day.value > 29) {
      day.value = '29';
    } else if(daysInMonth.value === 30 && +day.value > 30) {
      day.value = '30';
    }
  }

  function removeFutureDay () {
    const selectDayElem = document.getElementById("select-day") as HTMLSelectElement;
    const optionsDayList = selectDayElem.querySelectorAll('option')
    console.log('isSelectCurrentMonth:', isSelectCurrentMonth.value )
    if(isSelectCurrentMonth.value){
      for (let i = currentDate; i < 31; i++) {
        optionsDayList[i+1].style.display = 'none';
    }
    } else{//Включаем обратно все месяца,после выбора прошедшего года.
        for(let i = 1; i <= 32; i++){
          optionsDayList[i+1].style.display = '';
        }
      }
  }

  onMounted(()=>{
    for (let year = currentYear; year >= 1900; year--) {
      const optionsEl = document.createElement("OPTION");
      const selectEl =document.getElementById("select-year");
      if(selectEl) {
        selectEl.appendChild(optionsEl).innerHTML = `${year}`;
        optionsEl.setAttribute('value', `${year}`)
      }
    }
  })

  function handlerSelectMonth (){
    const isLeapYear = (+year.value - 1900) % 4 === 0;
    const listOfMonth31 =['01','03','05','07','08','10','12'];
    if(month.value === '02'){//Если месяц февраль
      if(isLeapYear){//Высокосный год
        daysInMonth.value = 29;
      } else{
        daysInMonth.value = 28;
      }
    } else{//Любой месяц, кроме февраля
      const isMonth31 =listOfMonth31.includes(month.value);
      if(isMonth31){
        daysInMonth.value = 31;
      } else {
        daysInMonth.value = 30;
      }
    }
    selectLastDayInMonth();
    removeFutureDay();
  }
</script>

<template>
  <div class="select-date__container">
    <div class="select-date__label">{{ props.title }}</div>
    <div class="select-date__form form">
      <select v-model="year"
      name="year"
      id="select-year"
      class="form__year"
      @change="emit('changeYear', $event)">
        <option value="noselect" selected disabled>Год</option>
      </select>
      <select v-model="month"
      name="month"
      id="select-month"
      class="form__month"
      @change="handlerSelectMonth(); emit('changeMonth', $event)">
        <option value="noselect" selected disabled>Месяц</option>
        <option value="01">Январь</option>
        <option value="02" v-if="isYearArrived || currentMonth >= 1">Февраль</option>
        <option value="03" v-if="isYearArrived || currentMonth >= 2">Март</option>
        <option value="04" v-if="isYearArrived || currentMonth >= 3">Апрель</option>
        <option value="05" v-if="isYearArrived || currentMonth >= 4">Май</option>
        <option value="06" v-if="isYearArrived || currentMonth >= 5">Июнь</option>
        <option value="07" v-if="isYearArrived || currentMonth >= 6">Июль</option>
        <option value="08" v-if="isYearArrived || currentMonth >= 7">Август</option>
        <option value="09" v-if="isYearArrived || currentMonth >= 8">Сентабрь</option>
        <option value="10" v-if="isYearArrived || currentMonth >= 9">Октябрь</option>
        <option value="11" v-if="isYearArrived || currentMonth >= 10">Ноябрь</option>
        <option value="12" v-if="isYearArrived || currentMonth >= 11">Декабрь</option>
      </select>
      <select v-model="day"
      name="day"
      id="select-day"
      class="form__day"
      @change="emit('changeDay', $event)">
        <option value="noselect" selected disabled>Число</option>
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29" v-if="daysInMonth >= 29">29</option>
        <option value="30" v-if="daysInMonth >= 30">30</option>
        <option value="31" v-if="daysInMonth === 31">31</option>
      </select>
    </div>
  </div>

</template>

<style scoped lang="scss">
  .select-date {
    &__container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    &__label {
      margin-bottom: 20px;
    }

    &__form {
      display: flex;
      justify-content: space-between;
    }
    }
  .select-date__form > select{
    text-align: center;
    width: 85px;
    border: 1px solid gray;
    border-radius: 5px;
    &:not(:last-child){
      margin-right: 10px;
    }
  }
  option{
    text-align: center;
  }
</style>