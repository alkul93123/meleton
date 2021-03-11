<template>

  <el-row >
    <el-col>
      <div class="a-table" ref="table-wrapper" id="table-wrapper" v-loading="loading">
          <div
            v-for="item, index in structure"
            class="a-table__col"
            :class="{ 'a-table__col--sticky': index == attachedColumn, 'auto-basis': item.autoBasis }"
            v-if="showAllFields || !!visibleFields[item.alias]"
          >
            <div class="a-table__col--header">
              <slot :name="`header_${item.alias}`">
                <span @click="sorting(item.alias, index)">{{ item.name }}</span>&nbsp;

                <i v-if="sort.field == resolveHeader(item.alias) && sort.type " class="el-icon-bottom"></i>
                <i v-if="sort.field == resolveHeader(item.alias) && !sort.type " class="el-icon-top"></i>

                <i class="el-icon-paperclip" :class="{ 'active-sticky': index == attachedColumn }" @click="selectStickyCol(index)"></i>

              </slot>
            </div>
            <div class="a-table__col--filter" v-if="showFilters">
              <slot :name="`filter_${item.alias}`">
                <el-input
                  v-if="(item.filterType == 'default' || !item.filterType) && !item.noFilter"
                  :placeholder="item.placeholder || item.name"
                  v-model="incomeFilters[resolveFilters(item.alias)]"
                  @blur="changeFilters()"
                  @keyup.enter="changeFilters()"
                  @change="changeFilters()"
                  clearable
                ></el-input>

                <el-date-picker
                    v-model="incomeFilters[resolveFilters(item.alias)]"
                    v-if="item.filterType == 'daterange' && !item.noFilter"
                    type="daterange"
                    align="center"
                    start-placeholder="01.01.2020"
                    end-placeholder="01.01.2020"
                    format="MM.yyyy"
                    value-format="yyyy-MM-dd"
                    default-value="2020-01-01"
                    style="width: 100%;"
                    @change="changeFilters"
                >
                </el-date-picker>

                <el-select
                    v-model="incomeFilters[resolveFilters(item.alias)]"
                    v-if="item.filterType == 'simple-select' && !item.noFilter"
                    filterable
                    @change="changeFilters"
                    :clearable="true"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    :placeholder="item.placeholder || item.name">
                    <el-option
                        v-for="item in item.list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>

                <el-select
                    v-model="incomeFilters[resolveFilters(item.alias)]"
                    v-if="item.filterType == 'boolean' && !item.noFilter"
                    filterable
                    @change="changeFilters"
                    :clearable="true"
                    :placeholder="item.placeholder || item.name">
                    <el-option
                        v-for="item in trueFalseList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>

                <el-select
                    v-model="incomeFilters[resolveFilters(item.alias)]"
                    v-if="item.filterType == 'remote-select' && !item.noFilter"
                    filterable
                    remote
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    @change="changeFilters"
                    :clearable="true"
                    :remote-method="item.remoteMethod"
                    :placeholder="item.placeholder || item.name">
                    <el-option
                        v-for="item in item.list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>

                <el-tooltip class="item" effect="dark" content="Быстрый фильтр по этому полю недоступен. Попробуйте вызвать основной блок фильтров." placement="bottom">
                  <el-input disabled placholder="Фильтр недоступен" v-if="item.noFilter === true"></el-input>
                </el-tooltip>
              </slot>
            </div>
            <div
              v-for="model, key in models.length"
              class="a-table__col--body"
              @click="selectRow(key, index)"
              @contextmenu="rightClickRow(models[key], key)"
            >
              <div class="a-table__col--row" :class="{ 'selected-row': key == selectedRow }">
                <slot :name="item.alias" v-bind:model="models[key]">
                  <span v-if="item.fieldType == 'default' || !item.fieldType">{{ getModelData(model, item.alias) }}</span>

                  <span v-if="item.fieldType == 'raw'" v-html="getModelData(model, item.alias)"></span>

                  <span v-if="item.fieldType == 'boolean'">
                    <el-tag v-if="getModelData(model, item.alias)" size="mini" type="success">Да</el-tag>
                    <el-tag v-if="!getModelData(model, item.alias)" size="mini" type="danger">Нет</el-tag>
                  </span>
                </slot>
              </div>

              <div
                class="a-table__col--row child-row"
                :class="{ 'first-child-row': childKey == 0 }"
                v-for="child, childKey in models[key].children"
              >
                <div v-if="index == 0" style="padding-left: 15%;"> <i class="el-icon-d-arrow-right"></i> </div>
                <div v-if="index != 0">
                  <slot :name="item.alias" v-bind:model="child">
                    <span v-if="item.fieldType == 'default' || !item.fieldType">{{ child[resolveField(item.alias)] }}</span>

                    <span v-if="item.fieldType == 'raw'" v-html="child[resolveField(item.alias)]"></span>

                    <span v-if="item.fieldType == 'boolean'">
                      <el-tag v-if="child[resolveField(item.alias)]" size="mini" type="success">Да</el-tag>
                      <el-tag v-if="!child[resolveField(item.alias)]" size="mini" type="danger">Нет</el-tag>
                    </span>
                  </slot>
                </div>
              </div>

            </div>


          </div>
          <!-- <div class="a-table__col--actions" >
            <div class="a-table__col--header">Действия</div>
            <div
              v-for="model, key in models.length"
              class="a-table__col--body"
              :class="{ 'selected-row': key == selectedRow }"
              @click="rightClickRow(models[key], key)"
            >
              <i class="el-icon-more"></i>
            </div>
          </div> -->
      </div>
      <div class="back-foul" @click="hideContext()" v-if="context.show"></div>
      <transition name="fade">
        <ul v-show="context.show"
            v-bind:style="{ top: context.params.top + 'px', left: context.params.left + 'px', position: context.params.position, zIndex: context.params.zIndex }"
            class="el-dropdown-menu right-click-wrapper"
            id="right-menu"
            x-placement="bottom-end">
          <slot name="context-menu" v-bind:row="currentRow, context"></slot>
        </ul>
      </transition>
    </el-col>
  </el-row>

