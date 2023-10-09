export interface registerData {
name:string,
email:string,
password:string,
rePassword:string,
phone:string
}
export interface logInData {
email:string,
password:string,
}
export interface emailData {
email:string,
}
export interface codeData {
code:string,
}

export interface resetData {
    email:string,
    newPassword:number,
}


export interface productId{
    productId:string
}
export interface count{
    count:number
}

export interface payData {
    details:string,
    phone:number,
    city:string
    }










