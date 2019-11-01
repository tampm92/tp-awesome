# Axios

[Document](https://axios.nuxtjs.org/usage)

- Install lib:

```bash
yarn add @nuxtjs/axios
```

- add config to file nuxt.config.js

```bash
modules: [
    '@nuxtjs/axios'
],
```

> [Use in component and store](https://axios.nuxtjs.org/usage)

> If you want use in service, you can see below tutorial

- Create file `axios.js` folder `plugins`

```bash
import { setClient } from '~/shared/global/apiClient'

export default ({ $axios, redirect }) => {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    console.log(error)
  })

  setClient($axios)
}

```

- Create file `apiClient.js` folder `shared/global`

```bash
let client

export function setClient (newClient) {
  client = newClient
}

// Request helpers
const reqMethods = [
  'request', 'delete', 'get', 'head', 'options', // url, config
  'post', 'put', 'patch' // url, data, config
]

let service = {}

reqMethods.forEach((method) => {
  service[method] = function () {
    if (!client) throw new Error('apiClient not installed')
    return client[method].apply(null, arguments)
  }
})

export default service
```

- Create file `BackendService.js` folder `shared/services`

```bash
import apiClient from '../global/apiClient';

export default class BackendService {
  constructor () {
      this.apiClient = apiClient
  }
}
```

- Create file `UserService.js` folder `shared/services`

```bash
import BackendService from './BackendService'

export default class UserService extends BackendService {
  async getAll () {
    let response = await this.apiClient.get('users');
    let data = response.data;
    return data;
  }
}
```