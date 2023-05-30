import {logger} from "../../15_logger.js"
import { errorMessages } from './errorDictionary.js'

export function errorHandler(err, req, res, next) {
  const errorMessage = errorMessages[err.message]
  const message = errorMessage
    ? errorMessage.msg
    : err.message || 'Internal error'
  const status = errorMessage ? errorMessage.status : 500
  logger.error(`[${status}] ${message}`)
  res.status(status).json({
    error: message,
    status,
    data: null,
  })
}
