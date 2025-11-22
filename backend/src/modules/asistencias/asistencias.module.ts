import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Asistencia, AsistenciaSchema } from './asistencia.schema';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasController } from './asistencias.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asistencia.name, schema: AsistenciaSchema }
    ]),
  ],
  controllers: [AsistenciasController],
  providers: [AsistenciasService],
})
export class AsistenciasModule {}
