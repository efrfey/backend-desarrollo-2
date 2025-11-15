import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Incidencia, IncidenciaSchema } from './incidencia.schema';
import { IncidenciasService } from './incidencias.service';
import { IncidenciasController } from './incidencias.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Incidencia.name, schema: IncidenciaSchema }])],
  providers: [IncidenciasService],
  controllers: [IncidenciasController],
  exports: [IncidenciasService],
})
export class IncidenciasModule {}
