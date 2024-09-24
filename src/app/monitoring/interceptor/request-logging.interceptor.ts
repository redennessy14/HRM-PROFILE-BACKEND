import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { ConfigService } from '../../config';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLoggingInterceptor.name);

  constructor(private config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl, body, params, query } = request;

    if (
      originalUrl === this.config.app.metricsPath ||
      !this.config.app.loggingRequests
    ) {
      return next.handle().pipe();
    }

    this.logger.log(`Incoming request: ${method} ${originalUrl}`);

    if (Object.keys(body).length > 0) {
      this.logger.log(`Request body: ${JSON.stringify(body)}`);
    }

    if (Object.keys(params).length > 0) {
      this.logger.log(`Request path params: ${JSON.stringify(params)}`);
    }

    if (Object.keys(query).length > 0) {
      this.logger.log(`Request query params: ${JSON.stringify(query)}`);
    }

    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(`Error: ${error.message}`, error.stack);

        if (error.response) {
          this.logger.error(
            `Request response payload: ${JSON.stringify(error?.response.data)}`,
          );
          this.logger.error(
            `Request response status: ${error.response.status}`,
          );
        }
        return throwError(() => error);
      }),
      tap((responsePayload?: any) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;

        this.logger.log(
          `Outgoing response: ${statusCode}, response payload: ${
            responsePayload ? JSON.stringify(responsePayload, null, 4) : null
          }`,
        );
      }),
    );
  }
}
