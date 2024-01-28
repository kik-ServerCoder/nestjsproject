import { Module } from '@nestjs/common';

import { ConsultantController, appointmentcontroller } from './consultant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { conappointmentEntity, conprofileEntity } from './consultant.entity';
import { ConsultantprofileService } from './consultant.service';
import { appointmentdataservice } from './consultant.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({

  imports: [TypeOrmModule.forFeature([conprofileEntity,conappointmentEntity]),
  
    MailerModule.forRoot({
        transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: true,
            auth: {
                user: 'kakon190299@gmail.com',
                pass: 'abcdef123'
            },
        }
    })

    ],
  controllers: [ConsultantController,appointmentcontroller],
  providers: [ConsultantprofileService,appointmentdataservice],
})
export class ConsultantModule {}
