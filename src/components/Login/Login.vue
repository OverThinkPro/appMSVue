<template lang="html">
  <div class="login-container">
    <div id="login">
      <div id="l-system-title">
        <h3>煤矿井下精确人员定位系统</h3>
      </div>
      <div id="l-main" class="l-container">
        <div class="lr-container">
          <div class="login-wrapper">
            <form data-vv-scope="my_login_form">
              <div class="input-line">
                <label for="">账户</label>
                <!-- <input id="account" class="form-control" :class="{'is-danger':errors.has('my_login_form.account')}" v-validate="'required'" type="text" name="account" v-model="user.userName"> -->
                <input id="account" class="form-control" v-validate="'required'" type="text" name="account" v-model="user.userName">
              </div>
              <div class="input-line">
                <label for="">密码</label>
                <!-- <input id="password" class="form-control" :class="{'is-danger':errors.has('my_login_form.password')}" v-validate="'required|min:6'" type="password" name="password" v-model="user.password"> -->
                <input id="password" class="form-control" v-validate="'required|min:6'" type="password" name="password" v-model="user.password">
              </div>
              <div class="input-line" style="margin-bottom: 25px;">
                <label for="">验证码</label>
                <div id="input-row">
                  <!-- <input type="text" class="form-control" :class="{'is-danger':errors.has('my_login_form.verifyCodeInp')}" v-validate="'required'" name="verifyCodeInp"> -->
                  <input type="text" class="form-control" v-validate="'required'" name="verifyCodeInp">
                  <div id="verifyCodeContainer"></div>
                </div>
              </div>
              <div class="submit_btn">
                <button type="button" class="btn btn-lg btn-primary btn-block" @click="doLogin()">登录</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <v-footer class="footer-wrap" style="background-color: white;"></v-footer>
  </div>
</template>

<script>
import VFooter from '@/components/Footer/Footer.vue';
import bootbox from 'bootbox';
import axios from 'axios';
import '../../assets/script/Gverify';
import { Validator } from 'vee-validate';

export default {
  name: 'login',
  data () {
    return {
      verifyCode: {},
      result: [true, true, true],
      user: {}
    };
  },
  components: {
    VFooter
  },
  mounted () {
    this.initEvent();
    this.loadVerify();
    this.errors.clear('my_login_form');
    window.addEventListener('keyup', this.doLogin());
  },
  methods: {
    initEvent () {
      let self = this;
      $("#verifyCodeContainer").click(function() {
        $("input[name='verifyCodeInp']").val("");
      });
    },
    loadVerify () {
      let self = this;

      self.verifyCode = new GVerify('verifyCodeContainer');
    },
    doLogin () {
      let self = this;

      // this.$validator.validateAll('my_login_form').then(() => {

        let verifyResult = self.verifyCode.validate($("input[name='verifyCodeInp']").val());
        if (verifyResult) {
          axios.post('/user/login/', self.user).then((response) => {
            let { meta, data } = response.data;

            if (meta.success) {
                if (data && data.user) {
                  let user = data.user;

                  self.errors.clear();
                  window.sessionStorage.setItem('user', JSON.stringify(user));
                  if (data.isHome > 0) {
                    self.$router.push("/Main");
                  } else {
                    self.$router.push("/Welcome");
                  }
                } else {
                  bootbox.alert('用户不存在!');
                }
            } else {
              bootbox.alert('登录失败!');
            }
          });
        } else {
          $("input[name='verifyCodeInp']").val("");
        }
      // }).catch(() => {
      //
      // });
    }
  }
};
</script>

<style lang="css" scoped>
#login {
  width: 100%;
  text-align: left;
}

.success {
  border: 1px;
}

.error {
  border: 1px solid red;
}

#l-system-title {
  width: 100%;
  height: 80px;
  text-align: left;
  padding-left: 30px;
  /*background-color: #337AB7;*/
  background-color: #0079CE;
  /*filter: brightness(88%);*/
}

#l-system-title > h3 {
  margin: 0 0;
  padding: 20px 10px;
  font-family: Microsoft YaHei, STXingkai, Arial;
  font-size: 32px;
  color: #EFEFEF;
  letter-spacing: 10px;
}

.l-container {
  height: 620px;
  width: 100%;
  background: url('./bg_login.png') no-repeat;
  background-size: cover;
}

.lr-container {
  width: 73%;
  height: 620px;
  background-color: rgba(0, 0, 0, 0.15);
  float: right;
}

.login-wrapper {
  float: right;
  margin: 7% 7% 0 0;
  padding: 20px;
  border-radius: 5px;
  color: white;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.3);
}

.input-line {
  margin-bottom: 15px;
}
.input-line > label {
  height: 28px;
  line-height: 28px;
  font-size: 16px;
}
.input-line > input, .input-line > #input-row {
  width: 320px;
  height: 40px;
  line-height: 40px;
}

#input-row {
  position: relative;
}
#input-row > input, #input-row > div {
  display: inline-block;
  width: 43%;
  height: 40px;
  line-height: 40px;
}
#input-row > #verifyCodeContainer {
  position: absolute;
  right: 0;
  background-color: white;
  border-radius: 5px;
  z-index: 4;
}
</style>
