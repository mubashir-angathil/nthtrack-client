/**
 * ApiError
 *
 * Represents the structure of an API error response, including status, success flag, error message,
 * and an optional array of field-level errors.
 *
 * @interface
 */
export interface ApiError {
  status: number; // HTTP status code indicating the type of error.
  data: {
    success: boolean; //  A boolean flag indicating the success or failure of the API request.
    message: string; //A descriptive message providing more details about the error.
    error?: {
      name: string;
      //Optional array of field-level errors, each represented as an object with keys and unknown values.
      fieldErrors?: Array<{ [key: string]: string }>;
    };
  };
}
export interface ApiResponse {
  status: number; // HTTP status code indicating the type of error.
  data: {
    success: boolean; //  A boolean flag indicating the success or failure of the API request.
    message: string; //A descriptive message providing more details about the error.
    data: any;
  };
}

export interface ApiResponseWithPagination extends NormalApiSuccessResponse {
  totalRows: number; // Total number of rows/projects available
}

export interface ApiRequestWithPagination {
  page: number; // Page number for pagination
  limit: number; // Limit for the number of items per page
}

export interface NormalApiSuccessResponse {
  success: boolean; // Indicates the success of the API request
  message: string; // Message from the server
}