</template>
<script>

  export default {
    data: () => ({
      context: {
        params: {
          left: '0',
          top: '0',
          position: 'fixed',
          zIndex: 9999
        },
        show: false
      },
      currentRow: '',
      trueFalseList: [
        { id: 1, name: 'Да' },
        { id: 0, name: 'Нет' },
      ],
    }),
    mounted() {
      document.getElementById('table-wrapper').setAttribute('style', `height:${window.innerHeight - 400}px`)
    },
    props: {
      models: { type: Array, required: true },
      structure: { type: Array, required: true },
      showAllFields: { type: Boolean, required: false, default: true },
      visibleFields: { type: Object, required: false, default: () => ({}) },
      selectedRow: { type: Number, required: false, default: -1 },
      attachedColumn: { type: Number, required: false, default: 0 },
      loading: { type: Boolean, default: false },
      sort: { type: Object, required: false, default: () => ({ field: 'id', type: 0 }) },
      useContextMenu: { type: Boolean, required: false, default: false },
      showFilters: { type: Boolean, required: false, default: false },
      incomeFilters: { type: Object, required: false, default: () => ({}) },
      resolvedFields: { type: Object, required: false, default: () => ({}) },
      resolvedHeader: { type: Object, required: false, default: () => ({}) },
      resolvedFilters: { type: Object, required: false, default: () => ({}) },
    },
    methods: {
      sorting(field, index) {

        if (this.structure[index].canSort === false) {
          this.$message.error('Сортировка по этому полю невозможна')
          return
        }

        this.$emit('sorting', field)
      },

      rightClickRow(row, index) {
        if (!this.useContextMenu) {
          return
        }

        let windowHeight = $(window).height(),
          menuHeight = $('#right-menu').height(),
          menuTopPoint = event.clientY

        if (menuHeight + menuTopPoint > windowHeight) {
          menuTopPoint = windowHeight - menuHeight - 25
        }

        event.preventDefault()
        this.currentRow = row
        this.$emit('selectRow', index)
        this.context.params.left = event.clientX
        this.context.params.top = menuTopPoint
        this.context.show = true
      },

      selectRow(index, colIndex) { colIndex || this.$emit('selectRow', index) },
      selectStickyCol(index) { this.$emit('attachColumn', index) },

      hideContext() {
        event.preventDefault()
        this.context.show = false
        this.$emit('selectRow', '-1')
      },

      changeFilters() { this.$emit('change-filters', this.incomeFilters) },

      resolveField(field) { return this.resolvedFields[field] ? this.resolvedFields[field] : field },
      resolveHeader(field) { return this.resolvedHeader[field] ? this.resolvedHeader[field] : field },
      resolveFilters(field) { return this.resolvedFilters[field] ? this.resolvedFilters[field] : field },

      getModelData(index, alias) {
        return this.models[index - 1][this.resolveField(alias)]
      },
    }
  }

