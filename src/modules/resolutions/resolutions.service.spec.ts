import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { PatientsService } from '../patients/patients.service';
import { PatientsRepository } from '../patients/patients.repository';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsService } from './resolutions.service';
import { User } from '../users/user.entity';

const mockResolutionsRepository = () => ({
  createResolution: jest.fn(),
  getResolutions: jest.fn(),
  getMyResolutions: jest.fn(),
  getResolutionById: jest.fn(),
  deleteResolutionById: jest.fn(),
});

const mockPatientsRepository = () => ({
  getPatientById: jest.fn(),
});

const mockPatient = {
  id: 1,
  name: 'name',
  gender: 'male',
};

const mockResolution = {
  id: 1,
  doctor_id: 1,
  text: 'text',
  expiry: '2021-10-08T09:47:16.000Z',
  patientId: 1,
};

describe('ResolutionsService', () => {
  let resolutionsService: ResolutionsService;
  let resolutionsRepository: any;
  let patientsRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ResolutionsService,
        {
          provide: ResolutionsRepository,
          useFactory: mockResolutionsRepository,
        },
        PatientsService,
        {
          provide: PatientsRepository,
          useFactory: mockPatientsRepository,
        },
      ],
    }).compile();

    resolutionsService = module.get(ResolutionsService);
    resolutionsRepository = module.get(ResolutionsRepository);
    patientsRepository = module.get(PatientsRepository);
  });

  describe('calls createResolution', () => {
    it('and returns the data', async () => {
      expect.assertions(3);

      const createResolutionDto = new CreateResolutionDto();

      resolutionsRepository.createResolution.mockResolvedValue(mockResolution);
      patientsRepository.getPatientById.mockResolvedValue(mockPatient);

      const result = await resolutionsService.createResolution(
        createResolutionDto,
      );

      expect(patientsRepository.getPatientById).toBeCalledWith(
        createResolutionDto.patientId,
      );
      expect(resolutionsRepository.createResolution).toBeCalledWith(
        createResolutionDto,
        mockPatient,
      );
      expect(result).toEqual(mockResolution);
    });
  });

  describe('calls getResolutions', () => {
    it('and returns the [data]', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutions.mockResolvedValue([mockResolution]);

      const result = await resolutionsService.getResolutions(null);

      expect(result).toEqual([mockResolution]);
    });
  });

  describe('calls getMyResolutions', () => {
    it('and returns the [data]', async () => {
      expect.assertions(1);

      resolutionsRepository.getMyResolutions.mockResolvedValue([
        mockResolution,
      ]);

      const result = await resolutionsService.getMyResolutions(new User());

      expect(result).toEqual([mockResolution]);
    });
  });

  describe('calls getResolutionById', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutionById.mockResolvedValue(mockResolution);

      const result = await resolutionsService.getResolutionById(1);

      expect(result).toEqual(mockResolution);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutionById.mockResolvedValue(null);

      expect(resolutionsService.getResolutionById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('calls deleteResolutionById', () => {
    it('and returns nothing', async () => {
      expect.assertions(1);

      resolutionsRepository.deleteResolutionById.mockResolvedValue(
        mockResolution,
      );

      const result = await resolutionsService.deleteResolutionById(1);

      expect(result).toEqual(undefined);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      resolutionsRepository.deleteResolutionById.mockResolvedValue(null);

      expect(resolutionsService.deleteResolutionById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
