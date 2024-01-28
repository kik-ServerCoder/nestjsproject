import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity("Consultant")
export class conprofileEntity {
    @PrimaryGeneratedColumn()
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
    @OneToMany(() => conappointmentEntity, appointments => appointments.consultant)
    appointments: conappointmentEntity[];

}
@Entity("appointmentlist")
export class conappointmentEntity{
    @PrimaryGeneratedColumn()
    id : number;
    @IsString()
    @Column()
    name: string;
    @IsNumber()
    @Column()
    phone : number;
    @IsString()
    @Column()
    status: string;
    

    @ManyToOne(() => conprofileEntity, consultant => consultant.appointments)
    consultant: conprofileEntity;
    
    

}
