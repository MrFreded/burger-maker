const btnDisable = (input)=>{
    let checker;
    checker = Object.keys(input).every(key=>{
         return input[key].valid === true
     })
     return checker
}
export default btnDisable