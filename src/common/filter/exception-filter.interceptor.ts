import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ExceptionFilter implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const request = context.switchToHttp().getRequest();
        const { url, method, query, body } = request;
        const { statusCode, message } = error;

        this.logger.error(
          `Request: ${method} ${url}?${new URLSearchParams(
            query,
          ).toString()} \nBody: \n${JSON.stringify(body)}`,
        );
        this.logger.error(`Response: ${statusCode} ${message}`);

        return throwError(() => error);
      }),
    );
  }
}
