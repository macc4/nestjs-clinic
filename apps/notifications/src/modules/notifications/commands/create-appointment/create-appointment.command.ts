import { IAppointmentCreated } from '../../interfaces/IAppointmentCreated';

export class CreateAppointmentNotificationCommand {
  public readonly type: string;
  public readonly date: Date;
  public readonly recepientUserId: string;
  public readonly appointmentId: number;
  public readonly patientUserId: string;
  public readonly patientAvatarUrl: string;

  constructor(data: IAppointmentCreated) {
    Object.assign(this, data);

    this.date = new Date();
    this.type = 'appointmentCreated';
  }
}
