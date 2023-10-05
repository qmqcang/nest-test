import { ArgumentsHost, Catch, ExceptionFilter, HttpException, LoggerService } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const res = ctx.getResponse()
      const req = ctx.getRequest()
      const stu = exception.getStatus()

      this.logger.error(exception.message, exception.stack)

      res.status(stu).json({
        statusCode: stu,
        path: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
        message: exception.message || HttpException.name,
      })
  }
}
