import { UserRequest } from "../request/user-request";
import { ShoppingCartBooksRequest } from "../request/shopping-cart-books-request";
import { ShoppingCartDiscountsRequest } from "../request/shopping-cart-discounts-request";

export class ShoppingCartResponse {
    id:number;
    user: UserRequest;
    totalAmount: number;
    totalGrossAmount: number;
    discountAmount: number;
    createdAt?: string;
    shoppingCartBooks: ShoppingCartBooksRequest[];
    shoppingCartDiscounts: ShoppingCartDiscountsRequest[];
}