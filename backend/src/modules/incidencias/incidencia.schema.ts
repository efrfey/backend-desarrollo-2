import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IncidenciaDocument = Incidencia & Document;

@Schema({ collection: 'incidencias' })
export class Incidencia {
  @Prop()
  idClase: string;

  @Prop()
  idDocente: string;

  @Prop()
  materia: string;

  @Prop()
  fecha: Date;

  @Prop()
  horaInicio: string;

  @Prop()
  horaFin: string;

  @Prop()
  tipo: string;

  @Prop()
  descripcion: string;

  @Prop()
  creadaEn: Date;
}

export const IncidenciaSchema = SchemaFactory.createForClass(Incidencia);
