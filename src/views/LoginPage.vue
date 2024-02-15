<template>
    <div id="outer">
    <img alt="Vue logo" src="../assets/logo.png" class="top-icon">
    <SW nav="login"></SW>
    <div class="main">
        <label class="lbl">Email:</label><br/>
        <input type="text" required size="25" v-model="mail" placeholder="eg. abc@gmail.com"/><br/><br/>
        <label class="lbl">Password:</label><br/>
        <input type="text" required size="25" v-model="password" placeholder="eg. Abcd1234"/><br/><br/><br/>
        <button class="sub_btn" @click="submit">Login</button><br/><br/>
    </div>
    </div>
</template>

<script>
import axios from "axios"
import SW from '../components/SwitchLoginRegister.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginPage',
  components: {
    SW
  },
  props: {
    msg: String
  },
  mounted(){
  },
  data(){
    return{
        username: '',
        password: '',
        mail: ''
    }
  },
  methods:{
    ...mapMutations([
        'set_username',
        'set_password',
        'set_mail',
        'set_address',
        'set_phone',
        'set_uid'
    ]),
    set_value(res_data){
        this.set_username(res_data.content["username"]);
        this.set_password(res_data.content["password"]);
        this.set_mail(res_data.content["mail"]);
        this.set_address(res_data.content["address"]);
        this.set_phone(res_data.content["phone"]);
        this.set_uid(res_data.content["id"]);
    },
    async submit(){
        var reg_mail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var reg_pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        try {
            if (reg_mail.test(this.mail)){
                if (reg_pwd.test(this.password)){
                    var target_data = {
                        "mail": this.mail,
                        "password": this.password,
                        "username": ""
                    }
                    axios.post("http://localhost:80/login", target_data).then((res) => {
                        if (res.data.success){
                            this.set_value(res.data);
                            this.$message.success("Login Successfully!");
                            this.$router.push('/main');
                        }else{
                            this.$message.error("Login Failed! Pleas check out your mail or password");
                        }
                    }).catch(err => console.log(err));
                }else{
                    this.$message.error("Invalid Password!");
                }
            }else{
                this.$message.error("Invalid Email!");
            }
        }catch(err){
            console.log(err);
        }
    }
  }
}
</script>

<style scoped>
#outer {
    background-image: url('../assets/bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
}
.main {
    width: 450px;
    height: 410px;
    margin-left: 43%;
    margin-right: auto;
    text-align: left;
}

label {
    color: white;
}

.top-icon {
    margin-top: 5%;
}

.sub_btn {
    width: 150px;
    height: 8%;
    margin-left: 6%;
    background-color: #41b883;
    color: white;
    font-size: 15px;
    border-radius: 5px 5px 5px 5px;
    background-clip: padding-box;
    cursor: pointer;
}
</style>