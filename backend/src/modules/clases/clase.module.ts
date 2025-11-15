import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';

import { Clase, ClaseSchema } from './clase.schema';
import { Incidencia, IncidenciaSchema } from '../incidencias/incidencia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Clase.name, schema: ClaseSchema },
      { name: Incidencia.name, schema: IncidenciaSchema } // ← IMPORTANTE
    ]),
  ],
  controllers: [ClasesController],
  providers: [ClasesService],
  exports: [ClasesService],
})
export class ClasesModule {}
