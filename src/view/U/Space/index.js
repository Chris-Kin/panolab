import API from './api';

import pano from '@/util/pano';

export default {
  name: 'Space',

  mounted() {
    pano('/static/default.jpg', this.$refs.pano);
    window.addEventListener('resize', () => {
	  pano('/static/default.jpg', this.$refs.pano);
    });
  },
};
