
export class TitleExisting {
  id: string;
  title: string;
  isEdit: boolean | "";

  constructor(id: string, title: string, isEdit: boolean | "") {
    this.id = id;
    this.title = title;
    this.isEdit = isEdit;
  }
}
