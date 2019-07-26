<template>
  <el-container>
    <el-main height="auto">
      <el-row>
        <el-col :span="24" align="right" class="newMember">
          <el-button type="primary" icon="el-icon-plus" @click="dialogAdd = true">新增課程</el-button>
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
            <el-button type="primary" icon="el-icon-download" circle title="匯入" @click="importExcel(scope.row)" />
            <el-button type="primary" icon="el-icon-upload2" circle title="匯出" @click="exportExcel(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" circle title="刪除" @click="deleteClass(scope.row)" />
          </template>
        </el-table-column>
      </el-table>

    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
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
    importExcel(row) {
      console.log('123')
    },
    exportExcel(row) {
      console.log('123')
    },
    scan(row) {
      console.log('123')
      this.$router.push({
        path: '/scan/index',
        query: {
          classID: row.id,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    enterStatus(row) {
      console.log(row)
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
