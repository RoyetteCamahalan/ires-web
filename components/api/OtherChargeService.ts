import BaseAPIService from "./BaseAPIService";


class OtherChargeService extends BaseAPIService{
    async GetOtherFee(id: number): Promise<any> {
        return await this.request(`/othercharge/getotherfee/${id}`, 'GET')
    }
    async GetOtherFees(currentPage: number, viewAll: boolean, search: string): Promise<any> {
        return await this.request(`/othercharge/getotherfees/?currentPage=${currentPage}&viewAll=${viewAll}&search=${search}`, 'GET')
    }
    async CreateOtherFee(params: object): Promise<any> {
        return await this.request(`/othercharge/createotherfee`, 'POST', params)
    }
    async UpdateOtherFee(params: object): Promise<any> {
        return await this.request(`/othercharge/updateotherfee`, 'PUT', params)
    }

    // async GetRentalUnit(id: number): Promise<any> {
    //     return await this.request(`/othercharge/getrentalunit/${id}`, 'GET')
    // }
    // async GetRentalUnits(projectID: number, currentPage: number, search: string): Promise<any> {
    //     return await this.request(`/othercharge/getrentalunits/?projectID=${projectID}&currentPage=${currentPage}&search=${search}`, 'GET')
    // }
    // async CreateRentalUnit(params: object): Promise<any> {
    //     return await this.request(`/othercharge/createrentalunit`, 'POST', params)
    // }
    // async UpdateRentalUnit(params: object): Promise<any> {
    //     return await this.request(`/othercharge/updaterentalunit`, 'PUT', params)
    // }
    // async GetAvailableRentalUnits(currentPage: number, search: string): Promise<any> {
    //     return await this.request(`/othercharge/getavailablerentalunits/?currentPage=${currentPage}&search=${search}`, 'GET')
    // }
}

export const otherChargeService = new OtherChargeService()