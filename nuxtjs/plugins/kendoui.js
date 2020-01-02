import Vue from 'vue';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default/dist/all.css';

import { ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper';
import { LayoutInstaller } from '@progress/kendo-layout-vue-wrapper';
import { SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper';

Vue.use(ButtonsInstaller);
Vue.use(LayoutInstaller);
Vue.use(SchedulerInstaller);
