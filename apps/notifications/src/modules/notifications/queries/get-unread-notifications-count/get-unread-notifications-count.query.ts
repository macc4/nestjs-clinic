export class GetUnreadNotificationsCountQuery {
  public readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
