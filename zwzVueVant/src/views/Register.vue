 <template>
  <div class="login_box">
    <div class="b_input">
      <div class="list">
        <span>账号：</span>
        <input type="text" maxlength="50" placeholder="卡号/手机号" class="l_input" id="userName" v-myfocus="userName"  v-model="userName" />
      </div>
      <div class="list">
        <span>密码：</span>
        <input type="text" maxlength="50" placeholder="请输入密码" class="l_input"  id="password" v-myfocus="password" v-model="password"  />
      </div>
      <div class="list">
        <span>确认密码：</span>
        <input type="text" maxlength="50" placeholder="请输入密码" class="l_input"  id="nPassword" v-myfocus="nPassword"  v-model="nPassword"    />
      </div>
      <div class="list">
        <span>验证码：</span>
        <input type="text" maxlength="6" placeholder="请输入验证码" class="l_input"  id="code" v-myfocus="code" v-model="code"      style="width:20vw;"/>
        <div class="send_btn" @click="toSendCode()">获取验证码</div>
      </div>
    </div>

    <div class="b_btn"  @click="toRegister()">注册</div>
    <div class="b_foot">
      <router-link class="f_div" to="login">已有账号，去登陆>></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      // test: '11'
      userName: '',
      password: '',
      nPassword: '',
      code: '',
    };
  },
  methods: {
    onChangeMenu: function(index) {
      this.menuActive = index;
    },
    toSendCode: function(){
      this.utils.uAlert("暂未开发该功能");
    },
    toRegister: function(){
      this.utils.uAlert("暂未开发该功能");
    }
  }
};
</script>

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
      .send_btn {
        background: #f85605 !important;
        padding: 5px 20px;
        color: white;
        line-height: 20px;
        float:right;
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


