import BaseAPIService from "./BaseAPIService";


class PaymentService extends BaseAPIService{
    async getPayables(clientID: number, currentPage: number, search: string): Promise<any> {
        return await this.request(`/payment/getpayables?clientID=${clientID}&currentPage=${currentPage}&search=${search}`, 'GET')
    }
    // async getDetails(id: number): Promise<any> {
    //     return await this.request(`/survey/${id}`, 'GET')
    // }
    // async create(params: object): Promise<any> {
    //     return await this.request(`/survey`, 'POST', params)
    // }
    // async update(params: object): Promise<any> {
    //     return await this.request(`/survey`, 'PUT', params)
    // }
}

export const paymentService = new PaymentService()