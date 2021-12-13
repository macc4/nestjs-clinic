import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from '../doctors/doctors.service';
import { QueueService } from './queue.service';
import {
  DEFAULT_REDIS_NAMESPACE,
  getRedisToken,
} from '@liaoliaots/nestjs-redis';
import { EmptyQueueException } from './errors/EmptyQueueException.error';
import { GetUserDto } from '@macc4-clinic/common';
import { PatientsService } from '../patients/patients.service';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Patient } from '../patients/entities/patient.entity';

const mockGetUserDto = new GetUserDto();
const mockPatient = new Patient();
const mockDoctor = new Doctor();

describe('QueueService', () => {
  let queueService: QueueService;
  let doctorsService: any;
  let patientsService: any;

  const rpush = jest.fn();
  const lindex = jest.fn();
  const lpop = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        {
          provide: DoctorsService,
          useValue: { getDoctorByUserId: jest.fn(), getDoctorById: jest.fn() },
        },
        {
          provide: PatientsService,
          useValue: {
            getPatientByUserId: jest.fn(),
            getPatientById: jest.fn(),
          },
        },
        {
          provide: getRedisToken(DEFAULT_REDIS_NAMESPACE),
          useValue: { rpush, lindex, lpop },
        },
      ],
    }).compile();

    queueService = module.get(QueueService);
    doctorsService = module.get(DoctorsService);
    patientsService = module.get(PatientsService);
  });

  describe('calls enqueueAsPatient', () => {
    it('returns your number in the queue', async () => {
      expect.assertions(3);

      const doctorId = 1;
      const numberInQueue = '1';

      rpush.mockResolvedValue(numberInQueue);

      patientsService.getPatientByUserId.mockResolvedValue(mockPatient);

      expect(
        await queueService.enqueueAsPatient(doctorId, mockGetUserDto),
      ).toEqual({
        message: `You are ${numberInQueue} in the queue`,
      });
      expect(patientsService.getPatientByUserId).toBeCalledWith(
        mockGetUserDto.id,
      );
      expect(doctorsService.getDoctorById).toHaveBeenCalledTimes(1);
    });
  });

  describe('calls peekAsPatient', () => {
    it('returns the patientId of the current patient in the queue', async () => {
      expect.assertions(2);

      const doctorId = 1;
      const currentPatientId = '1';
      lindex.mockResolvedValue(currentPatientId);

      expect(await queueService.peekAsPatient(doctorId)).toEqual(
        currentPatientId,
      );
      expect(doctorsService.getDoctorById).toHaveBeenCalledTimes(1);
    });

    it('and throws an error if the queue is empty', async () => {
      expect.assertions(1);

      const doctorId = 1;
      lindex.mockResolvedValue(null);

      expect(queueService.peekAsPatient(doctorId)).rejects.toThrow(
        EmptyQueueException,
      );
    });
  });

  describe('calls peekAsDoctor', () => {
    it('returns the patientId of the current patient in the queue', async () => {
      expect.assertions(2);

      const currentPatientId = '1';

      doctorsService.getDoctorByUserId.mockResolvedValue(mockDoctor);

      lindex.mockResolvedValue(currentPatientId);

      expect(await queueService.peekAsDoctor(mockGetUserDto)).toEqual(
        currentPatientId,
      );
      expect(doctorsService.getDoctorByUserId).toBeCalledWith(
        mockGetUserDto.id,
      );
    });

    it('and throws an error if the queue is empty', async () => {
      expect.assertions(2);

      lindex.mockResolvedValue(null);

      doctorsService.getDoctorByUserId.mockResolvedValue(mockDoctor);

      await expect(queueService.peekAsDoctor(mockGetUserDto)).rejects.toThrow(
        EmptyQueueException,
      );
      expect(doctorsService.getDoctorByUserId).toBeCalledWith(
        mockGetUserDto.id,
      );
    });
  });

  describe('calls dequeueAsDoctor', () => {
    it('returns nothing if patient was dequeued', async () => {
      expect.assertions(2);

      lpop.mockResolvedValue('1');

      doctorsService.getDoctorByUserId.mockResolvedValue(mockDoctor);

      expect(await queueService.dequeueAsDoctor(mockGetUserDto)).toEqual(
        undefined,
      );
      expect(doctorsService.getDoctorByUserId).toBeCalledWith(
        mockGetUserDto.id,
      );
    });

    it('and throws an error if the queue is empty', async () => {
      expect.assertions(2);

      lpop.mockResolvedValue(null);

      doctorsService.getDoctorByUserId.mockResolvedValue(mockDoctor);

      await expect(
        queueService.dequeueAsDoctor(mockGetUserDto),
      ).rejects.toThrow(EmptyQueueException);
      expect(doctorsService.getDoctorByUserId).toBeCalledWith(
        mockGetUserDto.id,
      );
    });
  });
});
