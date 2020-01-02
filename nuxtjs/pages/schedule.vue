<template>
  <div>
    <kendo-scheduler
      :data-source="localDataSource"
      :date="date"
      :height="600"
      :timezone="'Etc/UTC'"
      @change="onChange"
      @edit="onEdit"
      @add="onAdd"
      @cancel="onCancel"
      @dataBound="onDataBound"
      @move="onMove"
      @navigate="onNavigate"
      @resize="onResize"
      @save="onSave"
    >
      <kendo-scheduler-view :type="'day'"></kendo-scheduler-view>
      <kendo-scheduler-view
        :type="'workWeek'"
        :selected="true"
      ></kendo-scheduler-view>
      <kendo-scheduler-view :type="'week'"></kendo-scheduler-view>
      <kendo-scheduler-view :type="'month'"></kendo-scheduler-view>
      <kendo-scheduler-view :type="'agenda'"></kendo-scheduler-view>
    </kendo-scheduler>
  </div>
</template>
<script>
export default {
  layout: 'main',
  data() {
    return {
      date: new Date('2013/6/6'),
      localDataSource: [
        {
          id: 1,
          start: new Date('2013/6/6 08:00 AM'),
          end: new Date('2013/6/6 09:00 AM'),
          title: 'Interview'
        },
        {
          id: 2,
          start: new Date('2013/6/6 08:00 AM'),
          end: new Date('2013/6/6 09:00 AM'),
          title: 'Meeting'
        }
      ]
    };
  },
  methods: {
    onChange(ev) {
      console.log('Event :: change');
    },
    onEdit(ev) {
      console.log('Event :: edit');
    },
    onAdd(ev) {
      console.log('Event :: add');
    },
    onCancel(ev) {
      console.log('Event :: cancel');
    },
    onDataBound(ev) {
      console.log('Event :: dataBound');
    },
    onMove(ev) {
      console.log('Event :: move');
    },
    onNavigate(ev) {
      console.log('Event :: navigate');
    },
    onResize(ev) {
      console.log('Event :: resize');
    },
    onSave(ev) {
      console.log('Event :: save');
    }
  }
};
</script>
