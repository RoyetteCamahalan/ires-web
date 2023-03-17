import BaseAPIService from "./BaseAPIService";


class EmployeeService extends BaseAPIService{
    async get(currentPage: number, search: string): Promise<any> {
        return await this.request(`/employee/?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async getDetails(id: number): Promise<any> {
        return await this.request(`/employee/${id}`, 'GET')
    }
    async create(params: object): Promise<any> {
        return await this.request(`/employee`, 'POST', params)
    }
    async update(params: object): Promise<any> {
        return await this.request(`/employee`, 'PUT', params)
    }
}

export const employeeService = new EmployeeService()