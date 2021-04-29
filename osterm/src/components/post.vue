<template>
  <div>
    <v-sheet class="s-r" color="#A5A397" elevation="1" rounded outlined tile>
      <v-form>
        <v-col cols="12" sm="12" style="padding-bottom: 0px">
          <div style="margin-bottom: 0px">
            <v-textarea
              class="tear-r"
              filled
              auto-grow
              label="Your share"
              rows="4"
              row-height="30"
              rounded
              v-model="text"
              background-color="#FFFCE9"
              color="black"
            ></v-textarea>
          </div>
        </v-col>
        <v-col cols="12">
          <v-row class="ro-nam-po" justify="center">
            <v-col
              cols="12"
              sm="6"
              md="3"
              style="padding-top: 0px; padding-bottom: 0px"
            >
              <v-text-field
                class="nam-r"
                label="Your name"
                filled
                rounded
                v-model="name"
                background-color="#FFFCE9"
                color="black"
              ></v-text-field>
            </v-col>
            <v-file-input
              class="in"
              accept="image/*"
              ref="file"
              v-model="image"
              filled
              rounded
              label="Image input"
              color="black"
              placeholder="Select your image"
              prepend-icon="mdi-paperclip"
              :show-size="1000"
              @change="handleChangeImage"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" dark label small>
                  {{ text }}
                </v-chip>

                <!-- <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ image.length - 2 }} File(s)
                </span> -->
              </template>
            </v-file-input>
            <v-spacer />
            <v-spacer />
            <v-spacer />
            <v-spacer />
            <v-spacer />
            <v-spacer />
            <v-col style="padding-top: 0px">
              <v-card-actions style="padding: 0px">
                <v-btn
                  @click="addpost"
                  class="but-r"
                  color="#FFFCE9"
                  rounded
                  depressed
                >
                  Post
                </v-btn>
              </v-card-actions></v-col
            >
          </v-row>
        </v-col>
      </v-form>

      <!-- <v-btn depressed color="#FFFCE9"> Post </v-btn> -->
    </v-sheet>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      text: "",
      image: null,
    };
  },
  props: {
    value: Number,
    
  },
  methods: {
    handleChangeImage(e) {
      console.log(e);
      this.image = e;
      console.log("show image");
    },
    async addpost() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("text", this.text);
      formData.append("value", this.value);
      formData.append("image", this.image);

      axios.post("http://localhost:5000/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(()=>{
        this.$emit('onAdd');
      })    
    },
  },
};
</script>
<style>
.s-r {
  border-radius: 20px !important;
}
.tear-r {
  border-radius: 20px !important;
}
.nam-r {
  border-radius: 20px !important;
  margin-bottom: 0px !important;
}
.but-r {
  border-radius: 18px !important;
  font-weight: bold !important;
  font-size: 18px !important;
  width: 140px !important;
  height: 55px !important;
}
.ro-nam-po {
  /* display: flex !important ;
  flex: 0 1 150px !important ; */
}
.in {
  width: 250px;
  border-radius: 20px !important;
}
</style>