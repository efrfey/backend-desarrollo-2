import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ClasesService } from './clases.service';

@Controller('api/clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  // ⚠️ Primero rutas específicas
  @Get('hoy/:idDocente')
  getToday(@Param('idDocente') idDocente: string) {
    return this.clasesService.findTodayByDocente(idDocente);
  }

  @Put('asistencia/:idClase')
  marcarAsistencia(@Param('idClase') idClase: string) {
    return this.clasesService.registerAsistencia(idClase);
  }

  @Post()
  create(@Body() payload: any) {
    return this.clasesService.create(payload);
  }

  // ⚠️ Última la ruta genérica (para que no capture todo)
  @Get(':idDocente')
  getByDocente(@Param('idDocente') idDocente: string) {
    return this.clasesService.findByDocente(idDocente);
  }
}
