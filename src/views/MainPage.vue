<template>
  <a-layout>
    <a-layout-sider>
      <a-list item-layout="horizontal" :data-source="friend_list" id="sider-friend-list" >
        <a-list-item slot="renderItem" slot-scope="item, index" id="sider-friend-list-item">
          <a-list-item-meta
            :description="get_description(item)"
            @click="get_in_conversation(index)">
            <p slot="title">{{ item.name }}</p>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <a-divider />
    </a-layout-sider>
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <ConversationView></ConversationView>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import axios from "axios"
import ConversationView from '../components/ConversationView.vue'
export default {
  name: "MainPage",
  components: {
    ConversationView
  },
  data() {
    return {
      friend_list: [],
    }
  },
  computed: mapState({
    friends: (state) => state.friends,
    message: (state) => state.message,
    uid: (state) => state.uid,
    mail: (state) => state.mail,
    password: (state) => state.password,
    username: (state) => state.username
  }),
  mounted(){
    this.init_friends().then(this.init);
  },
  methods: {
    ...mapMutations(["set_dst", "set_message", "set_friends"]),
    get_in_conversation(ind){
        this.set_dst({
          "uid": this.friend_list[ind]["uid"],
          "name": this.friend_list[ind]["name"],
          "message": this.message[this.friend_list[ind]["uid"]]
        });
    },
    async init_friends(){
      return new Promise((resolve, reject) => {
        window.setTimeout(() => {
          axios.post("http://localhost:80/get_friends", {
              mail: this.mail,
              username: this.username,
              password: this.password
            }).then((res) => {
              if (res.data.success) {
                this.set_friends(res.data.content);
                resolve("init_friends resolved");
              } else {
                this.$message.error("Data Access Permission Denied!");
                reject("init_friends rejected");
              }
            }).catch((err) => console.log(err));
        }, 1000);
      });
    },
    init(){
      this.friend_list = [];
      let mess = {};
      for (let i=0; i<this.friends.length; i++){
        // for this component
        let len = this.friends[i].message.length;
        this.friend_list.push({
          "uid": this.friends[i]["uid"],
          "name": this.friends[i]["name"],
          "description": len > 0 ? this.friends[i].message[len-1].text : ""
        });
        // for all components
        mess[this.friends[i]["uid"]] = this.friends[i]["message"];
      }
      this.set_message(mess);
    },
    get_description(item){
      return item.description;
    }
  },
  watch: {
    friends: function() {
      // if friends changed in ConversationView.vue, then it will changed data in this component too
      this.friend_list = [];
      for (let i=0; i<this.friends.length; i++){
        // for this component
        let len = this.friends[i].message.length;
        this.friend_list.push({
          "uid": this.friends[i]["uid"],
          "name": this.friends[i]["name"],
          "description": len > 0 ? this.friends[i].message[len-1].text : ""
        });
      }
    }
  }
};
</script>

<style scoped>
.ant-layout {
  height: 100vh;
}

.ant-layout > .ant-layout-sider {
  background-color: white;
  margin-left: 5vw;
  margin-top: 8.8vh;
  margin-bottom: 6.5vh;
  border-radius: 10px 0 0 10px;
}

.ant-layout > .ant-layout-header,
.ant-layout-footer {
    background-color: #F0F2F5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.ant-layout > .ant-layout-content {
  background-color: #DCDCDC;
  margin-right: 5vw;
}

#sider-friend-list-item {
    cursor: pointer;
    text-align: left;
}

.ant-list-item-meta {
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
