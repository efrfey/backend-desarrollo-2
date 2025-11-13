import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AsistenciaDocument = Asistencia & Document;

@Schema({ collection: 'asistencias' })
export class Asistencia {
  @Prop({ type: String, required: true })
  idClase: string;

  @Prop({ type: String, required: true })
  idDocente: string;

  @Prop({ type: Date, default: Date.now })
  fechaRegistro: Date;

  @Prop({ type: String, default: 'presente' })
  estado: string;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
