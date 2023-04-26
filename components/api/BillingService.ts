import BaseAPIService from "./BaseAPIService";


class BillingService extends BaseAPIService{
    async getPlans(): Promise<any> {
        return await this.request(`/billing/getplans`, 'GET')
    }
    async getBills(currentPage: number, filter: number): Promise<any> {
        return await this.request(`/billing/?currentPage=${currentPage}&filter=${filter}`, 'GET')
    }
    async updateBillingCycle(params: Object): Promise<any> {
        return await this.request(`/billing/updatebillingcycle`, 'PUT', params)
    }
    async startPayment(params: Object): Promise<any> {
        return await this.request(`/billing/processpayment`, 'POST', params)
    }
    async completePayment(params: Object): Promise<any> {
        return await this.request(`/billing/completepayment`, 'POST', params)
    }

}

export const billingService = new BillingService()