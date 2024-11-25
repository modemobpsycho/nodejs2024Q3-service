import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { method, url, body, query } = request;
    this.logger.log(`Request: ${method} ${url}`);
    this.logger.log('Query:', JSON.stringify(query));
    this.logger.log('Body:', JSON.stringify(body));

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.logger.log(`Response: ${response.statusCode} - Duration: ${duration}ms\n`);
      }),
    );
  }
}
