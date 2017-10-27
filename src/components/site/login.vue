<template>
<div class="tmpl">
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/login.html">会员登录</a>
        </div>
    </div>
    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <div class="nav-tit">
                    <a class="selected" href="javascript:;">账户登录</a>
                    <i>|</i>
                    <a href="/register.html">免费注册</a>
                </div>

                <div class="login-box">
                    <div class="input-box">
                        <input  type="text"  v-model="form.user_name"  placeholder="用户名/手机/邮箱" maxlength="50">
                    </div>
                    <div class="input-box">
                        <input  type="password" v-model="form.password"  placeholder="输入登录密码" maxlength="16">
                    </div>
                    <div class="btn-box">
                        <input type="button"  @click="login" value="立即登录">
                    </div>
                    <div id="msgtips" class="tip-box"></div>
                    <input id="turl" name="turl" type="hidden" value="http://localhost:8020/cart.html">
                    <!--记住上一页网址-->
                </div>

            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    "user_name": "",
                    "password": ""
                }
            }
        },
        methods: {
            login() {
                this.$http.post('/site/account/login', this.form).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.$router.push({
                        name: 'car'
                    });
                })
            }
        }
    }
</script>
<style scoped>

</style>