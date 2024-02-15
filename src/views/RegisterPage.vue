<template>
    <div id="outer">
    <img alt="Vue logo" src="../assets/logo.png" class="top-icon">
    <SW nav="register"></SW>
    <div class="main">
        <label class="lbl">Username:</label><br/>
        <input type="text" required size="25" v-model="username"/><br/><br/>
        <label class="lbl">Email:</label><br/>
        <input type="text" required size="25" v-model="mail"/>
        <p class="tip_1">{{show_tips_1_text}}</p>
        <label class="lbl">Password:</label><br/>
        <input type="text" required size="25" v-model="pwd"/>
        <p class="tip_2">{{show_tips_21_text}}</p>
        <p class="tip_2">{{show_tips_22_text}}</p><br/>
        <button class="sub_btn" @click="submit">Submit</button><br/><br/>
    </div>
    </div>
</template>

<script>
import axios from "axios"
import SW from '../components/SwitchLoginRegister.vue'
export default {
  name: 'RegisterPage',
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
        mail: "",
        pwd: "",
        username: "",
        user:{},
        show_tips_1_text: ' ',
        show_tips_21_text: ' ',
        show_tips_22_text: ' ',
    }
  },
  methods:{
    async submit(){
        this.showLoginFailed = false;
        this.showWelcomeSlogan = false;
        var reg_mail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var reg_pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        try {
            if (reg_mail.test(this.mail)){
                if (reg_pwd.test(this.pwd)){
                    var target_data = {
                        "mail": this.mail,
                        "password": this.pwd,
                        "username": this.username
                    }
                    this.user = axios.post("http://localhost:80/register", target_data).then((res) => {
                        if (res.data.success){
                            this.$message.success("Register Successfully!");
                            this.$router.push('/login');
                        }else{
                            this.$message.error("Register failed! The mail is registered before!");
                        }
                    }).catch(err => console.log(err));
                }else{
                    this.$message.error("Invalid password");
                }
            }else{
                this.$message.error("Invalid email");
            }
        }catch(err){
            console.log(err);
        }
    }
  },
  watch: {
    mail: function(){
        var reg_mail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var tip = document.querySelector('.tip_1');
        if (reg_mail.test(this.mail)){
            this.show_tips_1_text = "Valid Email Address";
            tip.style.color = "#00FFCC";
        }else{
            this.show_tips_1_text = "Please fill in the valid email address.";
            tip.style.color = "#FF0066";
        }
    },
    pwd: function(){
        var reg_pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        var tip = document.querySelector('.tip_2');
        if (reg_pwd.test(this.pwd)){
            this.show_tips_21_text = "Valid password";
            this.show_tips_22_text = ' ';
            tip.style.color = "#00FFCC";
        }else{
            this.show_tips_21_text = "A combination of at least one letter, number, and symbol.";
            this.show_tips_22_text = "It also needs at least 8 characters.";
            tip.style.color = "#FF0066";
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
.top-icon {
    margin-top: 5%;
}

.tip_1 {
    font-size: 12px;
    color: #FF0066;
}

.tip_2 {
    font-size: 12px;
    color: #FF0066;
}
</style>