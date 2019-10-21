<template>
  <div class="pNews">
    <section class="div-first">
      <div class="container g-position--overlay g-text-center--xs">
        <div class="g-padding-y-50--xs g-margin-t-100--xs">
          <div class="title-list">
            <p>NEWS</p>

          </div>
        </div>
        <div class="row g-margin-b-40--xs">
          <div class="col-md-12 categories">
            <span class="g-display-block--xs g-display-inline-block--sm g-padding-x-5--xs g-margin-b-10--xs g-margin-b-0--sm" v-for="(item, index) in categories" :key="`category-${index}`">
              <a class="category-item" :class="item.value === categorySelected.value ? 'active' : ''" @click="filterBlogsByCategoryTitle(item)">{{item.name}}</a>
            </span>
          </div>
        </div>

      </div>
    </section>

    <div class="div-third">
      <div class="container">
        <div class="row">
          <div class="col-sm-6" v-for="(item, index) in blogsFilter" :key="`blog-${index}`">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">{{item.title}}</h4>
                <p class="card-date">
                  {{item.date}}
                </p>
                <p class="card-text">
                  {{item.shortBody}}
                </p>
                <a class="card-link" :href="item._path">==></a>
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
  } from "vuex";

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
      };
      return result;
    },
    data() {
      return {
        categorySelected: {
          name: 'All',
          value: ''
        },
        categories: [{
          name: 'All',
          value: ''
        }],
        blogsFilter: []
      };
    },

    computed: {
      ...mapState({
        allCategories: state => state.allCategories,
        allBlogs: state => state.allBlogs,
      }),
    },

    created() {
      for (let index = 0; index < this.allCategories.length; index++) {
        const element = this.allCategories[index];
        this.categories.push({
          name: element.title,
          value: element.title
        })
      }

      this.filterBlogsByCategoryTitle(this.categorySelected);
    },

    methods: {
      filterBlogsByCategoryTitle(category) {
        var posts = this.allBlogs;
        this.blogsFilter = posts.filter(function(obj) {
          return category.value === '' ? true : obj.category == category.value
        });

        this.categorySelected = category;
      }
    }
  };
</script>
