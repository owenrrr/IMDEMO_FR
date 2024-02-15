<template>
<div class="upper_tool">
    <a @click="s_login" class="a1"><u>Login</u></a>
    <span class="mid-span">/</span>
    <a @click="s_register" class="a2"><u>Register</u></a>
</div>
</template>

<script>
export default {
    name: 'SwitchLoginRegister',
    props: {
        nav: String
    },
    mounted(){
        var a1 = document.querySelector('.a1');
        var a2 = document.querySelector('.a2');
        if (this.nav == 'login'){
            a1.style.fontSize = "25px";
            a2.style.fontSize = "18px";
        }else{
            a1.style.fontSize = "18px";
            a2.style.fontSize = "25px";
        }
    },
    methods: {
        s_login(){
            if (this.nav != 'login') this.$router.push('/login');
            var a1 = document.querySelector('.a1');
            var a2 = document.querySelector('.a2');
            a1.style.fontSize = "25px";
            a2.style.fontSize = "18px";
        },
        s_register(){
            if (this.nav != 'register') this.$router.push('/register');
            var a1 = document.querySelector('.a1');
            var a2 = document.querySelector('.a2');
            a1.style.fontSize = "18px";
            a2.style.fontSize = "25px";
        }
    }
}

</script>

<style scoped>
a, span {
    color: white;
}

.upper_tool {
    height: 50px;   
}

.mid-span {
    margin-left: 2.5%;
    margin-right: 2.5%;
    font-size: 25px;
    cursor: pointer;
}

.a1 {
    font-size: 25px;
    cursor: pointer;
}

.a2 {
    font-size: 18px;
    cursor: pointer;
}

a:hover {
    background-color: #41B883;
}
</style>