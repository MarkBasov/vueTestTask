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
            {{ column.headerName }}
          </div>
          <template v-if="selectedCity">
            <div class="body">
              Состояние погоды: {{ column.info[0].weather_state_name }}
            </div>
            <div class="body">
              Темп: {{ column.info[0].the_temp }}
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
      currentInfoAboutCity: [],
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
        {headerName: 'Вчера', info: []},
        {headerName: 'Сегодня', info: []},
        {headerName: 'Завтра', info: []},
      ]
    }
  },
  methods: {
    onSelect(item) {
      this.currentInfoAboutCity = item;
      this.currentValue = item.location;
      this.selectOpened = false;
      this.selectedCity = true;
      
      const axios = require('axios');
      let date = new Date();
      date.setDate(date.getDate() - 1);
      axios({
        method: 'get',
        url: `https://www.metaweather.com/api/location/${item.uid}/`+ date.toISOString().split('T')[0].replace(/-/g, '/')
      })
        .then((response) => {
          this.table[0].info = response.data;
        });
      
      date = new Date();
      axios({
        method: 'get',
        url: `https://www.metaweather.com/api/location/${item.uid}/`+ date.toISOString().split('T')[0].replace(/-/g, '/')
      })
        .then((response) => {
          this.table[1].info = response.data;
        });
      date.setDate(date.getDate() + 1);
      axios({
        method: 'get',
        url: `https://www.metaweather.com/api/location/${item.uid}/`+ date.toISOString().split('T')[0].replace(/-/g, '/')
      })
        .then((response) => {
          this.table[2].info = response.data;
        });
    }
  }
}
</script>

<style lang="less">
/* Dropdown Button */
.dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  /* Dropdown button on hover & focus */
  &:hover, &:focus {
    background-color: #2980B9;
  }
}
/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  &-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  &-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
}
/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  &:hover {
    background-color: #ddd;
  }
}
.show {display:block;}
*{
  box-sizing: border-box;
}
.cities__table {
  width: 1000px;
  margin: 0 auto;
  display: flex;
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
