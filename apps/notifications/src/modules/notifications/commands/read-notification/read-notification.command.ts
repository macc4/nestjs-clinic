export class ReadNotificationCommand {
  public readonly id: string;

  constructor(id: string) {
    Object.assign(this, id);
  }
}
