import BaseAPIService from "./BaseAPIService";


class ProjectService extends BaseAPIService{
    async GetRentalProperty(id: number): Promise<any> {
        return await this.request(`/project/getrentalproperty/${id}`, 'GET')
    }
    async GetRentalProperties(currentPage: number, search: string): Promise<any> {
        return await this.request(`/project/getrentalproperties/?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async CreateRentalProperty(params: object): Promise<any> {
        return await this.request(`/project/createrentalproperty`, 'POST', params)
    }
    async UpdateRentalProperty(params: object): Promise<any> {
        return await this.request(`/project/updaterentalproperty`, 'PUT', params)
    }

    async GetRentalUnit(id: number): Promise<any> {
        return await this.request(`/project/getrentalunit/${id}`, 'GET')
    }
    async GetRentalUnits(projectID: number, currentPage: number, search: string): Promise<any> {
        return await this.request(`/project/getrentalunits/?projectID=${projectID}&currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async CreateRentalUnit(params: object): Promise<any> {
        return await this.request(`/project/createrentalunit`, 'POST', params)
    }
    async UpdateRentalUnit(params: object): Promise<any> {
        return await this.request(`/project/updaterentalunit`, 'PUT', params)
    }
    async GetAvailableRentalUnits(currentPage: number, search: string): Promise<any> {
        return await this.request(`/project/getavailablerentalunits/?currentPage=${currentPage}&search=${search}`, 'GET')
    }
}

export const projectService = new ProjectService()