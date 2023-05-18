import BaseAPIService from "./BaseAPIService";


class DashboardService extends BaseAPIService{
    async getFinance(): Promise<any> {
        return await this.request(`/main/getfinancedashboard`, 'GET')
    }
    async getSurvey(): Promise<any> {
        return await this.request(`/main/getsurveydashboard`, 'GET')
    }
}

export const dashboardService = new DashboardService()