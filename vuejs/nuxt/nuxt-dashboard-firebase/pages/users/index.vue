<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="8" class="mb-3 text-right">
        <b-form-group>
          <b-input-group>
            <b-form-input type="text" placeholder="Search" v-model="searchString" @keyup.enter="onSearch(usersState)"></b-form-input>
            <b-input-group-prepend>
              <b-button variant="primary" @click="onSearch(usersState)">
                <i class="fa fa-search"></i> Search
              </b-button>
            </b-input-group-prepend>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="4" class="mb-3 text-right">
        <b-link class="btn btn-secondary" :to="`/users/add`">
          <i class="fa fa-lg fa-plus"></i> Add
        </b-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <c-table caption="<i class='fa fa-align-justify'></i> Users Table"
         :items="users" :slots="fields" :fields="fields">
          <template slot="action" slot-scope="row">
            <b-link :to="`/users/${row.data.item.id}`" class="mr-4">
              <i class="fa fa-lg fa-eye"></i>
            </b-link>
          </template>
        </c-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  import {
    cTable
  } from '~/components';

  export default {
    name: 'users',
    components: {
      cTable
    },
    data: function() {
      return {
        users: [],
        searchString: '',
        fields: [
          {
            key: 'action',
            label: 'Action',
            sortable: false,
            customRender: true
          },
          {
            key: 'name',
            label: 'Name',
            sortable: true
          },
          {
            key: 'mail',
            label: 'Mail',
            sortable: false,
          },
          {
            key: 'disable',
            label: 'Disable',
            sortable: false,
          }
        ]
      }
    },
    created() {
      this.userBindListRef();
    },
    computed: {
      ...mapState({
        usersState: state => state.user.list
      })
    },
    methods: {
      ...mapActions({
        userBindListRef: "user/bindListRef"
      }),
      onSearch(items) {
        this.users = [];
        for (const item of items) {
          if (item.name && this.compare(item.name, this.searchString)) {
            this.users.push(item)
          }
        }
      },
      compare(str1, str2) {
        str1 = this.processString(str1);
        str2 = this.processString(str2);
        return str1.indexOf(str2) !== -1
      },
      processString(str) {
        // Unsign
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // toLowerCase
        str = str.toLowerCase();
        // space
        str = str.replace(/\s+/g, ' ');
        str.trim();

        return str;
      }
    },
    watch: {
      usersState: function(newVal, oldVal) {
        this.onSearch(newVal)
      }
    }
  }
</script>
