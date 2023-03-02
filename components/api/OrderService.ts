import BaseAPIService from "./BaseAPIService";

class OrderService extends BaseAPIService{
    async getOpenOrders(): Promise<any> {
        let officecode = localStorage.getItem("_officecode")
        return await this.request(`/mobile/getActiveOrders/${officecode}`, 'GET')
    }
    async updateOrderStatus(params: object): Promise<any>{
        return await this.request(`/mobile/updateOrderStatus`, 'POST', params)
    }
}
export const orderService = new OrderService()