import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { HorariosService } from './horarios.service';

@Controller('api/horarios')
export class HorariosController {
  constructor(private readonly service: HorariosService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':idDocente')
  getByDocente(@Param('idDocente') idDocente: string) {
    return this.service.findByDocente(idDocente);
  }

  @Get('hoy/:idDocente')
  getToday(@Param('idDocente') idDocente: string) {
    return this.service.findTodayByDocente(idDocente);
  }

  @Post()
  create(@Body() payload: any) {
    return this.service.create(payload);
  }
}
