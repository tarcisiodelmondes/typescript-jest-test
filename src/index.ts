/* eslint-disable */

import { Order } from './class/order';
import { Product } from './class/product';
import { Message } from './services/message';
import { Persistence } from './services/persistence';
import { ShoppingCart } from './class/shoppingCart';
import {
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './class/discount';
import { EnterpriseCustomer } from './class/customer';

const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
// const noDiscount = new NoDiscount();

const shoppingCart = new ShoppingCart(fiftyPercentDiscount);

/* const individualCostumer = new IndividualCostumer(
  'Tarcisio',
  'Delmondes',
  '111-111-111-11',
); */

const enterpriseCustomer = new EnterpriseCustomer(
  'Enterprise',
  '11111-111-1111111-1',
);

const order = new Order(
  shoppingCart,
  new Message(),
  new Persistence(),
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Notebook', 599.99));
shoppingCart.addItem(new Product('Phone', 1000));

console.log(shoppingCart.items);

console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());

order.checkout();
console.log(order.orderStatus);
