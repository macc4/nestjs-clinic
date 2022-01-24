export class ReadNotificationsCommand {
  public readonly ids: string[];

  constructor(ids: string[]) {
    Object.assign(this, ids);
  }
}
