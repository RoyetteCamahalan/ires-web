import BaseAPIService from "./BaseAPIService";


class FileService extends BaseAPIService{
    async get(typeID: number, attachableID: number, lotID: number): Promise<any> {
        return await this.request(`/attachment/?typeID=${typeID}&attachableID=${attachableID}&lotID=${lotID}`, 'GET')
    }

    async upload(params: Object): Promise<any> {
        return await this.request(`/attachment`, 'POST', params)
    }
    async delete(params: Object): Promise<any> {
        return await this.request(`/attachment/deletefile`, 'POST', params)
    }

}

export const fileService = new FileService()