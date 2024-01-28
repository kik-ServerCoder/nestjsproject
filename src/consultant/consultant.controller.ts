import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, ParseIntPipe, Post, Put, Req, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { conappointmentEntity, conprofileEntity } from './consultant.entity';
import { ConsultantprofileService, appointmentdataservice,  } from './consultant.service';
import { HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ConsultantLoginDTO, consultantdto } from './consultant.dto';

@Controller('/consultant')
export class ConsultantController{
  constructor(private readonly conservice : ConsultantprofileService) {}
 

  @Get('/welcome')
  getHello(): string {
    return this.conservice.getHello();
  }


  
  

  @Get('/getallconsultant')
  getAllconsultant(): Promise<conprofileEntity[]> {
        return this.conservice.getAllconsultant();
  }
 





@Get('/getconsultantbyID/:id')
async getAdminById(@Param('id', ParseIntPipe) id: number): Promise<conprofileEntity> {
    const res = await this.conservice.getconsultantById(id);
    if (res !== null) {
        return await this.conservice.getconsultantById(id);
    }
    else {
        throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
}

@Get('/getScheduleByConsultant/:consultantId')
    async getScheduleByConsultant(@Param('consultantId') consultantId: number): Promise<conprofileEntity[]> {
      return this.conservice.getschedulebyconsultant(consultantId);}

@Post('/createconsultant')
@UsePipes(new ValidationPipe())
async createconsultant(@Body() data: conprofileEntity) {
  await this.conservice.createconsultant(data);
  return {
  message: 'Consultant creation succeed',
};
}


@Put('/updateconsultant/:id')
@UsePipes(new ValidationPipe())
async updateConsultant(@Param('id') id: number, @Body() updateData: conprofileEntity) {
  const updatedConsultant = await this.conservice.updateconsultant(id, updateData);

  if (!updatedConsultant) {
    throw new NotFoundException(`Consultant with ID ${id} not found`);
  }

  return {
    message: 'Consultant profile updated successfully',
  };
}

@Delete('/deleteconsultant/:id')
async deleteconsultant(@Param('id') id: number) {
  try {
    await this.conservice.deleteconsultant(id);
    return {
      message: 'Consultant deleted successfully',
    };
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(`Consultant with ID ${id} not found`);
    }
    throw error;
  }
  
}
@Post('/resourcesharing')
@UseInterceptors(FileInterceptor('file',
{ fileFilter: (req, file, cb) => {
if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
cb(null, true);
else {
cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
}
},
limits: { fileSize: 3000000 },
storage:diskStorage({
destination: './uploads',
filename: function (req, file, cb) {
cb(null,Date.now()+file.originalname)
},
})
}))
uploadFile(@UploadedFile() file: Express.Multer.File) {
console.log(file);
}

@Get('/getresource/:name')
getImages(@Param('name') name, @Res() res) {
res.sendFile(name,{ root: './uploads' })
}




@Post('/signup')
@UseInterceptors(FileInterceptor('image',
    {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 30000 },
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
    }
))
@UsePipes(new ValidationPipe)
signup(@Body() mydata: consultantdto, @UploadedFile() imageobj: Express.Multer.File) {
    console.log(mydata);
    console.log(imageobj.filename);
    mydata.filenames = imageobj.filename;
    return this.conservice.signup(mydata);

}
@Post('/consultantsignin')
    signIn(@Body() mydata: ConsultantLoginDTO, @Session() session) {
        const result = this.conservice.signIn(mydata);
        if (result) {
            session.email = mydata.email;
            console.log(session.email);
        }

        return result;
    }
    @Post('/signout')
    signout( @Req() req) {
        if (req.session.destroy()) {
            return true;
        }
        else {
            throw new UnauthorizedException("invalid actions");
        }
    }

    








}

@Controller('/appointment')
  export class appointmentcontroller{
    constructor(private readonly appointmentservice : appointmentdataservice){}
    
    @Post('/scheduleconsultant')
    @UsePipes(new ValidationPipe())
    async createschedule(@Body() data: conappointmentEntity) {
      await this.appointmentservice.createschedule(data);
      return {
       message: 'Consultant creation succeeded',
     };
  }
  @Get('/getallschedule')
  getAllschedule(): Promise<conappointmentEntity[]> {
      return this.appointmentservice.getAllschedule()

  }
  @Put('/updateschedule/:id')
  @UsePipes(new ValidationPipe())
  async updateSchedule(@Param('id') id: number, @Body() updateData: conappointmentEntity) {
  const updatedschedule = await this.appointmentservice.updateschedule(id, updateData);

  if (!updatedschedule) {
    throw new NotFoundException(`Consultant with ID ${id} not found`);
  }

  return {
    message: 'schedule updated successfully',
  };
}
@Delete('/deleteschedule/:id')
async deleteconsultant(@Param('id') id: number) {
  try {
    await this.appointmentservice.deleteschedule(id);
    return {
      message: 'appointment deleted successfully',
    };
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(`Consultant with ID ${id} not found`);
    }
    throw error;
  }
  
}




}

