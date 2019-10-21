<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card>
          <div slot="header">
            <strong>User Form</strong>
          </div>

          <b-form-group
            label="Name"
            label-for="name"
            :label-cols="2">
            <b-form-input id="name" type="text" v-model="userAdd.name"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Mail"
            label-for="mail"
            :label-cols="2">
            <b-form-input id="mail" type="text" v-model="userAdd.mail"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Phone"
            label-for="phone"
            :label-cols="2">
            <b-form-input id="phone" type="text" v-model="userAdd.phone"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Address"
            label-for="address"
            :label-cols="2">
            <b-form-input id="address" type="text" v-model="userAdd.address"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Disable"
            label-for="disable"
            :label-cols="2">
            <b-form-radio-group
              :plain="true"
              :options="[
                {text: 'Không',value: false},
                {text: 'Có',value: true},
              ]"
              :checked="3"
              v-model="userAdd.disable">
            </b-form-radio-group>
          </b-form-group>

          <div slot="footer" class="form-actions">
            <b-button type="button" variant="primary" @click="onSaveChange">Save changes</b-button>
            <b-button type="button" variant="secondary" @click="onClear">Clear</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";

  export default {
    name: 'users',
    data: function() {
      return {
        userTemp: {},
        userAdd: {}
      }
    },
    created() {
      this.userTemp = {
        name: '',
        mail: '',
        phone: '',
        address: '',
        disable: false
      },
      this.userAdd = {
        ...this.userTemp
      }
    },
    computed: {
      ...mapState({
        user: state => state.user.detail
      })
    },
    methods: {
      ...mapActions({
        userAddRef: "user/addRef"
      }),

      onSaveChange() {
        this.userAddRef(this.userAdd);
      },

      onClear() {
        this.userAdd = {
          ...this.userTemp
        }
      },
    }
  }
</script>
