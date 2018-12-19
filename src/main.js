// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI, { Message } from 'element-ui';
import mavonEditor from 'mavon-editor';

import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css';
import 'web-base-css/dist/index.css';

import './asset/style/index.css';

import { LazyButton, TipButton } from './component';

import App from './App';
import router from './router';

// 智能提示条
const $smartMessage = (text) => {
  const duration = Math.max(text.length * 160, 2000);
  Message({
    center: true,
    message: text,
    duration,
  });
};
['success', 'warning', 'error'].forEach((el) => {
  $smartMessage[el] = (params) => {
    if (typeof params === 'string') {
      const duration = Math.max(params.length * 160, 2000);
      Message[el]({
        center: true,
        message: params,
        duration,
        showClose: duration > 8000,
      });
    } else if (typeof params === 'object') {
      const message = params.message || '';
      const duration = Math.max(message.length * 160, 2000);
      Message[el]({
        ...params,
        center: true,
        duration,
        showClose: duration > 8000,
      });
    } else {
      Message[el](params);
    }
  };
});
Vue.prototype.$smartMessage = $smartMessage;

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(mavonEditor);
Vue.use(LazyButton);
Vue.use(TipButton);

Vue.filter('limit', (value, l) => {
  if (!value) {
    return '';
  }
  const valueString = value.toString();
  if (valueString.length < l) {
    return valueString;
  }
  return `${valueString.slice(0, l)}...`;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
