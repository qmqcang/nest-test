import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { QueryFailedError, TypeORMError } from 'typeorm'

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    let status = 500

    if (exception instanceof QueryFailedError) {
      status = exception.driverError.errno
    }

    response.status(500).json({
      code: status,
      timestamp: new Date().toISOString(),
      message: exception.message
    })
  }
}
