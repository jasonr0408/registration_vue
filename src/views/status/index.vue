<template>
  <el-container>
    <el-main height="auto">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" style="width: 100%;" icon="el-icon-full-screen" @click="goToScan">報到</el-button>
        </el-col>
      </el-row>

      <!-- table-->
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="status" label="狀態">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status" type="success">報到完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="暱稱" />
        <el-table-column prop="department" label="部門名稱" />
        <el-table-column prop="employeeID" label="員工編號" />
      </el-table>

    </el-main>
  </el-container>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { getStudentList } from '@/api/registration'

export default {
  name: 'Dashboard',
  data() {
    return {
      addDialogVisible: false,
      classID: 0,
      list: [],
      listLoading: true
    }
  },
  created() {
    // 抓route的class id
    if (typeof (this.$route.query.classID) !== 'undefined') {
      this.classID = this.$route.query.classID
    } else {
      MessageBox({
        title: '課程ID錯誤',
        message: '錯誤訊息',
        confirmButtonText: '離開'
      }).then(action => {
        this.$router.push({
          path: '/'
        })
      })
    }
    this.getStudentListFromApi()
    // 用class id抓api報到清單
  },
  methods: {
    goToScan() {
      this.$router.push({
        path: '/scan/index',
        query: {
          classID: this.classID,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    getStudentListFromApi() {
      getStudentList(this.classID).then(response => {
        if (!response.error) {
          this.list = response.data
          this.listLoading = false
        } else {
          this.$message.error('取Api失敗')
          MessageBox('提示', 'Api失敗')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