</script>

<style lang="css" scoped>

  .a-table {
    width: 100%;
    min-height: 60vh;
    overflow: auto;
    display: flex;
    align-items: flex-start;
    font-size: 11px;
  }

  .a-table__col {
    flex: 0 0 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    flex-direction: column;
  }

  .a-table__col--header {
    border-bottom: 1px solid grey;
    min-height: 40px;
    z-index: 10;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 10;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .a-table__col--body {
    width: 100%;
  }

  .a-table__col--row {
    flex: 0 0 10%;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    /* padding: 0 10px; */
    flex-direction: column;
    cursor: pointer;
    width: 100%;
  }

  .a-table__col--actions {
    flex: 0 0 5%;
    min-height: 40px;
    display: flex;
    justify-content: center;
    background: #fff;
    align-items: center;
    position: sticky;
    right: 0;
    z-index: 12;
    flex-direction: column;
  }

  .a-table__col--sticky {
    position: sticky;
    left: 0;
    z-index: 15;
    -webkit-box-shadow: 10px 0px 10px -18px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 0px 10px -18px rgba(0,0,0,0.75);
    box-shadow: 10px 0px 10px -18px rgba(0,0,0,0.75);
  }

  .auto-basis {
    flex-basis: auto !important;
  }

  .auto-basis .a-table__col--filter {
    width: 100%;
  }

  .auto-basis .a-table__col--body {
    align-items: baseline;
  }

  .active-sticky {
    font-size: 15px;
    color: green;
    /* font-weight: bold; */
  }

  @media (max-width: 374px) {
    .a-table__col {
      flex-basis: 50%;
    }
  }

  @media (min-width: 375px) and (max-width: 767px) {
    .a-table__col {
      flex-basis: 40%;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .a-table__col {
      flex-basis: 30%;
    }
  }
  @media (min-width: 991px) and (max-width: 1199px) {
    .a-table__col {
      flex-basis: 20%;
    }
  }
  @media (min-width: 1200px) {
    .a-table__col {
      flex-basis: 10%;
    }
  }

  .selected-row {
    background-color: #594965;
    color: white;
  }

  .table-container__tbody-td--filters {
    padding: 0px;
  }

  .a-table::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .a-table::-webkit-scrollbar-button {
    background-color: #eee;
    height: 0;
  }
  .a-table::-webkit-scrollbar-thumb {
    height: 10px;
    background-color: #eee;
    border-radius: 3px;
  }
  .a-table::-webkit-scrollbar:hover {
    width: 10px;
  }
  .a-table::-webkit-scrollbar-thumb:hover {
    background-color: #594965;
    cursor: pointer;
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

  .child-row {
    background: #eee;
    font-size: 10px;
    font-weight: bold;
  }

  .first-child-row {
    box-shadow: inset 0px 1px 0px rgba(154, 148, 140, 0.5), 2px 0px 0px rgba(255, 255, 255, 1);
  }

</style>
<style lang="css">
  .table-container__tbody-td--filters input {
    font-weight: lighter;
  }
</style>
