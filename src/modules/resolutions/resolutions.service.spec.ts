import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsService } from './resolutions.service';

const mockResolutionsRepository = () => ({
  createResolution: jest.fn(),
  getResolutions: jest.fn(),
  getResolutionById: jest.fn(),
  deleteResolutionById: jest.fn(),
});

describe('ResolutionsService', () => {
  let resolutionsService: ResolutionsService;
  let resolutionsRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ResolutionsService,
        {
          provide: ResolutionsRepository,
          useFactory: mockResolutionsRepository,
        },
      ],
    }).compile();

    resolutionsService = module.get(ResolutionsService);
    resolutionsRepository = module.get(ResolutionsRepository);
  });

  describe('calls createResolution', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      resolutionsRepository.createResolution.mockResolvedValue('data');

      const result = await resolutionsService.createResolution(null);

      expect(result).toEqual('data');
    });
  });

  describe('calls getResolutions', () => {
    it('and returns the [data]', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutions.mockResolvedValue(['data']);

      const result = await resolutionsService.getResolutions(null);

      expect(result).toEqual(['data']);
    });
  });

  describe('calls getResolutionById', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutionById.mockResolvedValue('data');

      const result = await resolutionsService.getResolutionById(1);

      expect(result).toEqual('data');
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

      resolutionsRepository.deleteResolutionById.mockResolvedValue('data');

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
