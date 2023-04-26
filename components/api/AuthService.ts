import BaseAPIService from "./BaseAPIService";

class AuthService extends BaseAPIService{
    async login(params: object): Promise<any> {
        return await this.request(`/auth/login`, 'POST', params)
    }
    async systemOverride(params: object): Promise<any> {
        return await this.request(`/auth/systemoverride`, 'POST', params)
    }
}
export const authService = new AuthService()