export enum ApiResponseTechStatusCode {
  SUCCESS,
  USER_EXISTS
}

export interface ApiResponseMessage{
  message : string,
  apiResponseTechStatusCode : ApiResponseTechStatusCode
}
