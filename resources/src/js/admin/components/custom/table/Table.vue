<template>
  <el-row>
    <el-col>
      <table>
        <thead>
          <tr>
            <th v-for="item, index in headerItems" @click="sorting(item.alias)">
              {{ item.name }}
              <i v-if="sort.field == item.alias && sort.type " class="el-icon-bottom"></i>
              <i v-if="sort.field == item.alias && !sort.type " class="el-icon-top"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="showFilters">
              <td v-for="item, index in headerItems">
                <slot :name="`filter_${item.alias}`">
                  <el-input placeholder="Начните вводить" v-model="incomeFilters[item.alias]" @blur="changeFilters()" @keyup.enter="changeFilters()" clearable></el-input>
                </slot>
              </td>
          </tr>
          <tr
              class=""
              v-for="model, index in models"
              :key="model.id"
              v-bind:class="{
                  'current-row': index == selectRow,
              }"
              @contextmenu="rightClickRow(model, index)"
              >
              <td v-for="item, itemIndex in headerItems" :key="itemIndex">
                <slot :name="item.alias" v-bind:model="model">
                  {{ model[item.alias] }}
                </slot>
              </td>
          </tr>
        </tbody>
      </table>

      <div class="back-foul" @click="hideContext()" v-if="context.show"></div>
      <transition name="fade">
          <ul
              v-if="context.show"
              v-bind:style="{ top: context.params.top + 'px', left: context.params.left + 'px', position: context.params.position, zIndex: context.params.zIndex }"
              class="el-dropdown-menu right-click-wrapper"
              x-placement="bottom-end">
              <slot name="rightClickMenu" v-bind:row="currentRow">
                <li class="el-dropdown-menu__item">
                    <i class="el-icon-document"></i> Просмотреть
                </li>
              </slot>
          </ul>
      </transition>
    </el-col>
  </el-row>
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
        $(window).on("scroll", function() {
            if ($(window).scrollTop() > 100) {
                $('#fixed').addClass('head-fixed');
                $('#fixed').css('width', $('.flex-container__body').css('width'));
                // $('#fixed').css('border-bottom', '1px solid #757575');
            } else {
                $('#fixed').css('width', '100%');
                $('#fixed').removeClass('head-fixed');
                // $('#fixed').css('border-bottom', 'none');
            }
        });
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

        sorting(field) {
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

    table > thead > tr > th {
      font-size: 12px;
      cursor: pointer;
    }

    table > tbody > tr > td {
      font-size: 11px;
      text-align: center;
    }

    table > tbody {
      min-width: 400px;
    }
</style>
