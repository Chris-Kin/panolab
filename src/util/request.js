/*
 * @File: axios请求封装
 * @Wiki:
 * @Author: yu
 * @Date: 2018-05-07 16:54:25
*/

/* eslint-disable no-unused-expressions */
import axios from 'axios';
import { Message, Loading } from 'element-ui';
import moment from 'moment';
import login from './login';

const Ax = axios.create({
  baseURL: '',
  withCredentials: true,
  responseType: 'json',
});

Ax.interceptors.response.use(response => response, (error) => {
  const response = error.response || {};
  if (response.status === 401) {
    login();
  }
  if (response.status === 403) {
    return Promise.reject('暂无权限');
  }
  return Promise.reject(error);
});

/**
 * 接口错误处理
 * @param {*} config
 */
const apiErrorHandler = (uri, data, rejectData, config, cb = () => { }) => {
  // 默认开启 eatError
  if (config.eatError === undefined || config.eatError) {
    Message({
      type: 'error',
      showClose: true,
      message: rejectData.msg || rejectData,
    });
  } else {
    cb();
  }
};

const Request = {
  get(uri = '', data = {}, config = {}) {
    // eatError 内部统一处理错误
    const { useLoading, fullInfo } = config;
    let loading = {};
    if (useLoading === true) {
      loading = Loading.service({ lock: true });
    }
    return new Promise((resolve, reject) => {
      Ax.get(uri, { params: data }).then((res = {}) => {
        const resData = res.data || {};
        if (resData.status === 0) {
          // 默认直接将data返回给调用者
          const resolveData = fullInfo === true ? resData : resData.data;
          resolve(resolveData);
        } else {
          // 只抛出非网络问题的异常(默认直接给出msg数据)，网络异常由下面的catch统一处理
          const rejectData = fullInfo === true ? resData : (resData.msg || '接口处理失败');

          apiErrorHandler(uri, data, rejectData, config, () => reject(rejectData));
        }
      }).catch((err) => {
        if (err.response && [401, 403].includes(err.response.status)) {
          return;
        }
        const msg = err.message || '网络错误';
        apiErrorHandler(uri, data, msg, config);
      }).finally(() => {
        useLoading && loading.close();
      });
    });
  },
  getFile(uri, data) {
    Ax.get(uri, { params: data, responseType: 'blob' }).then((res = {}) => {
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${moment().format('YYYYMMDDhhmm')}.xls`);
      document.body.appendChild(link);
      link.click();
    }).catch((err) => {
      if (err.response && [401, 403].includes(err.response.status)) {
        return;
      }
      const msg = err.message || '网络错误';
      apiErrorHandler(uri, data, msg, {});
    });
  },
  postFile(uri, data, config = {}) {
    const defaultFileName = `${moment().format('YYYYMMDDhhmm')}.xls`;
    const { fileName = defaultFileName, fileType = 'application/vnd.ms-excel' } = config;
    return new Promise((resolve, reject) => {
      Ax.post(uri, data, { responseType: 'blob' }).then((res = {}) => {
        const url = window.URL.createObjectURL(new Blob([res.data], { type: fileType }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        resolve();
      }).catch((err) => {
        if (err.response && [401, 403].includes(err.response.status)) {
          return;
        }
        const msg = err.message || '网络错误';
        apiErrorHandler(uri, data, msg, {});
        reject();
      });
    });
  },
  post(uri = '', data = {}, config = {}) {
    const { useLoading, fullInfo } = config;
    let loading = {};
    if (useLoading === true) {
      loading = Loading.service({ lock: true });
    }
    return new Promise((resolve, reject) => {
      Ax.post(uri, data).then((res = {}) => {
        const resData = res.data || {};
        if (resData.status === 0) {
          // 默认直接将data返回给调用者
          const resolveData = fullInfo === true ? resData : resData.data;
          resolve(resolveData);
        } else {
          // 只抛出非网络问题的异常(默认直接给出msg数据)，网络异常由下面的catch统一处理
          const rejectData = fullInfo === true ? resData : (resData.msg || '接口处理失败');

          apiErrorHandler(uri, data, rejectData, config, () => reject(rejectData));
        }
      }).catch((err) => {
        if (err.response && [401, 403].includes(err.response.status)) {
          return;
        }
        const msg = err.message || '网络错误';
        apiErrorHandler(uri, data, msg, config);
      }).finally(() => {
        useLoading && loading.close();
      });
    });
  },
};

export default Request;
