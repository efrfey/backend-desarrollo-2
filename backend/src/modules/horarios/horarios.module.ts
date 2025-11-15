import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Horario, HorarioSchema } from './horario.schema';
import { HorariosService } from './horarios.service';
import { HorariosController } from './horarios.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Horario.name, schema: HorarioSchema }])],
  providers: [HorariosService],
  controllers: [HorariosController],
  exports: [HorariosService],
})
export class HorariosModule {}
