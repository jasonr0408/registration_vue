<template>
  <el-container>
    <el-main height="auto">
      <div class="app-container">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
      </div>
      <el-col v-if="summitButton" :span="24">
        <el-button type="primary" style="width: 100%;" @click="summitUpload">確認上傳</el-button>
      </el-col>
    </el-main>
  </el-container>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { MessageBox } from 'mint-ui'
import { importStudentList } from '@/api/registration'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      summitButton: false,
      classID: 0
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
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      this.summitButton = true
      // console.log(this.tableData)
    },
    summitUpload() {
      console.log(this.tableData)
      importStudentList(this.classID, this.tableData).then(response => {
        if (!response.error) {
          this.$confirm('成功上傳，是否跳轉到學員清單列表？', '提示', {
            confirmButtonText: '跳轉',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/status/index',
              query: {
                classID: this.classID,
                t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消跳轉'
            })
          })
          this.listLoading = false
        } else {
          this.$message.error('上傳失敗')
        }
      })
    }
  }
}
</script>
