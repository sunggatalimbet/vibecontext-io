import 'server-only'

// Base error class
export abstract class AppError extends Error {
  abstract readonly code: string
  abstract readonly statusCode: number
  abstract readonly isOperational: boolean

  constructor(
    message: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message)
    this.name = this.constructor.name

    // Maintains proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// Authentication Errors (401)
export class AuthenticationError extends AppError {
  readonly code = 'AUTHENTICATION_ERROR'
  readonly statusCode = 401
  readonly isOperational = true
}

export class SessionExpiredError extends AppError {
  readonly code = 'SESSION_EXPIRED'
  readonly statusCode = 401
  readonly isOperational = true

  constructor() {
    super('Your session has expired. Please sign in again.')
  }
}

// Authorization Errors (403)
export class AuthorizationError extends AppError {
  readonly code = 'AUTHORIZATION_ERROR'
  readonly statusCode = 403
  readonly isOperational = true
}

export class ResourceAccessDeniedError extends AppError {
  readonly code = 'RESOURCE_ACCESS_DENIED'
  readonly statusCode = 403
  readonly isOperational = true

  constructor(resourceType: string, resourceId?: string) {
    super(
      `Access denied to ${resourceType}${resourceId ? ` (${resourceId})` : ''}`,
      { resourceType, resourceId }
    )
  }
}

// Validation Errors (400)
export class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR'
  readonly statusCode = 400
  readonly isOperational = true
}

export class InvalidInputError extends AppError {
  readonly code = 'INVALID_INPUT'
  readonly statusCode = 400
  readonly isOperational = true

  constructor(field: string, reason: string) {
    super(`Invalid ${field}: ${reason}`, { field, reason })
  }
}

// Not Found Errors (404)
export class NotFoundError extends AppError {
  readonly code = 'NOT_FOUND'
  readonly statusCode = 404
  readonly isOperational = true
}

export class ResourceNotFoundError extends AppError {
  readonly code = 'RESOURCE_NOT_FOUND'
  readonly statusCode = 404
  readonly isOperational = true

  constructor(resourceType: string, resourceId: string) {
    super(`${resourceType} not found: ${resourceId}`, {
      resourceType,
      resourceId,
    })
  }
}

// Database Errors (500)
export class DatabaseError extends AppError {
  readonly code = 'DATABASE_ERROR'
  readonly statusCode = 500
  readonly isOperational = true
}

export class ConflictError extends AppError {
  readonly code = 'CONFLICT_ERROR'
  readonly statusCode = 409
  readonly isOperational = true
}

// External Service Errors (502/503)
export class ExternalServiceError extends AppError {
  readonly code = 'EXTERNAL_SERVICE_ERROR'
  readonly statusCode = 502
  readonly isOperational = true
}

// Helper function to determine if error is operational
export function isOperationalError(error: Error): boolean {
  return error instanceof AppError && error.isOperational
}

// Helper to extract error details
export function getErrorDetails(error: unknown): {
  message: string
  code: string
  statusCode: number
  context?: Record<string, unknown>
} {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      context: error.context,
    }
  }

  // Handle Zod validation errors
  if (error && typeof error === 'object' && 'issues' in error) {
    return {
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      statusCode: 400,
      context: { issues: error.issues },
    }
  }

  // Unknown errors
  return {
    message: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
    statusCode: 500,
  }
}
