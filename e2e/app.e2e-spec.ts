import { SysAuditAppPage } from './app.po';

describe('sys-audit-app App', () => {
  let page: SysAuditAppPage;

  beforeEach(() => {
    page = new SysAuditAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
