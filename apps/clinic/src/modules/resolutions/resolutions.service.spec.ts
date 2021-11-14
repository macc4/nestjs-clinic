import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { PatientsService } from '../patients/patients.service';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsService } from './resolutions.service';
import { DoctorsService } from '../doctors/doctors.service';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Resolution } from './entities/resolution.entity';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';
import { GetUserDto } from '@macc4-clinic/common';
import { Appointment } from '../appointments/entities/appointment.entity';
import { AppointmentsService } from '../appointments/appointments.service';
import { PatchResolutionDto } from './dto/patch-resolution.dto';

const mockPatient = new Patient();
const mockDoctor = new Doctor();
const mockResolution = new Resolution();
const mockAppointment = new Appointment();

const mockCreateResolutionDto = new CreateResolutionDto();
const mockPatchResolutionDto = new PatchResolutionDto();
const mockGetUserDto = new GetUserDto();

describe('ResolutionsService', () => {
  let resolutionsService: ResolutionsService;
  let patientsService: any;
  let doctorsService: any;
  let resolutionsRepository: any;
  let appointmentsService: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ResolutionsService,
        {
          provide: ResolutionsRepository,
          useValue: {
            createResolution: jest.fn(),
            getResolutions: jest.fn(),
            getMyResolutions: jest.fn(),
            getResolutionById: jest.fn(),
            patchResolutionById: jest.fn(),
            deleteResolutionById: jest.fn(),
          },
        },
        {
          provide: PatientsService,
          useValue: { getPatientById: jest.fn() },
        },
        {
          provide: DoctorsService,
          useValue: { getDoctorById: jest.fn(), getDoctorByUserId: jest.fn() },
        },
        {
          provide: AppointmentsService,
          useValue: { getAppointmentById: jest.fn() },
        },
      ],
    }).compile();

    resolutionsService = module.get(ResolutionsService);
    patientsService = module.get(PatientsService);
    doctorsService = module.get(DoctorsService);
    resolutionsRepository = module.get(ResolutionsRepository);
    appointmentsService = module.get(AppointmentsService);
  });

  describe('calls createResolution', () => {
    it('returns the data', async () => {
      expect.assertions(5);

      resolutionsRepository.createResolution.mockResolvedValue(mockResolution);
      patientsService.getPatientById.mockResolvedValue(mockPatient);
      doctorsService.getDoctorByUserId.mockResolvedValue(mockDoctor);
      appointmentsService.getAppointmentById.mockResolvedValue(mockAppointment);

      expect(
        await resolutionsService.createResolution(
          mockGetUserDto,
          mockCreateResolutionDto,
        ),
      ).toEqual(mockResolution);
      expect(patientsService.getPatientById).toBeCalledWith(
        mockCreateResolutionDto.patientId,
      );
      expect(doctorsService.getDoctorByUserId).toBeCalledWith(
        mockGetUserDto.id,
      );
      expect(resolutionsRepository.createResolution).toBeCalledWith(
        mockCreateResolutionDto,
        mockPatient,
        mockDoctor,
        mockAppointment,
      );
      expect(appointmentsService.getAppointmentById).toBeCalledWith(
        mockCreateResolutionDto.appointmentId,
      );
    });
  });

  describe('calls getResolutions', () => {
    it('returns the [data] without filters', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutions.mockResolvedValue([mockResolution]);

      expect(await resolutionsService.getResolutions(null)).toEqual([
        mockResolution,
      ]);
    });
    it('returns the [data] with filters', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutions.mockResolvedValue([mockResolution]);

      expect(
        await resolutionsService.getResolutions(new GetResolutionsFilterDto()),
      ).toEqual([mockResolution]);
    });
  });

  describe('calls getMyResolutions', () => {
    it('returns the [data]', async () => {
      expect.assertions(1);

      resolutionsRepository.getMyResolutions.mockResolvedValue([
        mockResolution,
      ]);

      expect(await resolutionsService.getMyResolutions(mockGetUserDto)).toEqual(
        [mockResolution],
      );
    });
  });

  describe('calls getResolutionById', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutionById.mockResolvedValue(mockResolution);

      expect(await resolutionsService.getResolutionById(1)).toEqual(
        mockResolution,
      );
    });

    it('handles an error if no data found', async () => {
      expect.assertions(1);

      resolutionsRepository.getResolutionById.mockResolvedValue(null);

      await expect(resolutionsService.getResolutionById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('calls patchResolutionById', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      resolutionsRepository.patchResolutionById.mockResolvedValue(
        mockResolution,
      );

      expect(
        await resolutionsService.patchResolutionById(1, mockPatchResolutionDto),
      ).toEqual(mockResolution);
    });

    it('handles an error if no data found', async () => {
      expect.assertions(1);

      resolutionsRepository.patchResolutionById.mockResolvedValue(undefined);

      await expect(
        resolutionsService.patchResolutionById(1, mockPatchResolutionDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('calls deleteResolutionById', () => {
    it('returns nothing', async () => {
      expect.assertions(1);

      resolutionsRepository.deleteResolutionById.mockResolvedValue(
        mockResolution,
      );

      expect(await resolutionsService.deleteResolutionById(1)).toEqual(
        undefined,
      );
    });

    it('handles an error if no data found', async () => {
      expect.assertions(1);

      resolutionsRepository.deleteResolutionById.mockResolvedValue(null);

      await expect(resolutionsService.deleteResolutionById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
