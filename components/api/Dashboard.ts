import BaseAPIService from "./BaseAPIService";


class DashboardService extends BaseAPIService{
    async getFinance(): Promise<any> {
        return await this.request(`/main/getfinancedashboard`, 'GET')
    }
    async getSurvey(): Promise<any> {
        return await this.request(`/main/getsurveydashboard`, 'GET')
    }
    async getRental(): Promise<any> {
        return await this.request(`/main/getrentaldashboard`, 'GET')
    }
    async getNotifications(): Promise<any> {
        return await this.request(`/main/getnotifications`, 'GET')
    }
    async getCalendarEvents(startDate: number, endDate: number): Promise<any> {
        return await this.request(`/main/getcalendarevents?startDate=${startDate}&&endDate=${endDate}`, 'GET')
    }
    async markAsRadNotif(params: object): Promise<any> {
        return await this.request(`/main/readnotification`, 'PUT', params)
    }
    
}

export const dashboardService = new DashboardService()