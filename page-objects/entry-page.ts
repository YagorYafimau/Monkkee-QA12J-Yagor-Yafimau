import { Page } from 'playwright';

export class EntryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickCreateNewEntryButton() {
    await this.page.getByRole('link', { name: 'Create an entry' }).click();
  }

  async fillEntryText(text: string) {
    await this.page.getByLabel('false').getByRole('paragraph').click();
    await this.page.getByLabel('false').fill(text);
  }

  async saveEntry() {
    await this.page.getByLabel('Exit edit mode').click();
  }
}
