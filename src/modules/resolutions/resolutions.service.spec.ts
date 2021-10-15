import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { PatientsService } from '../patients/patients.service';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsService } from './resolutions.service';
import { DoctorsService } from '../doctors/doctors.service';
import { GetUserDto } from '../auth/dto/get-user.dto';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Resolution } from './entities/resolution.entity';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';

const mockResolutionsRepository = () => ({
  createResolution: jest.fn(),
  getResolutions: jest.fn(),
  getMyResolutions: jest.fn(),
  getResolutionById: jest.fn(),
  deleteResolutionById: jest.fn(),
});

const mockPatientsService = () => ({
  getPatientById: jest.fn(),
});

const mockDoctorsService = () => ({
  getDoctorById: jest.fn(),
});

const mockPatient = new Patient();
const mockDoctor = new Doctor();
const mockResolution = new Resolution();

const mockCreateResolutionDto = new CreateResolutionDto();
const mockGetUserDto = new GetUserDto();

describe('ResolutionsService', () => {
  let resolutionsService: ResolutionsService;
  let patientsService: any;
  let doctorsService: any;
  let resolutionsRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ResolutionsService,
        {
          provide: ResolutionsRepository,
          useFactory: mockResolutionsRepository,
        },
        {
          provide: PatientsService,
          useFactory: mockPatientsService,
        },
        {
          provide: DoctorsService,
          useFactory: mockDoctorsService,
        },
      ],
    }).compile();

    resolutionsService = module.get(ResolutionsService);
    patientsService = module.get(PatientsService);
    doctorsService = module.get(DoctorsService);
    resolutionsRepository = module.get(ResolutionsRepository);
  });

  describe('calls createResolution', () => {
    it('and returns the data', async () => {
      expect.assertions(4);

      resolutionsRepository.createResolution.mockResolvedValue(mockResolution);
      patientsService.getPatientById.mockResolvedValue(mockPatient);
      doctorsService.getDoctorById.mockResolvedValue(mockDoctor);

      const result = await resolutionsService.createResolution(
        mockCreateResolutionDto,
        mockGetUserDto,
      );

      expect(patientsService.getPatientById).toBeCalledWith(
        mockCreateResolutionDto.patientId,
      );
      expect(doctorsService.getDoctorById).toBeCalledWith(
        mockGetUserDto.doctorId,
      );
      expect(resolutionsRepository.createResolution).toBeCalledWith(
        mockCreateResolutionDto,
        mockPatient,
        mockDoctor,
      );

      expect(result).toEqual(mockResolution);
    });
  });

  describe('calls getResolutions', () => {
    it('and returns the [data] without filters', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutions.mockResolvedValue([mockResolution]);

      const result = await resolutionsService.getResolutions(null);

      expect(result).toEqual([mockResolution]);
    });
    it('and returns the [data] with filters', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutions.mockResolvedValue([mockResolution]);

      const result = await resolutionsService.getResolutions(
        new GetResolutionsFilterDto(),
      );

      expect(result).toEqual([mockResolution]);
    });
  });

  describe('calls getMyResolutions', () => {
    it('and returns the [data]', async () => {
      expect.assertions(1);

      resolutionsRepository.getMyResolutions.mockResolvedValue([
        mockResolution,
      ]);

      const result = await resolutionsService.getMyResolutions(mockGetUserDto);

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
