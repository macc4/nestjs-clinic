import { IResolutionCreated } from '../../interfaces/IResolutionCreated';

export class CreateResolutionNotificationCommand {
  public readonly type: string;
  public readonly date: Date;
  public readonly recepientUserId: string;
  public readonly resolutionId: number;
  public readonly patientUserId: string;
  public readonly patientAvatarUrl: string;

  constructor(data: IResolutionCreated) {
    Object.assign(this, data);

    this.date = new Date();
    this.type = 'resolutionCreated';
  }
}
