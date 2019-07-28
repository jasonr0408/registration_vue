<template>
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">
        匯出Excel
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加載中" border fit highlight-current-row>
      <el-table-column label="Id" align="center" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Status" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="Name" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Department" align="center">
        <template slot-scope="scope">
          {{ scope.row.department }}
        </template>
      </el-table-column>
      <el-table-column label="EmployeeID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.employeeID }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// options components
import FilenameOption from './components/FilenameOption'
import { MessageBox } from 'mint-ui'
import { getStudentList } from '@/api/registration'

export default {
  name: 'ExportExcel',
  components: { FilenameOption },
  data() {
    return {
      list: [],
      listLoading: false,
      downloadLoading: false,
      filename: ''
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['是否報到', '學員名稱', '部門', '員工編號']
        const filterVal = ['status', 'name', 'department', 'employeeID']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    getStudentListFromApi() {
      this.listLoading = true
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

<style>
</style>
