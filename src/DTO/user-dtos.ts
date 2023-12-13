import { PropertyProps } from './property-dtos';

export interface CreateUserRequest {
  name: string
  phone: string
  email: string
  password: string
  confirmpassword: string
}
export interface GetAllUsersResponseDTO {
  id: string
  email: string
  name: string
  phone: string
  Property: PropertyProps[]
}