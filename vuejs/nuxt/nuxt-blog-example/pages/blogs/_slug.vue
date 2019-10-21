<template>
  <div class="pNewsSlug">
    <section class="div-first">
      <div class="container g-position--overlay g-text-center--xs">
        <div class="g-padding-y-50--xs g-margin-t-100--xs">
          <div class="title-list">
            <h1 class="g-font-size-36--xs g-font-size-50--sm g-font-size-60--md">{{blogCurrent.title}}</h1>
            <h2>{{blogCurrent.date}}</h2>
          </div>
        </div>
      </div>
    </section>

    <div id="js__scroll-to-section" class="div-second">
      <div class="cover-image row g-row-col--0" v-if="blogCurrent.thumbnail">
        <div class="col-md-12 g-full-width--xs">
          <img class="img-responsive" :src="blogCurrent.thumbnail" alt="Image">
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="news-content">
              <div v-html="$md.render(blogCurrent.body)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="div-third">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="card" v-if="blogBack.title">
              <div class="card-body">
                <h4 class="card-title">{{blogBack.title}}</h4>
                <p class="card-date">
                  {{blogBack.date}}
                </p>
                <p class="card-text">
                  {{blogNext.shortBody}}
                </p>
                <a class="card-link-left" :href="blogBack._path"></a>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card" v-if="blogNext.title">
              <div class="card-body">
                <h4 class="card-title">{{blogNext.title}}</h4>
                <p class="card-date">
                  {{blogNext.date}}
                </p>
                <p class="card-text">
                  {{blogNext.shortBody}}
                </p>
                <div class="card-right">
                  <a class="card-link-right" :href="blogNext._path"></a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex"

  export default {
    components: {},
    async asyncData({
      params,
      app,
      payload,
      route,
      store
    }) {
      let result = {
        slug: params.slug
      };

      return result;
    },
    data() {
      return {
        blogCurrent: {},
        blogBack: {},
        blogNext: {}
      };
    },

    computed: {
      ...mapState({
        allBlogs: state => state.allBlogs,
      }),
    },

    created() {
      for (let index = 0; index < this.allBlogs.length; index++) {
        const element = this.allBlogs[index];

        if (element._path.includes(this.slug)) {
          this.blogCurrent = element;

          // min index = 0
          if (index > 0) {
            this.blogBack = this.allBlogs[index-1]
          }

          // mac index = lenght - 1
          if (index < this.allBlogs.length - 1) {
            this.blogNext = this.allBlogs[index+1]
          }

          break;
        }
      }
    }
  };
</script>
