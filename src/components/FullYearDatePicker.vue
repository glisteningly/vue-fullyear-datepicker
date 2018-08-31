<template>
  <div>
    <el-date-picker
      v-model="curDate"

      type="year"
      placeholder="选择年">
    </el-date-picker>
    <ul v-if="showPicker">
      <li class="month-pane" v-for="month in months" :key="month">
        <v-date-picker
          :formats='formats'
          :theme-styles='themeStyles'
          :min-page="{month:month+1,year:curYear}"
          :max-page="{month:month+1,year:curYear}"
          tint-color="#1C9EFF"
          :showDayPopover="false"
          is-inline
          mode='multiple'
          v-model='selectedDates'>
          <span class="month-title" slot="header" slot-scope="{ monthLabel }" title-position="left">
          {{ monthLabel }}
          </span>
        </v-date-picker>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'FullYearDatePicker',
    props: {},
    data() {
      const hSpacing = '2px';
      return {
        selectedDates: [],
        lastDates: [],
        months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        curDate: null,
        formats: {
          dayPopover: 'YYYY-MM-DD', // Only for `v-date-picker`
        },
        themeStyles: {
          wrapper: {
            background: 'none',
            color: 'none',
            border: '0'
          },
          dayCellNotInMonth: {
            opacity: 0.2
          },
          weekdays: {
            padding: `5px ${hSpacing} 5px ${hSpacing}`,
          },
          weeks: {
            padding: `0 ${hSpacing} ${hSpacing} ${hSpacing}`,
          }
        },
        showPicker: true
      }
    },
    methods: {
      handleYearChange(date) {
        // console.log(date)
        this.curYear = date.getFullYear()
        this.showPicker = false
        this.$nextTick(() => {
          this.showPicker = true
        })
      }
    },
    created() {
      this.curDate = new Date()
    },
    watch: {
      selectedDates() {
        // console.log('changed!')
        if (this.selectedDates.length <= 7) {
          this.lastDates = this.selectedDates
        } else {
          this.$message('最多可选择7个日期')
          this.selectedDates = this.lastDates
        }
      },
      curDate() {
        this.showPicker = false
        this.$nextTick(() => {
          this.showPicker = true
        })
      }
    },
    computed: {
      curYear() {
        return this.curDate.getFullYear()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  ul, li {
    margin: 0;
    padding: 0;
  }

  li.month-pane {
    display: inline-block;
    margin: 4px;
    .month-title {
      font-size: 18px;
      margin: 8px;
      letter-spacing: 2px;
    }
  }
</style>
