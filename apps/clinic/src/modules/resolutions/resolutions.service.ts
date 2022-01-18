import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientsService } from '../patients/patients.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';
import { Resolution } from './entities/resolution.entity';
import { ResolutionsRepository } from './resolutions.repository';
import { DoctorsService } from '../doctors/doctors.service';
import { GetUserDto } from '@macc4-clinic/common';
import { PatchResolutionDto } from './dto/patch-resolution.dto';
import { AppointmentsService } from '../appointments/appointments.service';
import { NotificationsService } from '../kafka/kafka-notifications.service';
import { ProfileService } from '../grpc/grpc-profile.service';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(ResolutionsRepository)
    private readonly resolutionsRepository: ResolutionsRepository,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService,
    private readonly appointmentsService: AppointmentsService,
    private readonly profileService: ProfileService,
    private readonly notificationsService: NotificationsService,
  ) {}

  //
  // Create a new resolution
  //

  async createResolution(
    user: GetUserDto,
    createResolutionDto: CreateResolutionDto,
  ): Promise<Resolution> {
    const appointment = await this.appointmentsService.getAppointmentById(
      createResolutionDto.appointmentId,
    );

    const doctor = await this.doctorsService.getDoctorByUserId(user.id);

    if (appointment.doctor.id !== doctor.id) {
      throw new UnauthorizedException(
        'You cannot create resolutions for this appointment.',
      );
    }

    const patient = await this.patientsService.getPatientById(
      createResolutionDto.patientId,
    );

    if (appointment.patient.id !== patient.id) {
      throw new BadRequestException(
        'Specified appointment was created for another patient.',
      );
    }

    let resolution: Resolution;

    try {
      resolution = await this.resolutionsRepository.createResolution(
        createResolutionDto,
        patient,
        doctor,
        appointment,
      );
    } catch (error) {
      if (!(error instanceof QueryFailedError)) {
        console.log(error);

        throw new InternalServerErrorException();
      }

      const { code } = error.driverError;

      // postgres duplicate constraint error code
      if (code === '23505') {
        throw new ConflictException(
          'Resolution for this appointment already exists.',
        );
      }
    }

    const doctorProfile = await this.profileService.getProfileByUserId(
      doctor.userId,
    );

    this.notificationsService.sendResolutionCreatedNotification({
      recepientUserId: patient.userId,
      resolutionId: appointment.id,
      doctorUserId: doctorProfile.userId,
      doctorAvatarUrl: doctorProfile.avatarUrl,
    });

    return resolution;
  }

  //
  // Get all resolutions with an optional query
  //

  async getResolutions(
    filterDto: GetResolutionsFilterDto,
  ): Promise<Resolution[]> {
    return this.resolutionsRepository.getResolutions(filterDto);
  }

  //
  // Get personal resolutions
  //

  async getMyResolutions(user: GetUserDto): Promise<Resolution[]> {
    const resolution = await this.resolutionsRepository.getMyResolutions(
      user.id,
    );

    return resolution;
  }

  //
  // Get resolution by id
  //

  async getResolutionById(id: number): Promise<Resolution> {
    const resolution = await this.resolutionsRepository.getResolutionById(id);

    if (!resolution) {
      throw new NotFoundException(`No resolution found with ID: ${id}`);
    }

    return resolution;
  }

  //
  // Patch resolution by id
  //

  async patchResolutionById(
    id: number,
    patchResolutionDto: PatchResolutionDto,
  ): Promise<Resolution> {
    const resolution = await this.resolutionsRepository.patchResolutionById(
      id,
      patchResolutionDto,
    );

    if (!resolution) {
      throw new NotFoundException(`No resolution found with ID: ${id}`);
    }

    return resolution;
  }

  //
  // Delete resolution by id
  //

  async deleteResolutionById(id: number): Promise<void> {
    const resolution = await this.resolutionsRepository.deleteResolutionById(
      id,
    );

    if (!resolution) {
      throw new NotFoundException(`No resolution found with ID: ${id}`);
    }
  }
}
