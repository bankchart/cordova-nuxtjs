<template>
  <div>
    <div class="col-xs-12 col-sm-12">
      <kendo-toolbar
        @click="onClick"
        @close="onClose"
        @open="onOpen"
        @toggle="onToggle"
        @overflowClose="onOverflowClose"
        @overflowOpen="onOverflowOpen"
      >
        <kendo-toolbar-item type="button" text="Button"></kendo-toolbar-item>
        <kendo-toolbar-item
          :togglable="true"
          type="button"
          text="Toggle Button"
        ></kendo-toolbar-item>
        <kendo-toolbar-item
          :menu-buttons="[
            { text: 'Insert above', icon: 'insert-up' },
            { text: 'Insert between', icon: 'insert-middle' },
            { text: 'Insert below', icon: 'insert-down' }
          ]"
          type="splitButton"
          text="Insert"
        >
        </kendo-toolbar-item>
        <kendo-toolbar-item
          type="button"
          text="Action"
          overflow="always"
        ></kendo-toolbar-item>
      </kendo-toolbar>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log('inside mounted');
  },
  methods: {
    onClick(e) {
      console.log('Event :: click');
    },
    onClose(e) {
      console.log('Event :: close');
    },
    onOpen(e) {
      console.log('Event :: open');
    },
    onToggle(e) {
      console.log('Event :: toggle');
    },
    onOverflowClose(e) {
      console.log('Event :: overflow close');
    },
    onOverflowOpen(e) {
      console.log('Event :: overflow open');
    }
  }
};
</script>
<style lang="scss">
.k-toolbar {
  a.k-button {
    background: none;
    border: none;
  }
}
</style>
