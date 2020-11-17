<template>
  <div class="kkbox">
    <h1>kkbox api 練習</h1>
    <form action="">
      <input
        type="search"
        name=""
        id=""
        value="search keywords"
        v-model="InputSearch.keywords"
      />
      <select name="" id="" required v-model="InputSearch.area">
        <option value="HK">HK</option>
        <option value="JP">JP</option>
        <option value="MY">MY</option>
        <option value="SG">SG</option>
        <option value="TW">TW</option>
      </select>
      <select name="" id="" v-model="InputSearch.type">
        <option value="track">track</option>
        <option value="album">album</option>
        <option value="artist">artist</option>
        <option value="playlist">playlist</option>
      </select>
      <button type="submit" @click="GetSearch(InputSearch)">search</button>
    </form>
    <section>
      <div class="list">
        <ul v-if="kkboxData.tracks">
          <div class="title">tracks</div>
          <li
            v-for="item in kkboxData.tracks.data"
            :key="item.id"
            @click="getIframeId(item.id)"
          >
            <img :src="getTrackInfo(item).AlbumImg" alt="" width="50" />
            {{ getTrackInfo(item).artist }}-{{
              getTrackInfo(item).TrackName
            }}
            專輯:{{ getTrackInfo(item).AlbumName }}
          </li>
        </ul>
      </div>
      <iframe 
        v-if="IframeId"
        :src="`https://widget.kkbox.com/v1/?id=${IframeId}&type=song&terr=TW&lang=EN&autoplay=true`" allow="autoplay"
        frameborder="0"
      ></iframe>
    </section>
  </div>
</template>

<style lang="scss">
section {
  // display: flex;
  ul {
    .title {
      background-color: green;
    }
    li {
      text-align: left;
      cursor: pointer;
      list-style-type: decimal;
      img {
        vertical-align: middle;
      }
    }
    li:hover {
      background-color: red;
    }
  }
}
</style>

<script>
import axios from "axios";
import qs from "querystring";
export default {
  data() {
    return {
      authorization: "",
      InputSearch: {
        keywords: "",
        area: "",
        type: "",
      },
      kkboxData: "",
      IframeId: "",
    };
  },
  methods: {
    async GetToken() {
      const config = {
        headers: {
          Accept: "application/x-www-form-urlencoded",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const oauth = {
        grant_type: "client_credentials",
        client_id: "5a1c4b94d2453a8232bc343594ce44be",
        client_secret: "ff69b3f05f46ec05118523a0e99808a5",
      };

      await axios
        .post("/token", qs.stringify(oauth), config)
        .then((res) => {
          console.log(res);
          this.authorization = `Bearer ${res.data.access_token}`;
        })
        .catch((err) => {
          console.log(err);
        });
      // this.GetSearch();
    },
    GetSearch({ keywords, area, type }) {
      const config = {
        headers: {
          Authorization: this.authorization,
        },
      };
      axios
        .get(
          `https://api.kkbox.com/v1.1/search?q=${keywords}${
            type ? `&type=${type}` : ""
          }&territory=${area}`,
          config
        )
        .then((res) => {
          console.log(res);
          this.kkboxData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getIframeId(id) {
      this.IframeId = id;
    },
    getTrackInfo({ id, name, album }) {
      return {
        id: id,
        TrackName: name,
        AlbumName: album.name,
        AlbumImg: album.images[0].url,
        artist: album.artist.name,
      };
    },
  },
  computed: {},
  created() {
    this.GetToken();
  },
};
</script>
