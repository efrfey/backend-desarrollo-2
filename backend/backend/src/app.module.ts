import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocentesModule } from './modules/docentes/docentes.module';
import { ClasesModule } from './modules/clases/clase.module';
import { HorariosModule } from './modules/horarios/horarios.module';
import { AsistenciasModule } from './modules/asistencias/asistencias.module';
import { IncidenciasModule } from './modules/incidencias/incidencias.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || '', {
      dbName: 'Proyecto_DS_II'
    }),
    DocentesModule,
    ClasesModule,
    HorariosModule,
    AsistenciasModule,
    IncidenciasModule
  ],
})
export class AppModule {}
