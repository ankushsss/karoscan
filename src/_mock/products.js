
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Nike Air Force 1 NDESTRUKT',
  'Nike Space Hippie 04',

];
const PRODUCT_COLOR = ['#00AB55', 'green'];
const User = [{
  id:"1",
    cover: `/static/mock-images/products/product_1.jpg`,
    name: "yash",
    price: "200",

    colors:['red','green'],
    PRODUCT_NAME:"ankush",
    status: "Veg"
},
{
id:"2",
cover: `/static/mock-images/products/product_1.jpg`,
name: "yash",
price: "200",

colors:['red','green'],
PRODUCT_NAME:"ankusg",
status: "nonVeg"
}
]
// ----------------------------------------------------------------------

const products = User.map((res, index) => {
  const setIndex = index + 1;

  return res
});

export default products;
