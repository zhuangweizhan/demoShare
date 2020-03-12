 <template>
  <div class="login_box">
    <div class="b_input">
      <div class="list">
        <span>账号：</span>
        <input type="text" maxlength="50" placeholder="卡号/手机号" class="l_input" v-model="userName" />
      </div>
      <div class="list">
        <span>密码：</span>
        <input
          type="password"
          maxlength="50"
          placeholder="当前密码为：a123456"
          class="l_input"
          v-model="password"
        />
        <div class="cButton">
          <span></span>
        </div>
      </div>
    </div>
    <div class="b_btn" @click="toLogin">登录</div>
    <div class="b_foot">
      <router-link class="f_div" to="register">立即注册</router-link>
      <router-link class="f_div" to="forget">忘记密码</router-link>
    </div>
  </div>
</template>
<style scoped lang="scss">
.login_box {
  padding: 10px 8px;
  .b_input {
    margin-bottom: 10px;
    background: #fff;
    border-radius: 4px;
    border: #dadada 1px solid;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    text-align: left;
    .list {
      padding: 6px 10px;
      font-style: normal;
      font-size: 14px;
      border-bottom: #e0e0e0 1px solid;
      position: relative;
      .l_input {
        width: 60%;
        height: 30px;
        line-height: 30px;
        overflow: visible;
        border: 0;
      }
    }
  }
  .b_btn {
    font-weight: 400;
    height: 35px;
    text-align: center;
    font-size: 16px;
    line-height: 35px;
    border-radius: 2px;
    display: inline-block;
    background: #f85605 !important;
    width: 100%;
    color: white;
  }
  .b_foot {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .f_div {
      color: #3366cc;
      font-size: 14px;
    }
  }
}
</style>
<script>
export default {
  name: "Login",
  data() {
    return {
      userName: "体验账号",
      password: "a123456"
    };
  },
  computed: {
    // userName() {
    //   return this.$store.getters.getUserName;
    // }
  },
  methods: {
    toLogin: async function() {
      if (this.userName == "" || this.password == "") {
        this.utils.uAlert("请输入账号跟密码");
        return;
      }
      this.$store.dispatch("toLoginAction", {
        userName: this.userName,
        password: this.password
      });
    }
  },
  watch: {
    "$store.getters.getIsLogin": function(newFlag) {
      if (newFlag) {//说明此时登录成功
        let redirect = this.$route.query.redirect;
         this.$router.push({ path: redirect ?  redirect: '/'});
      }
    }
  }
};
</script>

