import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询
export const page_list = (page, size, params) => {
  //将params拼接成key-value串
  let queryString = querystring.stringify(params);
//定义方法,请求服务器的页面查询接口
  return http.requestGet(`${apiUrl}/cms/page/list/${page}/${size}?${queryString}`);
};

//站点列表查询
export const site_list = () => {
  //定义方法,请求服务器查询接口
  return http.requestGet(`${apiUrl}/cms/page/siteList`);
};

//模板列表查询
export const template_list = () => {
  //定义方法,请求服务器查询接口
  return http.requestGet(`${apiUrl}/cms/page/templateList`);
};

//新增页面
export const page_add = params => {
  return http.requestPost(`${apiUrl}/cms/page/add`, params);
};

//根据Id查询页面
export const page_get = id => {
  return http.requestGet(`${apiUrl}/cms/page/get/${id}`);
};
//修改页面
export const page_edit = (id, params) => {
  return http.requestPut(`${apiUrl}/cms/page/edit/${id}`, params);
};
//删除页面
export const page_del = id => {
  return http.requestDelete(`${apiUrl}/cms/page/del/${id}`);
};



