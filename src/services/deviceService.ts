import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Params } from 'react-router-dom'

export interface Device {
  name: string
  serialNumber: string
  status: string
  createTime: Date
}

export interface RequestPayload <Payload = unknown> {
  params?: Params<string>
  payload?: Payload
}

export const api = createApi({
  reducerPath: 'deviceApi',
  tagTypes: ['Device'],
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (builder) => ({
    getDevice: builder.query<Device[],void>({
      query: () => ({
        url: 'devices',
        method: 'GET',
      }),
      providesTags: [{type: 'Device', id: 'List'}]
    }),
    getSpecificDevice: builder.query<Device,string | undefined>({
      query: (serialNumber) => ({
        url: 'devices/' + serialNumber,
        method: 'GET',
      }),
    }),
    addDevice: builder.mutation<Device, Device>({
      query: (device) => ({
        url: 'devices',
        method: 'POST',
        body: device
      }),
      invalidatesTags: [{type: 'Device', id: 'List'}]
    }),
    updateDevice: builder.mutation<Device, RequestPayload>({
      query: ({params, payload}) => ({
        url: 'devices/' + params?.serialNumber,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [{type: 'Device', id: 'List'}]
    })
  }),
})

export const { 
  useGetDeviceQuery, 
  useLazyGetDeviceQuery, 
  useGetSpecificDeviceQuery, 
  useLazyGetSpecificDeviceQuery, 
  useAddDeviceMutation, 
  useUpdateDeviceMutation } = api