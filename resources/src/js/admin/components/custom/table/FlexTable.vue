<template>
    <div class="table-container">
        <div class="flex-container">
            <div id="fixed" class="flex-container__header">
                <div class="flex-container__header--row">
                    <div v-for="item, index in headerItems" :key="index" @click="sorting(item.alias, index)" v-if="showAllFields || fields[item.alias]">
                        {{ item.name }}
                        <i v-if="sort.field == item.alias && sort.type " class="el-icon-bottom"></i>
                        <i v-if="sort.field == item.alias && !sort.type " class="el-icon-top"></i>
                    </div>
                </div>
            </div>
            <el-row class="flex-container__body" v-loading="loading" element-loading-text="Получение данных...">
              <el-col>
                <el-row v-if="showFilters" class="flex-container__body--search">
                    <el-col v-for="item, index in headerItems" :key="index" v-if="showAllFields || fields[item.alias]" class="flex-container__col--search">
                      <slot :name="`filter_${item.alias}`">
                        <el-input
                          placeholder="Начните вводить"
                          v-model="incomeFilters[item.alias]"
                          @blur="changeFilters()"
                          @keyup.enter="changeFilters()"
                          @change="changeFilters()"
                          clearable
                          v-if="!item.noFilter"
                        ></el-input>

                        <el-tooltip class="item" effect="dark" content="Быстрый фильтр по этому полю недоступен. Попробуйте вызвать основной блок фильтров." placement="bottom">
                          <el-input disabled placholder="Фильтр недоступен" v-if="item.noFilter === true"></el-input>
                        </el-tooltip>

                      </slot>
                    </el-col>
                </el-row>
                <tr
                    class="flex-container__body--row"
                    v-for="model, index in models"
                    :key="model.id"
                    v-bind:class="{
                        'current-row': index == selectRow,
                    }"
                    v-if="models"
                    @contextmenu="rightClickRow(model, index)"
                    >
                    <el-col v-for="item, itemIndex in headerItems" :key="itemIndex" v-if="showAllFields || fields[item.alias]" class="flex-container__body--col">
                      <slot :name="item.alias" v-bind:model="model">
                        {{ model[item.alias] }}
                      </slot>
                    </el-col>
                </tr>
                <tr
                    class="flex-container__body--row"
                    v-bind:class="{
                        'current-row': index == selectRow,
                    }"
                    v-if="!models"
                    @contextmenu="rightClickRow(model, index)"
                    >
                    <el-col v-for="item, itemIndex in headerItems" :key="itemIndex" v-if="showAllFields || fields[item.alias]" class="flex-container__body--col">
                      <slot name="empty-slot" v-bind:model="model">
                        <div class="" style="width: 100%; display: flex; justify-content: center;">
                          По заданным фильтрам данные нет. Попробуй изменить или сбросить фильтры.
                        </div>
                      </slot>
                    </el-col>
                </tr>
              </el-col>

            </el-row>
        </div>

        <div class="back-foul" @click="hideContext()" v-if="context.show"></div>
        <transition name="fade">
            <ul
                v-if="context.show"
                v-bind:style="{ top: context.params.top + 'px', left: context.params.left + 'px', position: context.params.position, zIndex: context.params.zIndex }"
                class="el-dropdown-menu right-click-wrapper"
                x-placement="bottom-end">
                <slot name="rightClickMenu" v-bind:row="currentRow" v-bind:context="context">
                  <li class="el-dropdown-menu__item">
                      <i class="el-icon-document"></i> Просмотреть
                  </li>
                </slot>
            </ul>
        </transition>
    </div>
</template>
<script>

