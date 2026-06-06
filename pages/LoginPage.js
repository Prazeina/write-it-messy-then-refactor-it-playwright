export class LoginPage{
    constructor(page){
        // Just define locators in the constructor
        this.page = page;
        this.usernameInput = page.getByRole('textbox', {name:'Username'})
        this.passwordInput = page.getByRole('textbox', {name:'Password'})
        this.submitButton = page.getByRole('button', {name: 'Submit'})
        this.errorMessage = page.locator('#error')
    }
    
    //  Method
    async goto(){
        await this.page.goto('https://practicetestautomation.com/practice-test-login/')
    }

    async login(username, password){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }
}