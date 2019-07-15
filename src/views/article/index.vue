<template>
    <div class="art-container">
        <!-- 筛选容器 -->
        <el-card>
            <div slot="header">
                <my-bread>内容管理</my-bread>
            </div>
            <!-- 筛选器内容 -->
            <el-form :model="reqParams" size="small" label-width="80px">
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
                    <el-select v-model="reqParams.channel_id">
                        <el-option
                            v-for = "item in channelOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-date-picker
                        v-model="dateValues"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >

                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>

        </el-card>
    </div>
</template>

<script>
export default {

  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 默认频道数据
      channelOptions: [{ name: 'java', id: 1 }],
      // 日期控件的数据
      dateValues: []
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      // const o = {data:{}};const {data} = o;一层解构
      // const res = {data:{data:{channels:[]}}}; 多层解构  const {data:{data:data}}
      const { data: { data } } = await this.$http('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang="less">
    // 注意：el-card 是组件，解析后标签的名字不是el-card,标签上类名和自定义标签名字一致
    .el-card {
        margin-bottom: 20px;
    }
</style>
