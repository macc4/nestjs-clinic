import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PatientsService } from '../patients/patients.service';
import { PatientsRepository } from '../patients/patients.repository';
import { User } from '../users/user.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

const mockPatientsRepository = () => ({
  createPatient: jest.fn(),
  getPatientById: jest.fn(),
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
        new User(),
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
});
