import { Routes } from '@nestjs/core';
import { DoctorsAppointmentsModule } from './modules/appointments/doctors-appointments.module';
import { DoctorsModule } from './modules/doctors/doctors.module';

export const routes: Routes = [
  {
    path: '/doctors',
    module: DoctorsModule,
    children: [
      {
        path: '/:doctorId/appointments',
        module: DoctorsAppointmentsModule,
      },
    ],
  },
];
