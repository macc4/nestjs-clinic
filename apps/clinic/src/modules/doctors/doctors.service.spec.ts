import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DoctorsService } from './doctors.service';
import { DoctorsRepository } from './doctors.repository';
import { SpecializationsService } from './specializations.service';

const mockDoctorsRepository = () => ({
  getDoctorById: jest.fn(),
  getDoctorByUserId: jest.fn(),
});

const mockDoctor = {
  id: 1,
  user_id: 'abd9a3f6-acd5-450a-9961-3ffba92f20e6',
};

describe('DoctorsService', () => {
  let doctorsService: DoctorsService;
  let doctorsRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: DoctorsRepository,
          useFactory: mockDoctorsRepository,
        },
        {
          provide: SpecializationsService,
          useValue: { getSpecializationByTitle: jest.fn() },
        },
      ],
    }).compile();

    doctorsService = module.get(DoctorsService);
    doctorsRepository = module.get(DoctorsRepository);
  });

  describe('calls getDoctorById', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      doctorsRepository.getDoctorById.mockResolvedValue(mockDoctor);

      const result = await doctorsService.getDoctorById(1);

      expect(result).toEqual(mockDoctor);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      doctorsRepository.getDoctorById.mockResolvedValue(null);

      expect(doctorsService.getDoctorById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('calls getDoctorByUserId', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      doctorsRepository.getDoctorByUserId.mockResolvedValue(mockDoctor);

      const result = await doctorsService.getDoctorByUserId(
        '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
      );

      expect(result).toEqual(mockDoctor);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      doctorsRepository.getDoctorByUserId.mockResolvedValue(null);

      expect(
        doctorsService.getDoctorByUserId(
          '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
