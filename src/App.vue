<template>
  <div class="screen">
    <div class="screen__wrapper">
      <header class="header">
        <div class="header__logo header__logo_d">Конфигуратор ПК</div>
        <div class="header__logo header__logo_m">КПК</div>
      </header>
      <main class="main">
        <div class="groups">
          <section class="group" v-for="system_key in Object.keys(system)" :key="system_key">
            <div class="group__title">{{ system_key }}</div>
            <div class="component" v-for="systemItem in system[system_key]" :key="systemItem">
              <div class="component__main">
                <div class="component__main__title">{{ systemItem.p_type }}</div>
                <select class="component__main__select" v-model="selectedProducts[systemItem.p_type]">
                  <option value="">-</option>
                  <option v-for="product in system_products[systemItem.p_type]" :key="product" :value="product">
                    {{ product.name }}</option>
                </select>
                <button class="button button_null"
                  @click="dropdownShow[systemItem.p_type] = !dropdownShow[systemItem.p_type]" v-show="selectedProducts[systemItem.p_type]">
                  <svg height="1rem" weight="1rem" version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1.3521 0 0 1.35 -.039132 10.5)">
                      <g transform="matrix(1.4939 0 0 1.4882 -.014293 11.912)" stroke-width=".5124">
                        <rect transform="matrix(.70655 -.70766 .70655 .70766 0 0)" x="4.4698" y="10.232" width="17.375"
                          height="2.2205" ry="1.0642" />
                        <rect transform="matrix(.70655 .70766 -.70655 .70766 0 0)" x="-4.9867" y="-6.6261"
                          width="17.375" height="2.2205" ry="1.0642" />
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
              <div class="component__spec" v-if="dropdownShow[systemItem.p_type]">
                <div class="component__spec__title component__spec__item">
                  Общие характеристики
                </div>
                <div class="component__spec__item">
                  <div>Цена</div>
                  <div>{{ selectedProducts[systemItem.p_type].price }}</div>
                </div>
                <div class="component__spec__title component__spec__item">
                  Характеристики
                </div>
                <div class="component__spec__item"
                  v-for="spec_key in Object.keys(selectedProducts[systemItem.p_type].specif)" :key="spec_key">
                  <div>{{ spec_key }}</div>
                  <div>{{ selectedProducts[systemItem.p_type].specif[spec_key] }}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="total-price">
          <div>Итог</div>
          <div>{{ getSumProducts }}</div>
        </div>
      </main>
      <footer>© 2022, Студия имени Тимофея Кузлика</footer>
    </div>
  </div>
</template>

<script>
const axios = require("axios")

export default {
  data() {
    return {
      abob: false,
      /*system:
        [
          { "p_type": "Процессоры" },
          { "p_type": "Видеокарты" }
        ],*/
      system:
      {
        "Системный блок": [
          { "p_type": "Процессоры" },
          { "p_type": "Видеокарты" }
        ],
        "Периферия": [
          { "p_type": "Люстры" }
        ]
      },
      system_products: {},
      dropdownShow: {},
      selectedProducts: {}
    }
  },
  async created() {
    for (let system_key of Object.keys(this.system)) {
      for (let systemItem of this.system[system_key]) {
        const response = await axios.get(`/api/main/get/products/p_type?p_type=${systemItem.p_type}`)
        this.system_products[systemItem.p_type] = response.data
      }
    }
  },
  computed: {
    // a computed getter
    getSumProducts() {
      const selProds = this.selectedProducts
      if (Object.keys(selProds).length == 0)
        return 0

      let sum = 0
      for (let selProdKey of Object.keys(selProds)) {
        if (selProds[selProdKey] != "")
          sum += selProds[selProdKey].price
      }

      return sum
    }
  }
}
</script>

<style src="@/assets/styles/main.css">

</style>
<style src="@/assets/styles/fonts.css">

</style>