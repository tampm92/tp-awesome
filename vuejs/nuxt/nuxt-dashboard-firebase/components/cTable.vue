<template>
  <b-card>
    <div slot="header" v-html="caption"></div>
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="cItems" :fields="cFields" :current-page="currentPage" :per-page="perPage">
      <template :slot="slot.key" slot-scope="row" v-for="slot in cSlots">
        <slot :name="slot.key" :data="row"></slot>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  export default {
    name: 'c-table',
    props: {
      caption: {
        type: String,
        default: 'Table'
      },
      hover: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: () => []
      },
      fields: {
        type: Array,
        default: () => []
      },
      slots: {
        type: Array,
        default: () => []
      },
      perPage: {
        type: Number,
        default: 10
      }
    },
    data: () => {
      return {
        currentPage: 1
      }
    },
    computed: {
      cItems() {
        return shuffleArray(this.items)
      },
      cFields() {
        return this.fields
      },
      cSlots() {
        let filtered = this.slots.filter(function(value, index, arr){
          return value.customRender;
        });
        return filtered;
      }
    },
    methods: {
      getRowCount (items) {
        return items.length
      }
    }
  }
</script>
