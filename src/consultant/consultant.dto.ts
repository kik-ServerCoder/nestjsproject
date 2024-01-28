import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { Column } from 'typeorm';
import { conappointmentEntity } from './consultant.entity';

export class consultantdto {
    @IsString({ message: "invalid name" })
    @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
    name: string;

    @IsEmail({}, { message: "invalid email" })
    email: string;
    password: string;
    phone: number;
    filenames: string;

}
export class ConsultantLoginDTO {
    id: number;
    @IsString()
    @Column({ name: 'fullname', type: "varchar", length: 150 })
    name: string;
    @IsEmail()
    @Column()
    email: string;
    @IsNumber()
    @Column()
    phone: number;
    @IsString()
    @Column()
    password: string;
    appointments: conappointmentEntity[];
}