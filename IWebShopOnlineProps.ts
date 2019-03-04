export interface IWebShopOnlineProps {
  description: string;
  products: IProductList[];
  saveOrderData(title: string, user: number, date: string);
  getOrderData(): Promise<IOrderData[]>;
  saveOrderRowData(OrderId: string, productId: string);
}

export interface IProductList {
  Id: string;
  Title: string;
  ECWS_x002e_Price: string;
  ECWS_x002e_Category: string;
  ECWS_x002e_ImageUrl: { Description: string, Url: string };
}

export interface IOrderData {
  Id: string;
  Title: string;
}

export interface IOrderRowData {
  Id: string;
  Title: string;
  ECWS_x002e_Order: string;
  ECWS_x002e_Product: string;
}

export interface IOrders {
  Key: string;
  Id: string;
  Title: string;
  Price: string;
  Category: string;
  ImageUrl: string;
}
