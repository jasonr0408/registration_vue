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

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      summitButton: false
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
    },
    summitUpload() {
      console.log('123')
    }
  }
}
</script>
