import type { AxiosResponse } from 'axios'

export interface AxiosRes extends AxiosResponse {
  msg?: string
}