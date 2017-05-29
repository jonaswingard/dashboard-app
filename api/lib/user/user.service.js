export default {
  getWidgets() {
    return new Promise((resolve) => {
      const items = [{
        componentName: 'DayInfoComponent',
        settings: { ComponentTitle: 'Idag' },
      }, {
        componentName: 'PocketComponent',
        settings: { ComponentTitle: 'Mina pockets', Limit: 3 },
      }, {
        componentName: 'TrafficStatusComponent',
        settings: { ComponentTitle: 'Trafikläget i stan' },
      }, {
        componentName: 'SearchLocationComponent',
        settings: { ComponentTitle: 'Sök hållplats' },
      }, {
        componentName: 'RealtimeComponent',
        settings: { ComponentTitle: 'Östermalmstorg', SiteId: '9206' },
      }];

      resolve(items);
    });
  },
};
