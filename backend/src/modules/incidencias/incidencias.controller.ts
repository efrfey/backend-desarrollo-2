import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { IncidenciasService } from './incidencias.service';

@Controller('api/incidencias')
export class IncidenciasController {
  constructor(private readonly service: IncidenciasService) {}

  @Post()
  create(@Body() payload: any) {
    return this.service.create(payload);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':idDocente')
  getByDocente(@Param('idDocente') idDocente: string) {
    return this.service.findByDocente(idDocente);
  }

  @Put(':id/estado')
  updateEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.service.updateEstado(id, estado);
  }
}
