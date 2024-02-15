<template>
<div id="root">
    <a-icon v-if="showEmptyIcon" type="solution" id="init-img"/>
    <a-layout v-if="!showEmptyIcon">
        <a-layout-header>
            <p>{{ dst.name }}</p>
        </a-layout-header>
        <a-layout-content>
        <a-list item-layout="horizontal" :data-source="display_message" :split="isSplit">
                <a-list-item slot="renderItem" slot-scope="item">
                <a-row v-if="item.left" class="l-message">
                    <a-col :span="1"></a-col>
                    <a-col :span="1">
                        <a-avatar 
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    </a-col>
                    <a-col :span="22">
                        <p style="margin-top: 1%">{{ item.text }} </p>
                    </a-col>
                </a-row>
                <a-row v-if="!item.left" class="r-message">
                    <a-col :span="22">
                        <p style="margin-top: 1%">{{ item.text }} </p>
                    </a-col>
                    <a-col :span="1">
                        <a-avatar 
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    </a-col>
                    <a-col :span="1"></a-col>
                </a-row>
                </a-list-item>
            </a-list>
        </a-layout-content>
        <a-layout-footer>
            <a-row style="line-height: 40px">
                <a-col :span="22">
                    <a-input v-model="mess" placeholder="説點什麽..." size="large"></a-input>
                </a-col>
                <a-col :span="2">
                    <a-button type="primary" @click="submit_message" style="height: 40px; float: left; width: 75%"><a-icon type="message" /></a-button>
                </a-col>
            </a-row>
        </a-layout-footer>
    </a-layout>
</div>
</template>

<script>
import axios from "axios"
import { mapState, mapMutations } from "vuex"
export default {
    name: "ConversationView",
    data(){
        return{
            showEmptyIcon: true,
            isSplit: false,
            display_message: [],
            mess: '',
            ws: '',
        }
    },
    computed: mapState({
        uid: (state) => state.uid,
        dst: (state) => state.dst,
        mail: (state) => state.mail,
        password: (state) => state.password,
        username: (state) => state.username,
        friends: (state) => state.friends
    }),
    mounted(){
        this.init_message();
        this.websocket();
    },
    methods: {
        ...mapMutations(["set_dst", "set_message", "set_friends"]),
        async refresh_data(){
            this.refresh_friends().then(this.synchronize_data).then(this.init_message);
        },
        async refresh_friends(){
            return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                    axios.post("http://localhost:80/get_friends", {
                        mail: this.mail,
                        username: this.username,
                        password: this.password
                    }).then((res) => {
                        if (res.data.success) {
                            this.set_friends(res.data.content);
                            resolve("refresh_friends resolved");
                        } else {
                            this.$message.error("Data Access Permission Denied!");
                            reject("refresh_friends rejected");
                        }
                    }).catch((err) => console.log(err));
                }, 1000);
            })
        },
        synchronize_data(){
            // Synchronize dst and message
            let mess = {};
            let dst_id = this.dst.uid;
            let dst_name = this.dst.name;
            for (let i=0; i<this.friends.length; i++){
                mess[this.friends[i]["uid"]] = this.friends[i]["message"];
            }
            this.set_message(mess);
            this.set_dst({
                "uid": dst_id,
                "name": dst_name,
                "message": mess[dst_id]
            });
        },
        init_message() {
            if (this.dst.message==undefined) return;
            let len = this.dst.message.length;
            if (len > 5){
                // 只展示最近五個消息
                this.display_message = this.dst.message.slice(len-5);
            }else{
                this.display_message = this.dst.message;
            }
        },
        submit_message() {
            if (this.mess=='') return;
            this.ws.send("{'srcUID':" + this.uid + ",'dstUID':'" + this.dst["uid"] + "','message':'" + this.mess + "'}");
            this.refresh_data();
            this.mess = '';
        },
        websocket(){
            this.ws = new WebSocket("ws://localhost:8086/channel");
            this.ws.addEventListener("message", (e) => {
                console.log("Received Data:", e.data);
                this.refresh_data();
            });
            this.ws.addEventListener("close", (e) => {
                let {code, reason} = e;
                console.log(`链接断开:code=${code}, reason=${reason}`);
                this.ws.send("[CLOSE]:" + this.uid);
            });
            this.ws.addEventListener("open", (e) => {
                console.log("链接建立...", e);
                this.ws.send("[INIT]:" + this.uid);
            });
            this.ws.addEventListener("error", (e) => {
                console.log(e);
                this.$message.error("Connection Error! Please check out your network");
                this.ws.send("[CLOSE]:" + this.uid);
            });
        }
    },
    watch: {
        dst: function () {
            this.showEmptyIcon = false;
            this.init_message();
        },

    }
}
</script>

<style scoped>

#root {
    height: 100%;
    text-align: center;
}

#init-img {
    margin-top: 15%;
    font-size: 100px;
    color: #696969;
}

.ant-layout {
  height: 85vh;
}

.ant-layout > .ant-layout-header{
    text-align: left;
    background-color: #A9A9A9;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.l-message {
    width: 100%;
    text-align: left;
}

.r-message {
    width: 100%;
    text-align: right;
}

.ant-list-split {
    border: 0px;
}

.infinite-container {
    bottom: 40px;
}
</style>