export default {
    name: "",
    data: () => ({
        context: {
            params: {
                left: '0',
                top: '0',
                position: 'fixed',
                zIndex: 9999
            },
            show: false,
        },
        currentRow: '',
        selectRow: -1,
        filters: {}
    }),
    props: {
        models: {
            type: Array,
            required: true,
        },
        headerItems: {
          type: Array,
          required: true,
        },
        showFilters: {
          type: Boolean,
          required: false,
          default: false
        },
        sort: {
          type: Object,
          required: false,
          default: () => { return { field: 'id', type: false} }
        },
        incomeFilters: {
          type: Object,
          required: false,
          default: () => { return {} }
        },
        fields: {
          type: Object,
          required: false,
          default: () => { return {} }
        },
        showAllFields: {
          type: Boolean,
          required: false,
          default: true
        },
        // selectedRow: {
        //     type: Number|String,
        //     default: '-1'
        // },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    // props: ['models', 'selectedRow'],
    created() {
        // $(window).on("scroll", function() {
        //     if ($(window).scrollTop() > 100) {
        //         $('#fixed').addClass('head-fixed');
        //         $('#fixed').css('width', $('.flex-container__body').css('width'));
        //         // $('#fixed').css('border-bottom', '1px solid #757575');
        //     } else {
        //         $('#fixed').css('width', '100%');
        //         $('#fixed').removeClass('head-fixed');
        //         // $('#fixed').css('border-bottom', 'none');
        //     }
        // });
    },
    methods: {
        rightClickRow(row, index) {
            event.preventDefault();
            this.currentRow = row;
            this.selectRow = index;
            this.context.params.left = event.clientX;
            this.context.params.top = event.clientY;
            this.context.show = true;
        },

        hideContext() {
            event.preventDefault();
            this.context.show = false;
            this.selectRow = -1;
        },

        sorting(field, index) {

          if (this.headerItems[index].canSort === false) {
            this.$message.error('Сортировка по этому полю невозможна')
            return
          }

          this.$emit('sorting', field)
        },
        changeFilters() {
          this.$emit('change-filters', this.incomeFilters)
        }
    }
}
</script>
<style lang="css" scoped>
    .head-fixed {
        position: fixed;
        top: 0px;
        z-index: 2222;
        background-color: white;
        width: 100%;
        background: #fff;
        border: 1px solid #f4f4f4;
        -webkit-box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.3);
        -moz-box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.3);
        box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.3);
    }

    .flex-container__flex-col--filters {
      padding: 0px;
    }

    .flex-container {
        /* border-right: 1px solid #757575;
        border-bottom: 1px solid #757575; */
        word-wrap: break-word;
        word-break: break-all;
        display: flex;
        flex-direction: column;
    }

    .flex-container__header {
        flex-grow: 1;
        border: 1px solid #f4f4f4;
        font-size: 12px;
    }

    .flex-container__header .flex-container__header--row {
        font-weight: bold;
        cursor: pointer;
        min-width: 100%;
        z-index: 2000;
        align-items: center;
        justify-content: center;
        min-height: 40px;
    }

    .flex-container__body--search {
      border-width: 1px 0 0 1px;
      width: 100%;
      word-break: break-word;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      min-height: 40px;
    }

    .flex-container__body--row {
      border-width: 1px 0 0 1px;
      width: 100%;
      padding: 5px;
      word-break: break-word;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      min-height: 30px;
      cursor: pointer;
    }

    .flex-container__body--row:hover {
      background: #eee;
    }

    .flex-container__header .flex-container__header--row div {
        border-right: 1px solid #fafafa;
        border-left: 1px solid #fafafa;
    }

    .flex-container__header--row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        min-height: 40px;
    }

    .flex-container__header--row div {
        border-width: 1px 0 0 1px;
        width: 100%;
        padding: 5px;
        word-break: break-word;
    }

    .flex-container__body {
        min-height: 400px;
        font-size: 12px;
    }

    .table-container .el-loading-spinner {
        top: 50%;
        left: 0%;
        text-align: center;
        position: fixed;
    }

    .main-header {
        z-index: 3000;
    }

    .back-foul {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        overflow: auto;
        margin: 0;
    }

    .current-row {
      background-color: #eee
    }

    .flex-container__body--col {
      display: flex;
      align-items: center;
    }
</style>
