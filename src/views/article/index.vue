<template>
    <div class="art-container">
        <!-- 筛选容器 -->
        <el-card>
            <div slot="header">
                <my-bread>内容管理</my-bread>
            </div>
            <!-- 筛选器内容 -->
            <el-form :model="reqParams"  label-width="80px">
                <el-form-item label="状态:">
                    <el-radio-group v-model="reqParams.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道:">
                    <my-channel v-model="reqParams.channel_id"></my-channel>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-date-picker
                        value-format="yyyy-MM-dd"
                        @change = "changeDate"
                        v-model="dateValues"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >

                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <div slot="header">
                 根据筛选条件共查询到
                 <b>{{total}}</b>
                 条结果
            </div>
            <el-table :data="articles">
               <el-table-column label="封面">
                   <template slot-scope="scope">
                       <el-image lazy :src="scope.row.cover.images[0]" style="width:80px;heigt:60px">
                           <div slot="error" class="image-slot">
                               <img src="../../assets/images/error.gif" width="80px" height="60px" alt="">
                           </div>
                       </el-image>
                   </template>
                </el-table-column>
                <el-table-column label="标题" prop="title">
                </el-table-column>
                <el-table-column label="状态" prop="status">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status===0" taye="info">草稿</el-tag>
                        <el-tag v-if="scope.row.status===1" taye="info">待审核</el-tag>
                        <el-tag v-if="scope.row.status===2" taye="success">审核通过</el-tag>
                        <el-tag v-if="scope.row.status===3" taye="warning">审核失败</el-tag>
                        <el-tag v-if="scope.row.status===4" taye="danger">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="发布时间" prop="pubdate">
                </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button icon="el-icon-edit" plain circle type="primary" @click="edit(scope.row.id)"></el-button>
                        <el-button icon="el-icon-delete" plain circle type="danger" @click="del(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="box">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="changePager"
                    :current-page="reqParams.page"
                    :page-size="reqParams.per_page"
                    :total="total"
        ></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {

  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 10,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 默认频道数据
      // channelOptions: [{ name: 'java', id: 1 }],
      // 日期控件的数据
      dateValues: [],
      articles: [],
      // 查询的数据总数
      total: 0
    }
  },
  created () {
    // 获取频道数据
    // this.getChannelOptions()
    // 获取文章内容
    this.getArticles()
  },
  methods: {
    // async getChannelOptions () {
    //   // const o = {data:{}};const {data} = o;一层解构
    //   // const res = {data:{data:{channels:[]}}}; 多层解构  const {data:{data:data}}
    //   const { data: { data } } = await this.$http('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      // post 传参 axios.post ('url',{参数对象})
      // get传参 axios.get('url',{params:{参数对象}})
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    edit (id) {
      this.$router.push({ path: '/publich', query: { id } })
    },
    del (id) {
      // 确认框
      this.$confirm('亲,此操作将永久删除该文章,是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认 发删除请求
        // 后台没有任何响应 一直等待响应 导致后面代码无法执行
        await this.$http.delete(`articles/${id}`)
        // 删除后做什么
        this.getArticles()
        this.$message.success('删除成功')
      })
        .catch(() => {
          // 点击取消
        })
    },
    changePager (newPage) {
      // newPage 当前点击的按钮的页码
      // 更新提交后台的参数
      this.reqParams.page = newPage
      // 获取列表数据
      this.getArticles()
    },
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (values) {
      // 给beigin  end 赋值
      this.reqParams.beigin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    }

  }
}
</script>

<style scoped lang="less">
    // 注意：el-card 是组件，解析后标签的名字不是el-card,标签上类名和自定义标签名字一致
    .el-card {
        margin-bottom: 20px;
    }
    .box {
        margin-top:20px;
        text-align: center;
    }
</style>
