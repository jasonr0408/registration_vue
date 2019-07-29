<template>
  <el-container>
    <el-main height="auto">
      <el-row>
        <el-col :span="24" align="right" class="newMember">
          <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">新增課程</el-button>
        </el-col>
      </el-row>

      <!-- table-->
      <el-table :data="classList" style="width: 100%">
        <el-table-column align="center" prop="className" label="課程名稱" />
        <el-table-column align="center" prop="date" label="上課日期" />
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" icon="el-icon-full-screen" circle title="報到" @click="scan(scope.row)" />
              <el-button type="primary" icon="el-icon-s-data" circle title="報到狀況" @click="enterStatus(scope.row)" />
            </el-row>
            <el-row>
              <el-button type="primary" icon="el-icon-upload2" circle title="匯入" @click="enterImportExcel(scope.row)" />
              <el-button type="primary" icon="el-icon-download" circle title="匯出" @click="exportExcel(scope.row)" />
              <el-button type="danger" icon="el-icon-delete" circle title="刪除" @click="deleteClassByApi(scope.row)" />
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="新增課程"
        :visible.sync="addDialogVisible"
        width="350px"
      >

        <el-form ref="form" :model="newForm" label-width="100px">
          <el-form-item label="課程名稱">
            <el-input v-model="newForm.className" />
          </el-form-item>
          <el-form-item label="上課日期">
            <el-date-picker
              v-model="newForm.date"
              type="date"
              placeholder="選擇日期"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="summitForm">送 出</el-button>
        </span>
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script>
import { newClass, getClassList, deleteClass } from '@/api/registration'

export default {
  name: 'Dashboard',
  data() {
    return {
      newForm: {
        className: '',
        date: ''
      },
      addDialogVisible: false,
      classList: [],
      classData: {

      },
      listLoading: true
    }
  },
  created() {
    this.getClassListByApi()
  },
  methods: {
    getClassListByApi() {
      getClassList().then(response => {
        this.classList = response.data
        this.listLoading = false
      })
    },
    summitForm() {
      if (this.newForm.className === '' && this.newForm.date === '') {
        this.$message({
          message: '課程名稱與日期不能為空',
          type: 'error'
        })
        return
      }
      this.addDialogVisible = false
      newClass(this.newForm).then(response => {
        this.$message({
          message: '新增課程成功',
          type: 'success'
        })
        this.getClassListByApi()
        this.listLoading = false
      })
    },
    enterImportExcel(row) {
      this.$router.push({
        path: '/excel/import',
        query: {
          classID: row.classID,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    exportExcel(row) {
      this.$router.push({
        path: '/excel/export',
        query: {
          classID: row.classID,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    scan(row) {
      this.$router.push({
        path: '/scan/index',
        query: {
          classID: row.classID,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    enterStatus(row) {
      this.$router.push({
        path: '/status/index',
        query: {
          classID: row.classID,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    deleteClassByApi(row) {
      this.$confirm('此操作將永久刪除課程，是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteClass(row.classID).then(response => {
          this.$message({
            message: '刪除課程成功',
            type: 'success'
          })
          this.getClassListByApi()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
