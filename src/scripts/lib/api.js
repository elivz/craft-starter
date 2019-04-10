import axios from 'axios';
import { stringify } from 'qs';

export default axios.create({
  baseURL: '/',
  headers: {
    'X-CSRF-Token': window.site.csrfToken,
  },
  transformRequest: [data => stringify(data)],
});
