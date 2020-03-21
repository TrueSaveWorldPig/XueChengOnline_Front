<template>
  <div>
    <!--编写页面静态部分，即view部分-->
    <!--查询表单-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" round size="small" @click="query()">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/cms/page/add',query:{
      page:this.params.page,
      siteId:this.params.siteId
      }}">
        <el-button type="primary" round size="small" @click="query()">新增</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="150">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="100">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="280">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="300">
      </el-table-column>
<!--      <el-table-column prop="pageCreateTime" label="创建时间" width="180">-->
<!--      </el-table-column>-->
      <el-table-column label="操作" width="240">
        <template slot-scope="page">
          <el-button
            size="small" type="text"
            @click="edit(page.row.pageId)">编辑
          </el-button>
          <el-button
            size="small" type="text"
            @click="del(page.row.pageId)">删除
          </el-button>
          <el-button
            size="small" type="text"
            @click="preview(page.row.pageId)">页面预览
          </el-button>
          <el-button
            @click=""
            type="text" size="small">页面发布
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      small
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="changePage"
      style="float: right">
    </el-pagination>
  </div>

</template>
<script>
    /*编写页面静态部分，即model及vm部分。*/
    import {page_list} from "../api/cms";
    import * as cmsApi from '../api/cms';

    export default {
        data() {
            return {
                siteList: [],//站点列表
                "list": [],
                total: 0,
                params: {
                    page: 1,
                    size: 5,
                    siteId: '',
                    pageAliase: ''
                }
            }
        },
        created() {
            //取出路由当中的参数然后赋值给参数
            this.params.page = Number.parseInt(this.$route.query.page || 1);
            this.params.siteId = this.$route.query.siteId || '';
            this.findSiteList();
            this.query();
        },
        methods: {
            findSiteList() {
                cmsApi.site_list().then(response => {
                    // alert(JSON.stringify(response));
                    this.siteList = response;
                })
            },
            query() {
                // alert("正在查询......");
                cmsApi.page_list(this.params.page, this.params.size, this.params).then((response) => {
                    this.total = response.queryResult.total;
                    this.list = response.queryResult.list;
                })
            },
            changePage(page) {//形参就是当前页码
                this.params.page = page;
                this.query();
            },
            edit(pageId) {
                this.$router.push({
                    path: `/cms/page/edit/${pageId}`
                })
            },
            del(pageId) {
                this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    //删除页面
                    cmsApi.page_del(pageId).then((response) => {

                        if (response.success) {
                            this.$message.success("删除成功");
                            //刷新页面
                            this.query();
                        } else {
                            this.$message.error("删除失败");
                        }
                    })
                })
            },
            //页面预览
            preview: function (pageId) {
                window.open("http://www.xuecheng.com/cms/preview/" + pageId);
            }
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
