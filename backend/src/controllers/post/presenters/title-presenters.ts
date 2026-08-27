
export class TitleExisting {
  id: string;
  title: string;
  action: string;

  constructor(id: string, title: string, action: string | "") {
    this.id = id;
    this.title = title;
    this.action = action;
  }
}
