<script setup lang="ts">
  import {BaseButton} from '@/shared/ui';

  const urlImg=[
  'https://sun9-67.userapi.com/impg/sfLRbXu8_62ULwAaW_Em1tcLfr3qNGVVCO0yWw/uolvsC6anuc.jpg?size=1000x1500&quality=95&sign=58efb1e72788b281f4c74c3b681c40fc&type=album',
  'https://sun9-50.userapi.com/impg/AH1se3E4fi1mFPngZsxoPBfPrW0VxckjZZST1A/TDOyGzi0hUc.jpg?size=1000x1500&quality=95&sign=a7576c41b57bd0c5fc8bffb26d2a37de&type=album',
  'https://sun9-56.userapi.com/impg/L39BDzPue0bleRLLiTvXYDOXK35LiZuOkgZXjw/TqEP1UQ7Ab8.jpg?size=1500x1001&quality=95&sign=6091938d6dc244facf1dfc8ae2be8920&type=album',
  'https://sun9-48.userapi.com/impg/5Z0tepq-9NP1OwANURTBuScE19a2ExdVyAOE8A/oiZIb9Hmw90.jpg?size=1500x1036&quality=95&sign=578cad6c297718bc1d03b852a31fcefe&type=album',
  'https://sun9-24.userapi.com/impg/V6LtMXpvEOuYG9ovM4a2svV-bBzPA6A69e5v0g/r2KycXYrYH0.jpg?size=1500x1000&quality=95&sign=6597e403f63bc0ee8795caab21ab16b8&type=album',
  'https://sun9-58.userapi.com/impg/D6wlUjwTKNeFT3lezHNXmlQ0gtq8FQ1RjTHpgQ/tq5FiA6yvpE.jpg?size=2560x1709&quality=95&sign=d1333cbaa72589fdc29fe40f7f5df296&type=album',
  'https://sun9-22.userapi.com/impg/c849124/v849124514/13205a/Oa45m7v13Ig.jpg?size=2560x1707&quality=96&sign=019469e4902a3b3908fdcbe280a98622&type=album',
  'https://sun9-43.userapi.com/impg/c855728/v855728150/2218ef/AEBAZcj_BNE.jpg?size=1441x2160&quality=96&sign=2239fd4d60bf4ac8d69ba72e48db93d3&type=album',
  'https://sun9-74.userapi.com/impg/0R-jspPHoBRcQ6FSRW2xXDQJ0B2vEzOIaKaP3w/VWxz2Ozt-6g.jpg?size=2560x2399&quality=95&sign=674e7c84d48e9fe687ad3ee58e620cf9&type=album',
  'https://sun9-31.userapi.com/impg/BnjS-QUrrhRI8_ejiZbxotOeADF7ReVxQTTBCA/GCkRLC5KudE.jpg?size=2560x1828&quality=95&sign=5fb04f466ad13ef3531406905a55feac&type=album',
  'https://sun9-63.userapi.com/impg/dDqDtnDVOH-Uq_fDP5FvnuVrjG3Suzj_NoSJFA/OE9DTndkpSk.jpg?size=1067x1600&quality=95&sign=8b1015ce4ce1a14ea375bea3f694ab8c&type=album',
  'https://sun9-67.userapi.com/impg/sfLRbXu8_62ULwAaW_Em1tcLfr3qNGVVCO0yWw/uolvsC6anuc.jpg?size=1000x1500&quality=95&sign=58efb1e72788b281f4c74c3b681c40fc&type=album',
  'https://sun9-50.userapi.com/impg/AH1se3E4fi1mFPngZsxoPBfPrW0VxckjZZST1A/TDOyGzi0hUc.jpg?size=1000x1500&quality=95&sign=a7576c41b57bd0c5fc8bffb26d2a37de&type=album',
  'https://sun9-56.userapi.com/impg/L39BDzPue0bleRLLiTvXYDOXK35LiZuOkgZXjw/TqEP1UQ7Ab8.jpg?size=1500x1001&quality=95&sign=6091938d6dc244facf1dfc8ae2be8920&type=album',
  'https://sun9-48.userapi.com/impg/5Z0tepq-9NP1OwANURTBuScE19a2ExdVyAOE8A/oiZIb9Hmw90.jpg?size=1500x1036&quality=95&sign=578cad6c297718bc1d03b852a31fcefe&type=album',
  'https://sun9-24.userapi.com/impg/V6LtMXpvEOuYG9ovM4a2svV-bBzPA6A69e5v0g/r2KycXYrYH0.jpg?size=1500x1000&quality=95&sign=6597e403f63bc0ee8795caab21ab16b8&type=album',
  'https://sun9-58.userapi.com/impg/D6wlUjwTKNeFT3lezHNXmlQ0gtq8FQ1RjTHpgQ/tq5FiA6yvpE.jpg?size=2560x1709&quality=95&sign=d1333cbaa72589fdc29fe40f7f5df296&type=album',
  'https://sun9-22.userapi.com/impg/c849124/v849124514/13205a/Oa45m7v13Ig.jpg?size=2560x1707&quality=96&sign=019469e4902a3b3908fdcbe280a98622&type=album',
  'https://sun9-43.userapi.com/impg/c855728/v855728150/2218ef/AEBAZcj_BNE.jpg?size=1441x2160&quality=96&sign=2239fd4d60bf4ac8d69ba72e48db93d3&type=album',
  'https://sun9-74.userapi.com/impg/0R-jspPHoBRcQ6FSRW2xXDQJ0B2vEzOIaKaP3w/VWxz2Ozt-6g.jpg?size=2560x2399&quality=95&sign=674e7c84d48e9fe687ad3ee58e620cf9&type=album',
  'https://sun9-31.userapi.com/impg/BnjS-QUrrhRI8_ejiZbxotOeADF7ReVxQTTBCA/GCkRLC5KudE.jpg?size=2560x1828&quality=95&sign=5fb04f466ad13ef3531406905a55feac&type=album',
  'https://sun9-63.userapi.com/impg/dDqDtnDVOH-Uq_fDP5FvnuVrjG3Suzj_NoSJFA/OE9DTndkpSk.jpg?size=1067x1600&quality=95&sign=8b1015ce4ce1a14ea375bea3f694ab8c&type=album'
  ]
</script>

<template>
  <div class="meet-page__container">
    <div class="header">
      <div class="header__close">Закрыть</div>
      <h1 class="header__title">Название</h1>
      <h2 class="header__date">Дата</h2>
    </div>
    <div class="content">
      <div className="gallery__container">
        <div class="gallery__item" v-for="(url, index) in urlImg" :key="index">
          <img :src="url" alt="" class="gallery__img">
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer__add">
        <BaseButton class="footer__button"
          :width="170"
          :height="30"
          color='green'
        > Добавить фото
      </BaseButton>
      </div>
      <div class="footer__delete">
        <BaseButton class="footer__button"
          :width="170"
          :height="30"
          color='green'
        > Удалить мероприятие
      </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .meet-page__container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px 20px 10px;
  }
  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    &__close {
      align-self: flex-end;
      cursor: pointer;
    }

    &__title {
      align-self: center;
      font-size: 1.5rem;
    }

    &__date {
      align-self: center;
    }
  }
  .content {
    padding: 30px 0px;
  }
  .gallery {
    &__container{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

    }
    &__item {
      height: 100px;
      padding: 1px;
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    &__add {
      width: 100%;
    }

    &__delete {
      width: 100%;
    }

    &__button{
      width: 100%;
    }
  }

</style>
