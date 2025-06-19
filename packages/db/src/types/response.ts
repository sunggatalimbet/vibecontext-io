export type DataResponse<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: {
        message: string
        code: string
        statusCode: number
      }
    }
