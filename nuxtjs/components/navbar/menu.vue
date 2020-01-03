<template>
  <div>
    <kendo-toolbar>
      <kendo-toolbar-item
        @click="$router.push('/')"
        type="button"
        text="Dashboard"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        @click="$router.push('schedule')"
        type="button"
        text="Schedule"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        :menu-buttons="[
          { text: 'above', icon: 'insert-up' },
          { text: 'between', icon: 'insert-middle' },
          { text: 'below', icon: 'insert-down' }
        ]"
        type="splitButton"
        text="Options"
      >
      </kendo-toolbar-item>
      <kendo-toolbar-item
        @click="$router.push('login')"
        text="Login"
        type="button"
        overflow="always"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        text="Logout"
        type="button"
        overflow="always"
      ></kendo-toolbar-item>
    </kendo-toolbar>
  </div>
</template>
<script>
export default {};
</script>
