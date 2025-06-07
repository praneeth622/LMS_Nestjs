// filepath: /workspaces/LMS_Nestjs/lms_backend/src/common/interceptors/audit.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../../audit/audit-logs.entity';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, params } = request;
    
    // Only log POST, PUT, PATCH, DELETE operations
    const loggedMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    
    if (!loggedMethods.includes(method)) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (data) => {
        try {
          const auditLog = this.auditLogRepository.create({
            user_id: body.user_id || body.created_by || null,
            action_type: method,
            table_name: this.extractTableName(url),
            record_id: data?.id || params?.id || null,
            action_details: {
              url,
              method,
              body: this.sanitizeBody(body),
              response_id: data?.id,
            },
          });

          await this.auditLogRepository.save(auditLog);
        } catch (error) {
          console.error('Audit logging failed:', error);
        }
      }),
    );
  }

  private extractTableName(url: string): string {
    const pathParts = url.split('/').filter(part => part && part !== 'api');
    return pathParts[0] || 'unknown';
  }

  private sanitizeBody(body: any): any {
    const sanitized = { ...body };
    if (sanitized.password) delete sanitized.password;
    if (sanitized.password_hash) delete sanitized.password_hash;
    return sanitized;
  }
}