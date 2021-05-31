import { ShoppingCartBooksRequest } from "./shopping-cart-books-request";
import { ShoppingCartDiscountsRequest } from "./shopping-cart-discounts-request";
import { UserRequest } from "./user-request";

export class ShoppingCartRequest {
    user: UserRequest;
    totalAmount: number;
    totalGrossAmount: number;
    discountAmount: number;
    createdAt?: string;
    shoppingCartBooks: ShoppingCartBooksRequest[];
    shoppingCartDiscounts: ShoppingCartDiscountsRequest[];
}