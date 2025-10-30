function Validation(formData){

    let error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(formData.username === ""){
        error.username = "Username should not be empty"
    }
    else{
        error.username = ""
    }

    if(formData.email ===""){
        error.email = "Email should not be empty"
    }
    else{
        error.email = ""
    }

    if(formData.password === ""){
        error.password = "Password should not empty";
    }
    else if(!password_pattern.test(formData.password)){
        error.password = "Password didn't match"
    }
    else{
        error.password = ""
    }

    return error;

}

export default Validation;