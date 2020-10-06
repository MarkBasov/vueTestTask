<template>
  <div class="coordinates">
    <h1>Это страница для поиска погоды по координатам населенного пункта</h1>
    
    <div class="coordinates__body">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Координаты" aria-describedby="basic-addon1" v-bind:value="value" v-on:input="currentCoordinates">
        <button type="button" class="btn btn-info margin-left" v-on:click="doSearch">
          Найти
        </button>
      </div>
      <div class="coordinates__table">
        <div class="column" v-for="(column, index) in table" :key="index+'coordTbl'">
          <div class="header">
            {{ column.headerName }}
            <template v-if="column.sort">
              <div class="sort-arrow" v-on:click="doSort(column.headerName)">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                </svg>
              </div>
            </template>
          </div>
            <div class="body" v-for="(item, index) in column.info" :key="index+'coordBdy'">
              {{ item }}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCoordinatesValue: '',
      value: '',
      selectOpened: false,
      table: [
        {headerName: 'Населенный пункт', info: []},
        {headerName: 'Состояние погоды', info: []},
        {headerName: 'Температура', info: [], sort: true},
        {headerName: 'Скорость ветра', info: []},
        {headerName: 'Давление', info: [], sort: true},
        {headerName: 'Видимость (в милях)', info: []},
      ]
    }
  },
  methods: {
    /**
     * Метод, отвечающий за запоминание значения поля ввода в переменную
     */
    currentCoordinates(event) {
      this.currentCoordinatesValue = event.target.value;
    },
    /**
     * Метод, отвечающий за вывод информации по координатам
     */
    doSearch() {
      this.table[0].info = [];
      this.table[1].info = [];
      this.table[2].info = [];
      this.table[3].info = [];
      this.table[4].info = [];
      this.table[5].info = [];
      const axios = require('axios');
      axios({
        method: 'get',
        url: `https://www.metaweather.com//api/location/search/?lattlong=${this.currentCoordinatesValue}&distance=300000`
      })
        .then((response) => {
          response.data.map(item => {
          axios({
            method: 'get',
            url: `https://www.metaweather.com//api/location/${item.woeid}`
          })
            .then((response) => {
              this.table[0].info.push(response.data.title);
              this.table[1].info.push(response.data.consolidated_weather[0].weather_state_name);
              this.table[2].info.push(response.data.consolidated_weather[0].the_temp);
              this.table[3].info.push(response.data.consolidated_weather[0].wind_speed);
              this.table[4].info.push(response.data.consolidated_weather[0].air_pressure);
              this.table[5].info.push(response.data.consolidated_weather[0].visibility);
            });
          });
        });
    },
    /**
     * Метод отвечающий за сортировку
     */
    doSort(tmplName) {
      if (tmplName.toLowerCase() === 'температура') {
        this.table[2].info.sort(function (a, b) {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        });
      } else if (tmplName.toLowerCase() === 'давление') {
        this.table[4].info.sort(function (a, b) {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        });
      }
    },
  }
}
</script>
<style lang="less">
*{
  box-sizing: border-box;
}
.coordinates__body {
  .input-group {
    width: 200px;
    margin: 0 auto;
  }
  .margin-left {
    margin-left: 10px;
  }
  .coordinates__table {
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
      .sort-arrow {
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .body {
      display: flex;
      text-align: center;
      border: none;
      border: 1px solid #ccc;
      vertical-align: middle;
    }
  }
}
</style>
