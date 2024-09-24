import { Controller } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { PrometheusController } from '@willsoto/nestjs-prometheus';

@ApiExcludeController()
@Controller()
export class MetricsController extends PrometheusController {}
