
/*
 * ----------------Validation Example ------------------ 
 * 
 * You won't need to change anything in this section.
 *
 */

const { attributes } = require('structure');

 
const Stock = attributes(
  { 
    symbol: { 
      type: String,
      regex: /[a-zA-Z.]+/ 
      },
    sharePrice: {
       type: Number,
       positive : true 
      } 
})(class Stock {}); 

const goodstock = new Stock({symbol: 'MSFT', sharePrice: 110.5 });
const badstock = new Stock({symbol: 'MSFAAT', sharePrice: -11.5 });

console.log(badstock.validate());

