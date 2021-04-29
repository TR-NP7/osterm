
<template>
<v-app>
  <div class="content">
    <v-card style="border-radius: 0px; ">
      <v-card-title class="blockTop">
        <h1 class="webTitle">SHarIng.com</h1>
      </v-card-title>
    </v-card>
    <v-tabs v-model="tab" background-color="#a5a397">
      <v-tab class="contents" v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <div class="bgCon">
      <v-tabs-items v-model="tab">
        <v-tab-item :value="0">
          <div style="background-color: #fffce9">
            <v-card color="#fffce9" flat>
              <v-card-text>
                <!-- {{ item.content }} -->
                <Post :value="1" @onAdd="fetchdata"/>
              </v-card-text>
            </v-card>
          </div>
        </v-tab-item>
        <v-tab-item :value="1">
          <div style="background-color: #fffce9">
            <v-card color="#fffce9" flat>
              <v-card-text>
                <!-- {{ item.content }} -->
                <Post :value="2" @onAdd="fetchdata"/>
              </v-card-text>
            </v-card>
          </div>
        </v-tab-item>
        <v-tab-item :value="2">
          <div style="background-color: #fffce9">
            <v-card color="#fffce9" flat>
              <v-card-text>
                <!-- {{ item.content }} -->
                <Post :value="3" @onAdd="fetchdata"/>
              </v-card-text>
            </v-card>
          </div>
        </v-tab-item>
        <v-tab-item :value="3">
          <div style="background-color: #fffce9">
            <v-card color="#fffce9" flat>
              <v-card-text>
                <!-- {{ item.content }} -->
                <Post :value="4" @onAdd="fetchdata"/>
              </v-card-text>
            </v-card>
          </div>
        </v-tab-item>
      </v-tabs-items>
      <div style="padding: 12px;">
      <div v-for="(detail, x) in details" :key="x">
        <Posted :detail="detail" @onEdit="fetchdata"/>
      </div>
      </div>
    </div>
  </div>
</v-app>
</template>

<script>
import Post from "./components/post.vue";
import Posted from "./components/posted.vue";
import axios from "axios";
export default {
  components: {
    Post,
    Posted,
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: "Life" }, 
        { tab: "Hobbie" }, 
        { tab: "Travel" }, 
        { tab: "Weather" }, 
      ],
      details: [],
    };
  },
  async mounted() {
   await this.fetchdata();
  },
  watch: {
    async tab() {
      await this.fetchdata();
    },
  },
  methods: {
    async fetchdata(){
      const response = await axios.get(
        `http://localhost:5000/api/post/${this.tab + 1}`
      );
      this.details = response.data;
    }
  } 

};
</script>
<style >
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Spartan&display=swap");
.content {
  /* font-family: "Quicksand", sans-serif; */
  
  font-family: "Spartan", sans-serif;
}
.blockTop {
  background-color: #a5a397;
}
.webTitle {
  margin-top: 20px;
  color: #fffce9;

  font-size: 45px;
  font-style: normal;
  font-weight: bolder;
}
.contents {
  /* background-color: #a5a397 !important; */
  color: #fffce9 !important;
  font-weight: bolder !important;
}
.bgCon {
  background-color: #fffce9 !important;
}
</style>