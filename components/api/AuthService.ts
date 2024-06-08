import BaseAPIService from "./BaseAPIService";

class AuthService extends BaseAPIService{
    async login(params: object): Promise<any> {
        return await this.request(`/auth/login`, 'POST', params)
    }
    async systemOverride(params: object): Promise<any> {
        return await this.request(`/auth/systemoverride`, 'POST', params)
    }
    async sendResetPasswordLink(params: object): Promise<any> {
        return await this.request(`/auth/sendpasswordresetlink`, 'POST', params)
    }
    async validatePasswordToken(token: string): Promise<any> {
        return await this.request(`/auth/validatepasswordresettoken?token=${token}`, 'GET')
    }
    async resetPassword(params: object): Promise<any> {
        return await this.request(`/auth/resetpassword`, 'PUT', params)
    }
}
export const authService = new AuthService()