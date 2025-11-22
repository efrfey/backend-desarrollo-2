import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AsistenciaDocument = Asistencia & Document;

@Schema({ timestamps: true })
export class Asistencia {
  
  @Prop({ required: true })
  estudiante: string;

  @Prop({ required: true })
  clase: string;

  @Prop()
  docente: string;

  @Prop()
  horaInicio: string;

  @Prop()
  horaFin: string;

  @Prop({ required: true })
  fecha: string;

  @Prop({ default: true })
  presente: boolean;
}


export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
