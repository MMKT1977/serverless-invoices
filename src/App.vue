<template>
    <div id="app"
         class="min-vh-100"
         :class="$route.name">
        <vue-progress-bar/>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
        <notifications position="bottom center" classes="snackbar" width="332"/>
    </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    this.pauseAnimationsUntilLoaded();
  },
  mounted() {
    this.initColorScheme();
  },
  methods: {
    jsLoaded() {
      document.body.classList.remove('js-loading');
    },
    pauseAnimationsUntilLoaded() {
      document.body.classList.add('js-loading');
      window.addEventListener('load', this.jsLoaded, false);
    },
    initColorScheme() {
      // local storage is used to override OS theme settings
      if (localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') === 'dark') {
          this.$store.commit('themes/theme', 'dark');
          return document.documentElement.setAttribute('data-theme', 'dark');
        }
      } else if (!window.matchMedia) {
        // matchMedia method not supported
        return false;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // OS theme setting detected as dark
        this.$store.commit('themes/theme', 'dark');
        return document.documentElement.setAttribute('data-theme', 'dark');
      }
      document.documentElement.setAttribute('data-theme', this.theme || 'light');
    },
  },
};
</script>

<style lang="scss">
// 1. Load variables first (ensure path is correct)
@import '@/assets/scss/variables';

// 2. Import Bootstrap SCSS (corrected paths)
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';

// 3. Load your app styles (ensure file exists)
@import '@/assets/scss/app';
</style>
