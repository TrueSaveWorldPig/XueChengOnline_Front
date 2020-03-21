import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from "../page/page_add";
import page_edit from "../page/page_edit";

export default [{
  path: '/',
  component: Home,
  name: 'CMS内容管理',//菜单名称
  hidden: false,
  children: [
    {path: '/cms/page/list', component: page_list, name: 'CMS子菜单', hidden: false},
    {path: '/cms/page/add', component: page_add, name: 'CMS新增页面', hidden: true},
    {path: '/cms/page/edit/:pageId', component: page_edit, name: 'CMS修改页面', hidden: true}
  ]
}
]
