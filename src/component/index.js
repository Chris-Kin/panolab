// 在前面添加「P」字母，表示页面级别的组件

import PHeader from './Header';
import Layout from './Layout';
import LazyButtonComponent from './LazyButton';
import TipButtonComponent from './TipButton';

const LazyButton = {
  install(Vue) {
    Vue.component(LazyButtonComponent.name, LazyButtonComponent);
  },
};
const TipButton = {
  install(Vue) {
    Vue.component(TipButtonComponent.name, TipButtonComponent);
  },
};

export {
  PHeader,
  Layout,
  TipButton,
  LazyButton,
};
