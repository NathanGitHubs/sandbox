import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', (): void => {
  let page: AppPage;

  beforeEach((): void => {
    page = new AppPage();
  });

  it('should display welcome message', (): void => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('my-first-angular-project app-main-user-interaction-&-outputs is running!');
  });

  afterEach(async (): Promise<any> => {
    // Assert that there are no errors emitted from the browser
    const logs: any = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
