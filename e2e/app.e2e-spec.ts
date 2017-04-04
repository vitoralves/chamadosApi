import { ChamadosPage } from './app.po';

describe('chamados App', () => {
  let page: ChamadosPage;

  beforeEach(() => {
    page = new ChamadosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
