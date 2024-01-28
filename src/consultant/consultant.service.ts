import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { conappointmentEntity, conprofileEntity } from './consultant.entity';
import { Repository } from 'typeorm';
import { consultantdto } from './consultant.dto';
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class ConsultantprofileService {
  mailobject: any;
  

  constructor(
    @InjectRepository(conprofileEntity)
    private readonly conprofile: Repository<conprofileEntity>,
    private mailerService: MailerService,
    @InjectRepository(conappointmentEntity)
    private readonly appointmentservice: Repository<conappointmentEntity>,
  ) {}
  
  
  
  async sendEmail() {

    return await this.mailobject.sendMail({
        to: 'kakon190299@gmail.com',
        subject: 'checking',
        text: 'check check',
    });

}


async getschedulebyconsultant(consultantId : number): Promise<conprofileEntity[]> {
  return this.conprofile.find({
      where: { id: consultantId },
      relations: {
        appointments: true,
      },
  });

}

  


getHello(): string {
  return 'Welcome to consultant dashboard';
}


async createconsultant(consultant: conprofileEntity): Promise<conprofileEntity> {
  return this.conprofile.save(consultant);
  }


async getAllconsultant(): Promise<conprofileEntity[]> {
return this.conprofile.find();
}


async getconsultantById(id: number): Promise<conprofileEntity> {
return this.conprofile.findOneBy({id:id});
}


async updateconsultant(id: number, updateconsultant: conprofileEntity): Promise<conprofileEntity> {
await this.conprofile.update(id, updateconsultant);
return this.conprofile.findOneBy({id:id}); }



async deleteconsultant(id: number): Promise<void> {
await this.conprofile.delete(id);
}

async signup(data: consultantdto): Promise<conprofileEntity> {
  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password, salt);
  return this.conprofile.save(data);
}

async signIn(data: conprofileEntity): Promise<boolean> {
  console.log("data" + { data });
  const userdata: conprofileEntity = await this.conprofile.findOneBy({ email: data.email });
  console.log(userdata);
  if (userdata != null) {
      const match: boolean = await bcrypt.compare(data.password, userdata.password);
      return match;
  }
  else {
      return false;
  }
}
}















@Injectable()
export class appointmentdataservice{
  getAllschedulewithconsultant: any;
  constructor(@InjectRepository(conappointmentEntity) private appointmentservice : Repository<conappointmentEntity>) {}

  async createschedule(schedule: conappointmentEntity): Promise<conappointmentEntity> {
    return this.appointmentservice.save(schedule);
    }
    async getAllschedule(): Promise<conappointmentEntity[]> {
      return this.appointmentservice.find();
      }


      async updateschedule(id: number, updateschedule: conappointmentEntity): Promise<conappointmentEntity> {
        await this.appointmentservice.update(id, updateschedule);
        return this.appointmentservice.findOneBy({id:id}); }


        async deleteschedule(idnumber: number): Promise<void> {
          await this.appointmentservice.delete(idnumber);
          }
}


