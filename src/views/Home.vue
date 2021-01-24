<template>
  <div>
    <div class="container">

      <!-- Поиск -->
      <div class="row mb-5">
        <div class="col-12 col-md-6 col-lg-4 mt-5 mx-auto">
          <label for="search">Enter the package name:</label>
          <b-form-input id="search" placeholder="Search" v-model="searchQuery" @input="showSearchLivePopup()"></b-form-input>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="table-wrap">

            <!-- таблица результатов -->
            <b-table v-if="packages" striped hover :items="packages ? packages.objects : []"  :per-page="perPage" :current-page="currentPage" :fields="fields">
              <template #cell(package_name)="row">
                  {{row.item.package.name}}
              </template>
              <template #cell(package_version)="row">
                  {{row.item.package.version}}
              </template>
              <template #cell(package_npm)="row">
                  {{row.item.package.links.npm}}
              </template>
              <template #cell(package_home_page)="row">
                  {{row.item.package.links.homepage}}
              </template>
              <template #cell(show_more)="row">
                <b-button size="sm" @click="showMore(row.item)" class="mr-2" v-b-modal.infoModal>
                  Details
                </b-button>
              </template>
            </b-table>
          </div>

          <!-- пагинация -->
          <b-pagination
            v-if="rows > 0"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            class="mt-3 mb-5"
          ></b-pagination>
          
        </div>
      </div>

      <!-- Модальное окно -->
      <b-modal id="infoModal" title="More info" ok-only>
        <div class="content">
          Package Name: {{modalData.packageName}} <br> <hr>
          Package Author: {{modalData.packageAuthorName}} <br> <hr>
          Package Author URL: {{modalData.packageAuthorUrl}} <br> <hr>
          Package Keywords: <span v-for="(key, index) in modalData.packageKeywords" :key="index">{{key}}, </span> <br> <hr>
          Package Version: {{modalData.packageVersion}} <br> <hr>
          Package Description: {{modalData.packageDescription}} <br> <hr>
          Package Npm: {{modalData.packageNpm}} <br> <hr>
          Package Home Page: {{modalData.packageHomePage}} 
        </div>
      </b-modal>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters} from "vuex";
export default {
  name: "Home",
  data(){
    return {
      currentPage: 1, // текущая страница пагинации
      perPage: 10, // кол-во предпоказов записей
      modalData:{ // детальная информация по пакету для модалки
        packageName: '', // Название пакета
        packageVersion: '', // Версия пакета
        packageAuthorName: '', // Имя автора пакета
        packageAuthorUrl: '', // Ссылка на автора или его github
        packageKeywords: [], // Ключевые слова
        packageDescription: '', // Описание пакета
        packageNpm: '', // Ссылка на установку через npm
        packageHomePage: '', // Страница пакета на github
      },
      searchQuery: '', // запрос поиска
      timeoutId: null, // таймаут для дебаунса
      fields: ['package_name', 'package_version', 'package_npm', 'package_home_page', 'show_more'], // поля таблицы результатов
    }
  },
  computed: {

    /*
    * Комьютид метод для получения общего кол-ва записей для пагинации
    */
    rows() {
      return this.packages ? this.packages.objects.length : 0
    },

    /*
    * Получение массива геттеров и store/index.js
    */
    ...mapGetters(['packages'])
  },
  methods: {

    /*
    * Метод, который формирует данные для вывода в модалку
    */
    showMore(row){
      this.modalData.packageName = row.package.name
      this.modalData.packageVersion = row.package.version
      this.modalData.packageAuthorName = row.package.author.name
      this.modalData.packageAuthorUrl = row.package.author.url
      this.modalData.packageKeywords = row.package.keywords
      this.modalData.packageDescription = row.package.description
      this.modalData.packageNpm = row.package.links.npm
      this.modalData.packageHomePage = row.package.links.homepage
    },

    /*
    * Обработчик запроса поиска с дебаунсом в 500мс
    */
    showSearchLivePopup () {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        this.getPackages(this.searchQuery)
        this.timeoutId = null;
      }, 500);
    },

    /*
    * Получение массива экшенов и store/index.js
    */
    ...mapActions(['getPackages'])
  },
};
</script>

<style lang="scss" scoped>
/* Вырввнивание пагинации по центру */
.pagination {
  justify-content: center;
}

/* Адаптация таблицы. На маленьких экранах добавил скролл как вариант решения для адаптации таблицы. */
.table-wrap{
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

/* для того чтобы на ширине 320 текст не вылазил за пределы модалки */
.modal-content{
  word-break: break-all;
}
</style>