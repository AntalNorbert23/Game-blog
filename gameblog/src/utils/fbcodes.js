
const errorCode=(code)=>{
    let message ="Sorry, try again later";

    switch(code){
        case "auth/user-not-found":
            message='Sorry, user not found, check your email'
            break;
        case "auth/email-already-in-use":
            message='Email already in use!'
            break;
        case "auth/wrong-password":
            message='Wrong password!'
            break;
        case "auth/invalid-credential":
            message='Invalid credential'
            break;
        default:
            message=code;
    }

    return message;
}

export default errorCode;
