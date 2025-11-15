import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AsistenciasController } from './asistencias.controller';
import { AsistenciasService } from './asistencias.service';
import { Asistencia, AsistenciaSchema } from './asistencia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asistencia.name, schema: AsistenciaSchema }
    ])
  ],
  controllers: [AsistenciasController],
  providers: [AsistenciasService],
})
export class AsistenciasModule {}
