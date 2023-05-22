import BaseAPIService from "./BaseAPIService";


class PaymentService extends BaseAPIService{
    async getPayables(clientID: number, currentPage: number, search: string): Promise<any> {
        return await this.request(`/payment/getpayables?clientID=${clientID}&currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async getReceiptNo(receiptType: number): Promise<any> {
        return await this.request(`/payment/getreceiptno?receiptType=${receiptType}`, 'GET')
    }
    async getPayments(params: object): Promise<any> {
        return await this.request(`/payment`, 'GET', params)
    }
    async getCollectionReport(params: object): Promise<any> {
        return await this.request(`/payment/getcollection`, 'GET', params)
    }
    async getDetails(id: number): Promise<any> {
        return await this.request(`/payment/${id}`, 'GET')
    }
    async create(params: object): Promise<any> {
        return await this.request(`/payment`, 'POST', params)
    }
    // async update(params: object): Promise<any> {
    //     return await this.request(`/survey`, 'PUT', params)
    // }
    async voidPayment(params: object): Promise<any> {
        return await this.request(`/payment/voidPayment`, 'PUT', params)
    }
}

export const paymentService = new PaymentService()