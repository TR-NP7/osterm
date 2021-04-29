<template>
  <div>
    <v-sheet class="box" color="#FFFCE9" elevation="1" rounded outlined tile>
      <v-sheet
        class="imgBox"
        v-if="detail.image != null"
        color="#FFFCE9"
        elevation="1"
        rounded
        outlined
        tile
        style="margin-bottom: 12px"
      >
        <v-img :src="'http://localhost:5000/image/' + detail.image"> </v-img>
      </v-sheet>
      <a style="font-size: 20px; color: black">
        {{ detail.text }}

        <p style="margin-top: 10px" />
      </a>
      <a class="by" style="font-size: 15px; color: black"
        ><strong style="font-weight: bold">Wrote by : </strong>
        {{ detail.name }}
      </a>
      <v-icon @click="dialog = true">mdi-pencil</v-icon>
      <v-icon @click="dialog2 = true">mdi-delete</v-icon>
    </v-sheet>
    <v-dialog v-model="dialog"
      ><v-card>
        <v-card-title class="headline"> Edit post </v-card-title>
        <v-card-text
          >Make sure that you can make this post more useful from other people's
          posts. So if you are sure, you can edit the message and press edit to
          make it more publicly beneficial.</v-card-text
        ><v-textarea
          class="tear-r"
          v-model="detail.text"
          filled
          auto-grow
          label="Your edit"
          rows="4"
          row-height="30"
          rounded
          style="padding: 20px"
        >
        </v-textarea>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="editText"> Edit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2"
      ><v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this post?
        </v-card-title>
        <v-card-text
          >Make sure that this post is irrelevant or useless for you and others.
          If you are confident, you can press Yes, but if you haven't thought
          about it too much, you can press Cancel.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog2 = false"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="deletePost"> Yes </v-btn>
        </v-card-actions>
      </v-card></v-dialog
    >
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      dialog2: false,
    };
  },
  props: {
    detail: {
      name: String,
      text: String,
      value: Number,
      image: String,
      textid: Number,
    },
  },

  methods: {
    deletePost() {
      axios.delete(`http://localhost:5000/api/post/${this.detail.textid}`);
      this.dialog = false;
      console.log("Success");
      console.log(this.detail.textid);
      window.location.reload();
    },
    editText() {
      axios.put(`http://localhost:5000/api/post/${this.detail.textid}`, {
        text: this.detail.text,
      });

      console.log(this.detail.textid);
      console.log(this.detail.text);
      window.location.reload();
    },
  },
};
</script>
<style>
.box {
  border: 3px solid #a5a397 !important;
  border-radius: 20px !important;
  padding: 18px !important;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}
.imgBox {
  border: 3px solid #a5a397 !important;
  border-radius: 20px !important;
}
.by {
  margin-top: 0.55rem !important;
}
</style>
