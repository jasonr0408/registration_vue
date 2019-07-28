<template>
  <el-container>
    <el-main height="auto">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" style="width: 100%;" @click="goStatusPage">查看報到狀況</el-button>
        </el-col>
      </el-row>
      <div>
        <p v-if="error" class="error">{{ error }}</p>

        <p class="decode-result">上一筆報到紀錄: <b>{{ result }}</b></p>

        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>

    </el-main>
  </el-container>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { MessageBox } from 'mint-ui'
import { checkIn } from '@/api/registration'

export default {

  components: { QrcodeStream },

  data() {
    return {
      result: '',
      error: '',
      classID: 0
    }
  },
  created() {
    // 抓route的class id
    if (typeof (this.$route.query.classID) !== 'undefined') {
      this.classID = this.$route.query.classID
    } else {
      this.openMessageBox('錯誤訊息', '課程ID錯誤', '離開', 1)
    }
  },

  methods: {
    openMessageBox(title, msg, buttonText, funcNumber) {
      MessageBox({
        title: title,
        message: msg,
        confirmButtonText: buttonText
      }).then(action => {
        switch (funcNumber) {
          case 1:
            this.$router.push({
              path: '/'
            })
            break

          default:
            break
        }
      })
    },
    onDecode(result) {
      // 把工號跟class id傳到server對比
      this.result = result
      checkIn(this.classID, { employeeID: this.result }).then(response => {
        if (!response.error) {
          this.openMessageBox('訊息', `${response.data}`, '繼續', 0)
          this.listLoading = false
        } else {
          this.$message.error('報到失敗')
        }
      })
    },
    goStatusPage() {
      this.$router.push({
        path: '/status/index',
        query: {
          classID: this.classID,
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },

    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>

