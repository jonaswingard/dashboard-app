// import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

export default {
  getWidgets() {
    return new Promise((resolve) => {
      const items = [
        {
          componentName: 'PocketComponent',
          settings: {
            ComponentTitle: 'Mina pockets',
            Limit: 3,
            Size: 'widget-item--medium',
            Hidden: false,
          },
        },
        {
          componentName: 'RealtimeComponent',
          settings: {
            ComponentTitle: 'Östermalmstorg',
            SiteId: '9206',
            Size: 'widget-item--small',
            Hidden: false,
          },
        },
        {
          componentName: 'TrafficStatusComponent',
          settings: {
            ComponentTitle: 'Trafikläget i stan',
            Size: 'widget-item--small',
            Hidden: false,
          },
        },
        {
          componentName: 'SearchLocationComponent',
          settings: {
            ComponentTitle: 'Sök hållplats',
            Size: 'widget-item--medium',
            Hidden: false,
          },
        },
        {
          componentName: 'DayInfoComponent',
          settings: {
            ComponentTitle: 'Idag',
            Size: 'widget-item--small',
            Hidden: false,
          },
        },
      ];

      resolve(items);
    });
  },
};
