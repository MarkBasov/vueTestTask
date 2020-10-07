<template>
  <div class="cities">
    <h1>Эта страница для поиска погоды по городам</h1>
    <div class="cities__body">
      <div class="btn-group">
        <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" :class="{show: selectOpened}" v-on:click="{ selectOpened = !selectOpened; }">
          {{ currentValue }}
        </button>
        <div class="dropdown-menu" :class="{show: selectOpened}" >
          <template v-for="(item, index) in arrayValues" :key="index+'cities'" >
            <a class="dropdown-item" v-on:click="onSelect(item)">{{ item.location }}</a>
          </template>
        </div>
      </div>
      <div class="cities__table">
        <div class="column" v-for="(column, index) in table" :key="index+'cityTable'">
          <div class="header">
            Погода на {{ column.headerName }}
          </div>
          <template v-if="selectedCity">
            <div class="body">
              Состояние погоды: {{ column.info[0].weather_state_name }}
            </div>
            <div class="body">
              Температура: {{ column.info[0].the_temp }}
            </div>
            <div class="body">
              Скорость ветра: {{ column.info[0].wind_speed }}
            </div>
            <div class="body">
              Давление: {{ column.info[0].air_pressure }}
            </div>
            <div class="body">
              Видимость (в милях): {{ column.info[0].visibility }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentValue: 'Выберите город',
      selectedCity: false,
      arrayValues: [
        { location: 'Москва', uid: '2122265' },
        { location: 'Санкт-Петербург', uid: '2123260' },
        { location: 'Осака', uid: '15015370' },
        { location: 'Лондон', uid: '44418' },
        { location: 'Нью Йорк', uid: '2459115' },
        ],
      selectOpened: false,
      table: [
        {headerName: 'вчера', info: []},
        {headerName: 'сегодня', info: []},
        {headerName: 'завтра', info: []},
      ]
    }
  },
  methods: {
    /**
     * Метод, отвечающий за выбор города из списка
     */
    onSelect(item) {
      this.currentValue = item.location;
      this.selectOpened = false;
      this.selectedCity = true;

      //Информация за вчерашний день
      let date = new Date();
      date.setDate(date.getDate() - 1);
      let datas = {};
      let info = [];
      datas = { date: date, item: item };
      this.$store.dispatch('getCity', datas);
      info = this.$store.getter('cities');
      this.table[0].info = info;

      //Информация за сегодняшний день
      date = new Date();
      datas = { date: date, item: item };
      this.$store.dispatch('getCity', datas);
      info = this.$store.getter('cities');
      this.table[1].info = info;

      //Информация за завтрашний день
      date.setDate(date.getDate() + 1);
      datas = { date: date, item: item };
      this.$store.dispatch('getCity', datas);
      info = this.$store.getter('cities');
      this.table[2].info = info;
    }
  }
}
</script>

<style lang="less">
*{
  box-sizing: border-box;
}
.cities__table {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  margin-top: 80px;
  .column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .header {
    display: flex;
  }
  .body {
    display: flex;
    text-align: center;
    border: none;
    border: 1px solid #ccc;
    vertical-align: middle;
  }
}
</style>
