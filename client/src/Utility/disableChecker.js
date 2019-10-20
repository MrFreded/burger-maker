const checkerDisable = (ing)=>{
    let checker = true
    let Ingredients = [];
    Object.keys(ing).forEach(key=>{
        Ingredients = [...Ingredients,...((key+" ").repeat(ing[key]).trim().split(" "))];
      });
      Ingredients = Ingredients.filter(key=>{
        return key !== ""
      });
    if(Ingredients.length === 0){
        checker= true
    }else{
       checker = false
    }
    return checker;
};

export default checkerDisable;


// checkIngredientDisable = (ing)=>{
//   let checker
//  let arr = Object.keys(ing).map(key=>{
//     ing[key] > 0
//   })
//   return checker = arr[indexOf(key)]
// }