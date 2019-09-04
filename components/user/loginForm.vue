<template>
    <el-form 
    :model='formlist'
    :rules="rule"
        ref="form" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input v-model="formlist.username"
            placeholder="用户名/手机">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input  v-model="formlist.password"
            placeholder="密码" 
            type="password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary" @click="loginclick">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    data(){
        return{
            formlist:{
                username:'13800138000',
                password:'123456'
            },
            rule:{
         username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
          ]
            }
        }
    },
    methods:{
        loginclick(){
        this.$refs.form.validate(valid=>{
            if(valid){
                this.$axios({
                    url:'/accounts/login',
                    method:'POST',
                    data:this.formlist
                }).then(res=>{
                    console.log(res)
                    // 在登录成功的时候，调用store方法，保存token值
                    this.$store.commit('user/setUserInfo', res.data)
                    // console.log(this.$store)
                })
            }else{
                // this.$message.error('')
                // console.log('hehei')
                this.$message.error('请确认输入信息')
                return false;
            }
        })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>