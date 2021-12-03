const isEmpty = (string) => {
    if(!string.trim()) return true;
    else return false;
  }
  const isEmail = (email) => {
    let trimmed = email.trim()
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(trimmed.match(regEx)) return true;
    else return false;
  }

  const isString = (string) => {
    const regEx = /^[^<>&;]*$/;
    if(string.match(regEx)) return true;
    else return false;
  }
  const isNumber = (phoneNumber) => {
    if(isFinite(phoneNumber)) return true;
    else return false;
  }

  export function checkAdminSignUp(data){
    let checkErrors = {};
    if(isEmpty(data.name)) checkErrors.name = 'Must not be empty';
    else if(!isString(data.name)){ checkErrors.name = 'only white spaces and letters are allowed'}
    if(isEmpty(data.email)){
      checkErrors.email = 'Must not be empty';
    }else if(!isEmail(data.email)){
    checkErrors.email = 'must be a valid email address'
    }
    if(isEmpty(data.password)) checkErrors.password = 'Must not be empty';
    else if(data.password.length < 6) checkErrors.password = 'length must be longer than 5';
    if(data.password !== data.confirmPassword){
      checkErrors.confirmPassword = 'passwords must match';
    }
    return{
        checkErrors,
        valid: Object.keys(checkErrors).length === 0 ? true : false
    }
  }
  //user signUp
  export function checkUserSignUp(data){
    let checkErrors = {};
    if(isEmpty(data.firstName)) checkErrors.firstName = 'Must not be empty';
    else if(!isString(data.firstName)){ checkErrors.firstName = 'only white spaces and letters are allowed'}
    if(isEmpty(data.surname)) checkErrors.surname = 'Must not be empty';
    else if(!isString(data.surname)){ checkErrors.surname = 'only white spaces and letters are allowed'}
    if(isEmpty(data.email)){
      checkErrors.email = 'Must not be empty';
    }else if(!isEmail(data.email)){
    checkErrors.email = 'must be a valid email address'
    }
    if(isEmpty(data.password)) checkErrors.password = 'Must not be empty';
    else if(data.password.length < 6) checkErrors.password = 'length must be longer than 5';
    if(data.password !== data.confirmPassword){
      checkErrors.confirmPassword = 'passwords must match';
    }
    if(isEmpty(data.deliveryAddress)) checkErrors.deliveryAddress = 'Must not be empty';
    else if(!isString(data.deliveryAddress)){ checkErrors.deliveryAddress = 'only white spaces and letters are allowed'}
    if(isEmpty(data.phoneNumber)) checkErrors.phoneNumber = 'Must not be empty';
    else if(!isNumber(data.phoneNumber)) checkErrors.phoneNumber = 'must be a number';


    return{
        checkErrors,
        valid: Object.keys(checkErrors).length === 0 ? true : false
    }
  }
  //checkLogin
  export function checkLogin(data){
    let checkErrors = {};
    if(isEmpty(data.email)){
      checkErrors.email = 'Must not be empty';
    }else if(!isEmail(data.email)){
    checkErrors.email = 'must be a valid email address'
    }
    if(isEmpty(data.password)) checkErrors.password = 'Must not be empty';
    return{
        checkErrors,
        valid: Object.keys(checkErrors).length === 0 ? true : false
    }
  }
  //checkSubscriber
  export function checkSubscriber(data){
    let checkErrors = {}
    if(isEmpty(data.email)){
      checkErrors.email = 'Must not be empty';
    }else if(!isEmail(data.email)){
      checkErrors.email = 'must be a valid email address'
    }
    return{
      checkErrors,
      valid: Object.keys(checkErrors).length === 0 ? true : false
  }
  }
  