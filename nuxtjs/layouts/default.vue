<template>
  <div>
    <div
      ref="default-header"
      :class="{ 'default-header--hidden': !showNavbar }"
      class="default-header"
    >
      <navbar-menu />
    </div>
    <div ref="default-body" class="default-body">
      <nuxt />
    </div>
  </div>
</template>
<script>
import NavbarMenu from '~/components/navbar/menu.vue';

export default {
  components: {
    NavbarMenu
  },
  data() {
    return {
      vueComp: this,
      showNavbar: true,
      lastScrollPosition: 0,
      onceSetupInitElement: false
    };
  },
  mounted() {
    this.initElement();
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    initElement() {
      const navbarHeight = this.$refs['default-header'].clientHeight || 0;
      const bodyHeight = this.$refs['default-body'].clientHeight || 0;

      const styleValue = (navbarHeight + 15).toString().concat('px');
      this.$utilities.setStyleAttribute(
        this.vueComp,
        'default-body',
        'paddingTop',
        styleValue
      );
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || this.$refs['default-body'].scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
      if (this.showNavbar) {
        this.showDisplayNavbar();
      } else {
        this.hideDisplayNavbar();
      }
    },
    toggleDisplayNavbar() {
      const navbarHeight = this.$refs['default-header'].clientHeight || 0;
      if (navbarHeight > 0) {
        this.hideDisplayNavbar();
      } else {
        this.showDisplayNavbar();
      }
    },
    hideDisplayNavbar() {
      this.$utilities.setStyleAttribute(
        this.vueComp,
        'default-header',
        'display',
        'none'
      );
      this.$utilities.setStyleAttribute(
        this.vueComp,
        'default-body',
        'height',
        '100vh'
      );
      this.$utilities.setStyleAttribute(
        this.vueComp,
        'default-body',
        'marginTop',
        'unset'
      );
    },
    showDisplayNavbar() {
      this.$utilities.setStyleAttribute(
        this.vueComp,
        'default-header',
        'display',
        'block'
      );
    }
  }
};
</script>
<style lang="scss">
@import 'assets/variables.scss';
.default-header {
  font-size: 0.9rem;
  color: #fff;
  background-color: $navbar-background-color;
  padding: 5px 15px;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 2px 15px rgba(71, 120, 120, 0.5);
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
  div > .k-toolbar {
    background-color: $navbar-background-color;
    border: none;
  }
}
.default-header--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
.default-body {
  padding: 15px;
}
</style>
