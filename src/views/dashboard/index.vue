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
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-full-screen" circle title="報到" @click="scan(scope.row)" />
            <el-button type="primary" icon="el-icon-s-data" circle title="報到狀況" @click="enterStatus(scope.row)" />
            <el-button type="primary" icon="el-icon-download" circle title="匯入" @click="enterImportExcel(scope.row)" />
            <el-button type="primary" icon="el-icon-upload2" circle title="匯出" @click="exportExcel(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" circle title="刪除" @click="deleteClass(scope.row)" />
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="新增課程"
        :visible.sync="addDialogVisible"
        width="30%"
      >

        <el-form ref="form" :model="newForm" label-width="100px">
          <el-form-item label="課程名稱">
            <el-input v-model="newForm.className" />
          </el-form-item>
          <el-form-item label="上課日期">
            <el-input v-model="newForm.date" />
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

export default {
  name: 'Dashboard',
  data() {
    return {
      newForm: {
        className: '',
        date: ''
      },
      addDialogVisible: false,
      classList: [
        {
          'id': 123,
          'className': '敏捷基本訓練',
          'date': '2019-07-26'
        }
      ],
      classData: {

      },
      listLoading: true
    }
  },
  created() {},
  methods: {
    summitForm() {
      console.log('123')
      this.addDialogVisible = false
    },
    enterImportExcel(row) {
      this.$router.push({
        path: '/excel/import',
        query: {
          classID: row.id,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    exportExcel(row) {
      this.$router.push({
        path: '/excel/export',
        query: {
          classID: row.id,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    scan(row) {
      this.$router.push({
        path: '/scan/index',
        query: {
          classID: row.id,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    enterStatus(row) {
      this.$router.push({
        path: '/status/index',
        query: {
          classID: row.id,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    deleteClass(row) {
      console.log('123')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
