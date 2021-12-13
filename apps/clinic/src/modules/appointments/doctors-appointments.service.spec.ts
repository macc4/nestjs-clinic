import { Test } from '@nestjs/testing';
import { DoctorsService } from '../doctors/doctors.service';
import { Appointment } from './entities/appointment.entity';
import { DoctorsAppointmentsService } from './doctors-appointments.service';
import { DoctorsAppointmentsRepository } from './doctors-appointments.repository';
import { GetDoctorsAppointmentsQueryDto } from './dto/get-doctors-appointments-query.dto';

const mockAppointment = new Appointment();
const mockDoctorsAppointmentQuery = new GetDoctorsAppointmentsQueryDto();

describe('DoctorsAppointmentsService', () => {
  let doctorsAppointmentsService: DoctorsAppointmentsService;
  let doctorsAppointmentsRepository: any;
  let doctorsService: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DoctorsAppointmentsService,
        {
          provide: DoctorsAppointmentsRepository,
          useValue: { getAppointmentsByDoctorId: jest.fn() },
        },
        {
          provide: DoctorsService,
          useValue: { getDoctorById: jest.fn() },
        },
      ],
    }).compile();

    doctorsAppointmentsService = module.get(DoctorsAppointmentsService);
    doctorsAppointmentsRepository = module.get(DoctorsAppointmentsRepository);
    doctorsService = module.get(DoctorsService);
  });

  describe('calls getAppointmentsByDoctorId', () => {
    it('returns the [data]', async () => {
      expect.assertions(1);

      doctorsAppointmentsRepository.getAppointmentsByDoctorId.mockResolvedValue(
        mockAppointment,
      );

      expect(
        await doctorsAppointmentsService.getAppointmentsByDoctorId(
          1,
          mockDoctorsAppointmentQuery,
        ),
      ).toEqual(mockAppointment);
    });
  });

  describe('calls getFreeAppointmentsByDoctorId', () => {
    it('returns the [data]', async () => {
      expect.assertions(2);

      const date = '2021-12-31T00:00:00.000Z';

      const expectedResult = [
        '2021-12-31T08:00:00.000Z',
        '2021-12-31T09:00:00.000Z',
        '2021-12-31T10:00:00.000Z',
        '2021-12-31T11:00:00.000Z',
        '2021-12-31T12:00:00.000Z',
        '2021-12-31T13:00:00.000Z',
        '2021-12-31T14:00:00.000Z',
        '2021-12-31T15:00:00.000Z',
        '2021-12-31T16:00:00.000Z',
      ];

      mockAppointment.visitDate = new Date(date);

      doctorsAppointmentsRepository.getAppointmentsByDoctorId.mockResolvedValue(
        [mockAppointment],
      );

      expect(
        await doctorsAppointmentsService.getFreeAppointmentsByDoctorId(
          1,
          new Date(date),
        ),
      ).toEqual(expectedResult);
      expect(doctorsService.getDoctorById).toHaveBeenCalledTimes(1);
    });
  });
});
