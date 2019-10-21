<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <c-table caption="<i class='fa fa-align-justify'></i> Users Table"></c-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {
    cTable
  } from '@/components'

  export default {
    name: 'users',
    components: {
      cTable
    },
    data: function() {
      return {}
    },
    methods: {}
  }
</script>
