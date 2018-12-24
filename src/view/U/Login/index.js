import API from './api';

export default {
  data() {
    return {
      isRotate: false,
      account: '',
      pwd: '',
    };
  },
  methods: {
    rotate() {
      this.isRotate = true;
    },
    login() {
      if (!this.account && !this.pwd) {
        this.$message.warning('请输入用户名和密码');
        return;
      }
      API.login({
        account: this.account,
        pwd: this.pwd,
      }).then((data) => {
        this.$message.success(data);
      }).catch((msg) => {
        this.$message.error(msg);
      });
    },
  },
};
