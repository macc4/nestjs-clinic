export class GetNotificationsQuery {
  public readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
