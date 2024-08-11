import BaseAPIService from "./BaseAPIService";
import moment from "moment";


class DashboardService extends BaseAPIService{
    async getFinance(): Promise<any> {
        return await this.request(`/main/getfinancedashboard`, 'GET')
    }
    async getSurvey(): Promise<any> {
        var currentDate = new Date();
        return await this.request(`/main/getsurveydashboard?currentDate=${moment(currentDate).format('YYYY-MM-DD')}`, 'GET')
    }
    async getRental(): Promise<any> {
        var currentDate = new Date();
        return await this.request(`/main/getrentaldashboard?currentDate=${moment(currentDate).format('YYYY-MM-DD')}`, 'GET')
    }
    async getNotifications(): Promise<any> {
        return await this.request(`/main/getnotifications`, 'GET')
    }
    async getCalendarEvents(startDate: number, endDate: number): Promise<any> {
        return await this.request(`/main/getcalendarevents?startDate=${startDate}&&endDate=${endDate}`, 'GET')
    }
    async markAsReadNotif(params: object): Promise<any> {
        return await this.request(`/main/readnotification`, 'PUT', params)
    }
    async markAllAsReadNotif(params: object): Promise<any> {
        return await this.request(`/main/markallasreadnotifs`, 'POST', params)
    }
    async SaveLog(params: object): Promise<any> {
        return await this.request(`/main/savelog`, 'POST', params)
    }
    
}

export const dashboardService = new DashboardService()