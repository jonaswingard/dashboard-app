import { DashboardAppPage } from './app.po';

describe('dashboard-app App', () => {
  let page: DashboardAppPage;

  beforeEach(() => {
    page = new DashboardAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
