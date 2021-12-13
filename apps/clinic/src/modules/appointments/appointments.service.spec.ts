import { GetUserDto } from '@macc4-clinic/common';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DoctorsService } from '../doctors/doctors.service';
import { Doctor } from '../doctors/entities/doctor.entity';
import { ProfileService } from '../grpc/grpc-profile.service';
import { Patient } from '../patients/entities/patient.entity';
import { PatientsService } from '../patients/patients.service';
import { AppointmentsRepository } from './appointments.repository';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { GetMyAppointmentsResponseDto } from './dto/get-my-appointments-response.dto';

const mockGetUserDto = new GetUserDto();
const mockCreateAppointmentDto = new CreateAppointmentDto();
const mockPatient = new Patient();
const mockDoctor = new Doctor();
const mockAppointment = new Appointment();
const mockGetMyAppointmentsResponseDto = new GetMyAppointmentsResponseDto();

mockGetMyAppointmentsResponseDto.patientUserId = '4';
mockGetMyAppointmentsResponseDto.doctorUserId = '4';

describe('AppointmentsService', () => {
  let appointmentsService: AppointmentsService;
  let appointmentsRepository: any;
  let patientsService: any;
  let doctorsService: any;
  let profileService: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: AppointmentsRepository,
          useValue: {
            createAppointment: jest.fn(),
            getAppointmentByDoctorIdAndVisitDate: jest.fn(),
            getMyAppointments: jest.fn(),
            getAppointmentById: jest.fn(),
          },
        },
        {
          provide: PatientsService,
          useValue: { getPatientByUserId: jest.fn() },
        },
        {
          provide: DoctorsService,
          useValue: { getDoctorById: jest.fn() },
        },
        {
          provide: ProfileService,
          useValue: { getBatchProfiles: jest.fn() },
        },
      ],
    }).compile();

    appointmentsService = module.get(AppointmentsService);
    appointmentsRepository = module.get(AppointmentsRepository);
    patientsService = module.get(PatientsService);
    doctorsService = module.get(DoctorsService);
    profileService = module.get(ProfileService);
  });

  describe('calls createAppointment', () => {
    it('returns the data', async () => {
      expect.assertions(2);

      appointmentsRepository.createAppointment.mockResolvedValue(
        mockAppointment,
      );
      patientsService.getPatientByUserId.mockResolvedValue(mockPatient);
      doctorsService.getDoctorById.mockResolvedValue(mockDoctor);

      mockCreateAppointmentDto.visitDate = new Date('2000-01-01T16:00:00.000Z');

      expect(
        await appointmentsService.createAppointment(
          mockGetUserDto,
          mockCreateAppointmentDto,
        ),
      ).toEqual(mockAppointment);
      expect(appointmentsRepository.createAppointment).toHaveBeenCalledWith(
        mockPatient,
        mockDoctor,
        mockCreateAppointmentDto,
      );
    });

    it('handles an error if timeslot is not within working hours', async () => {
      expect.assertions(1);

      mockCreateAppointmentDto.visitDate = new Date('2000-01-01T22:00:00.000Z');

      expect(
        appointmentsService.createAppointment(
          mockGetUserDto,
          mockCreateAppointmentDto,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('handles an error if timeslot is not free', async () => {
      expect.assertions(1);

      appointmentsRepository.getAppointmentByDoctorIdAndVisitDate.mockResolvedValue(
        mockAppointment,
      );

      mockAppointment.visitDate = new Date('2000-01-01T14:00:00.000Z');

      mockCreateAppointmentDto.visitDate = new Date('2000-01-01T14:00:00.000Z');

      expect(
        appointmentsService.createAppointment(
          mockGetUserDto,
          mockCreateAppointmentDto,
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('calls getMyAppointments', () => {
    it('returns the [data]', async () => {
      expect.assertions(2);

      appointmentsRepository.getMyAppointments.mockResolvedValue([
        mockGetMyAppointmentsResponseDto,
      ]);
      profileService.getBatchProfiles.mockResolvedValue([{}]);

      expect(
        await appointmentsService.getMyAppointments(mockGetUserDto),
      ).toEqual([mockGetMyAppointmentsResponseDto]);
      expect(profileService.getBatchProfiles).toHaveBeenCalledTimes(1);
    });
  });

  describe('calls getAppointmentById', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      appointmentsRepository.getAppointmentById.mockResolvedValue(
        mockAppointment,
      );

      expect(await appointmentsService.getAppointmentById(1)).toEqual(
        mockAppointment,
      );
    });

    it('throws an error if not found', async () => {
      expect.assertions(1);

      appointmentsRepository.getAppointmentById.mockResolvedValue(undefined);

      await expect(appointmentsService.getAppointmentById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('calls getAppointmentByDoctorIdAndVisitDate', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      appointmentsRepository.getAppointmentByDoctorIdAndVisitDate.mockResolvedValue(
        mockAppointment,
      );

      expect(
        await appointmentsService.getAppointmentByDoctorIdAndVisitDate(
          1,
          new Date(),
        ),
      ).toEqual(mockAppointment);
    });

    it('throws an error if not found', async () => {
      expect.assertions(1);

      appointmentsRepository.getAppointmentByDoctorIdAndVisitDate.mockResolvedValue(
        undefined,
      );

      await expect(
        appointmentsService.getAppointmentByDoctorIdAndVisitDate(1, new Date()),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
