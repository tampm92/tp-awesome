# Axios

> Document [here](https://github.com/axios/axios)

1. Install lib

```bash
yarn add axios
```

2. Update `.env`

```bash
VUE_APP_API_BASE_URL=reqres.in/api
```

3. Update `src/config.js`

```ts
export default {
    node: process.env.NODE_ENV || 'development',
    isTest: process.env.NODE_ENV === 'test',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: !!!process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    appTitle: process.env.VUE_APP_TITLE,
    apiBaseUrl: process.env.VUE_APP_API_BASE_URL
};
```

4. Create `src/api.js`

```ts
import axios from 'axios'

import config from './config'

const axiosApi = axios.create({
    baseURL: config.apiBaseUrl
});

export default axiosApi;
```

5. Create `src/services/UserService.js`

```ts
import Api from '../api'

export default {
    getAll() {
        return Api.get('/users')
    },
    getDetail(userId) {
        return Api.get(`/users/${userId}`)
    }
}
```

6. Using in action store

```ts
// add service
import UserService from '../services/UserService'

// add to action
async getUserList(context, actionData) {
    context.commit({
        type: 'START_LOADING'
    });
    let { data } = await UserService.getAll();
    context.commit({
        type: 'STOP_LOADING'
    });
    return data;
},
async getUserDetal(context, actionData) {
    context.commit({
        type: 'START_LOADING'
    });
    let { data } = await UserService.getDetail();
    context.commit({
        type: 'STOP_LOADING'
    });
    return data;
},
```

7. Call in view to test

- Update `src/views/Home.vuew`

```html
<template>
  <layout name="default-layout">
    <div id="home-page">
      <img alt="Vue logo" src="../assets/logo.png">
      <ul>
        <li v-for="(item, index) in users" :key="index">
          <strong>{{item.email}}</strong>
        </li>
      </ul>
    </div>
  </layout>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      users: null
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.users = await this.$store.dispatch("getUserList");
    }
  }
}
</script>
```
