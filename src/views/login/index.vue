<!-- @format -->

<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <a href="javascript:void(0)" title="知学运营管理平台" class="logo" slot="title">
        </a>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules" >
            <FormItem label="登录方式" :label-width="70">
              <Select v-model="form.loginType">
                <Option :value="1">域账号</Option>
                <Option :value="2">非域账号</Option>
              </Select>
            </FormItem>
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              >
                <span slot="prepend">
                  <Icon :size="16" type="ios-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      form: {
        loginType: 2, // 默认域账号登录方式 [1 域账号,2 非域账号]
        userName: 'zx_admin',
        password: '1@admin'
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 表单验证通过
          this.$store
            .dispatch('LoginByUsername', {
              userName: this.userName,
              password: this.password
            })
            .then(() => {
              this.$router.push({
                name: 'dashboard'
              });
            })
            .catch(err => {
              this.$Message.error('err');
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
