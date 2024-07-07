class APIError extends Error {
	errors?: Record<string, string[]>
	code?: string
	data?: any

	constructor(error: any) {
		super(error.message)
		Object.setPrototypeOf(this, APIError.prototype)
		if(error.errorCode){
			this.code = error.errorCode
		}
		if(error.data){
			this.data = error.data
		}
		if (error.errors) {
			this.errors = error.errors
		}
	}

	getErrorMessage() {
		return 'Something went wrong: ' + this.message
	}
}
export default APIError