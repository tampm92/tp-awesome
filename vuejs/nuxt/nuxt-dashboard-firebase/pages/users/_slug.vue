<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12" class="mb-3 text-right">
        <b-button type="button" :variant="isEditing ? 'danger' : 'success'" @click="onEdit">
          <span v-if="isEditing">
            <i class="fa fa-lg fa-lock"></i> Lock
          </span>
          <span v-else>
            <i class="fa fa-lg fa-unlock"></i> Unlock
          </span>
        </b-button>
      </b-col>
    </b-row>
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
            <b-form-input id="name" type="text" v-model="userTemp.name" :disabled="!isEditing"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Mail"
            label-for="mail"
            :label-cols="2">
            <b-form-input id="mail" type="text" v-model="userTemp.mail" :disabled="!isEditing"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Phone"
            label-for="phone"
            :label-cols="2">
            <b-form-input id="phone" type="text" v-model="userTemp.phone" :disabled="!isEditing"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Address"
            label-for="address"
            :label-cols="2">
            <b-form-input id="address" type="text" v-model="userTemp.address" :disabled="!isEditing"></b-form-input>
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
              v-model="userTemp.disable" :disabled="!isEditing">
            </b-form-radio-group>
          </b-form-group>

          <div slot="footer" class="form-actions">
            <b-button type="button" variant="primary" @click="onSaveChange" :disabled="!isEditing">
              <i class="fa fa-lg fa-save"></i> Save changes
            </b-button>
            <b-button type="button" variant="secondary" @click="onCancel" :disabled="!isEditing">
              <i class="fa fa-lg fa-undo"></i> Cancel
            </b-button>
            <b-button type="button" variant="danger" @click="onDelete"  :disabled="!isEditing">
              <i class="fa fa-lg fa-trash"></i> Delete
            </b-button>
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
        isEditing: false
      }
    },
    mounted() {
      let id = this.$route.params.slug;
      this.userBindDetailRef({id});
    },
    created() {
    },
    computed: {
      ...mapState({
        userState: state => state.user.detail
      })
    },
    methods: {
      ...mapActions({
        userBindDetailRef: "user/bindDetailRef",
        userUpdateRef: "user/updateRef",
        userDeleteRef: "user/deleteRef"
      }),

      onEdit() {
        this.isEditing = !this.isEditing;
      },

      async onDelete() {
        await this.userDeleteRef({
          id: this.userState.id
        });

        this.$router.push('/users');
      },

      onSaveChange() {
        this.isEditing = false;
        this.userUpdateRef({
          id: this.userState.id,
          data: this.userTemp
        });
      },

      onCancel() {
        this.isEditing = false;
        this.userTemp = {
          ...this.userState
        };
      }
    },
    watch: {
      userState: function(newVal, oldVal) {
        this.userTemp = {
          ...newVal
        };
      }
    }
  }
</script>
