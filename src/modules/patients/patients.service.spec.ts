import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { PatientsRepository } from './patients.repository';
import { CreatePatientDto } from './dto/create-patient.dto';

const mockPatientsRepository = () => ({
  createPatient: jest.fn(),
  getPatientById: jest.fn(),
  getPatientByUserId: jest.fn(),
});

const mockPatient = {
  id: 1,
  name: 'name',
  gender: 'male',
};

describe('PatientsService', () => {
  let patientsService: PatientsService;
  let patientsRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: PatientsRepository,
          useFactory: mockPatientsRepository,
        },
      ],
    }).compile();

    patientsService = module.get(PatientsService);
    patientsRepository = module.get(PatientsRepository);
  });

  describe('calls createPatient', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      patientsRepository.createPatient.mockResolvedValue(mockPatient);

      const result = await patientsService.createPatient(
        new CreatePatientDto(),
      );

      expect(result).toEqual(mockPatient);
    });
  });

  describe('calls getPatientById', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      patientsRepository.getPatientById.mockResolvedValue(mockPatient);

      const result = await patientsService.getPatientById(1);

      expect(result).toEqual(mockPatient);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      patientsRepository.getPatientById.mockResolvedValue(null);

      expect(patientsService.getPatientById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('calls getPatientByUserId', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      patientsRepository.getPatientByUserId.mockResolvedValue(mockPatient);

      const result = await patientsService.getPatientByUserId(
        '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
      );

      expect(result).toEqual(mockPatient);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      patientsRepository.getPatientByUserId.mockResolvedValue(null);

      expect(
        patientsService.getPatientByUserId(
          '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
