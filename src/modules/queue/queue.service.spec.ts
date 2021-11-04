import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from '../doctors/doctors.service';
import { QueueService } from './queue.service';
import {
  DEFAULT_REDIS_NAMESPACE,
  getRedisToken,
} from '@liaoliaots/nestjs-redis';
import { GetUserDto } from '../auth/dto/get-user.dto';
import { EmptyQueueException } from './errors/EmptyQueueException.error';

const mockGetUserDto = new GetUserDto();

describe('QueueService', () => {
  let queueService: QueueService;
  let doctorsService: any;

  const rpush = jest.fn();
  const lindex = jest.fn();
  const lpop = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        {
          provide: DoctorsService,
          useValue: { getDoctorById: jest.fn() },
        },
        {
          provide: getRedisToken(DEFAULT_REDIS_NAMESPACE),
          useValue: { rpush, lindex, lpop },
        },
      ],
    }).compile();

    queueService = module.get(QueueService);
    doctorsService = module.get(DoctorsService);
  });

  describe('calls enqueueAsPatient', () => {
    it('and returns your number in the queue', async () => {
      expect.assertions(2);

      const doctorId = 1;
      const numberInQueue = '1';

      rpush.mockResolvedValue(numberInQueue);

      const result = await queueService.enqueueAsPatient(
        doctorId,
        mockGetUserDto,
      );

      expect(doctorsService.getDoctorById).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        message: `You are ${numberInQueue} in the queue`,
      });
    });
  });

  describe('calls peekAsPatient', () => {
    it('and returns the patientId of the current patient in the queue', async () => {
      expect.assertions(2);

      const doctorId = 1;
      const currentPatientId = '1';
      lindex.mockResolvedValue(currentPatientId);

      const result = await queueService.peekAsPatient(doctorId);

      expect(doctorsService.getDoctorById).toHaveBeenCalledTimes(1);
      expect(result).toEqual(currentPatientId);
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
    it('and returns the patientId of the current patient in the queue', async () => {
      expect.assertions(1);

      const currentPatientId = '1';

      lindex.mockResolvedValue(currentPatientId);

      const result = await queueService.peekAsDoctor(mockGetUserDto);

      expect(result).toEqual(currentPatientId);
    });

    it('and throws an error if the queue is empty', async () => {
      expect.assertions(1);

      lindex.mockResolvedValue(null);

      expect(queueService.peekAsDoctor(mockGetUserDto)).rejects.toThrow(
        EmptyQueueException,
      );
    });
  });

  describe('calls dequeueAsDoctor', () => {
    it('and returns nothing if patient was dequeued', async () => {
      expect.assertions(1);

      lpop.mockResolvedValue('1');

      const result = await queueService.dequeueAsDoctor(mockGetUserDto);

      expect(result).toEqual(undefined);
    });

    it('and throws an error if the queue is empty', async () => {
      expect.assertions(1);

      lpop.mockResolvedValue(null);

      expect(queueService.dequeueAsDoctor(mockGetUserDto)).rejects.toThrow(
        EmptyQueueException,
      );
    });
  });
});
