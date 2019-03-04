
import { IProductList, IOrderData, IOrderRowData } from './components/IWebShopOnlineProps';
import { sp, ItemAddResult } from "sp-pnp-js";

export interface IGetDataService {
    getData(): Promise<IProductList[]>;
    saveOrderData(title: string, user: number, date: string);
    getOrderData(): Promise<IOrderData[]>;
    saveOrderRowData(OrderId: string, productId: string);
}

export class PNPDataService implements IGetDataService {
    public getData(): Promise<IProductList[]> {
        return sp.web.lists.getByTitle("Produkter").items.get().then((result) => {
            return result;
        });
    }

    public saveOrderData(title: string, user: number, date: string) {
        console.log("SaveOrderData", title);
        sp.web.lists.getByTitle("Ordrar").items.add({
            Title: title,
            ECWS_x002e_Date: date,
            ECWS_x002e_UserId: user,
        }).then(r => {
        });
    }

    public getOrderData(): Promise<IOrderData[]> {
        return sp.web.lists.getByTitle("Ordrar").items.get().then((result) => {
            return result;
        });
    }

    public saveOrderRowData(OrderId: string, productId: string) {
        console.log("My order Id",OrderId);
        sp.web.lists.getByTitle("Orderrader").items.add({
            Title: "Order",
            ECWS_x002e_OrderId: OrderId,
            ECWS_x002e_ProductId: productId
        }).then(r => {
            console.log("value of r", r)
        });
    }
}



