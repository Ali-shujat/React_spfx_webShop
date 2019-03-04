import * as React from 'react';
import styles from './WebShopOnline.module.scss';
import { IWebShopOnlineProps, IProductList, IOrders, IOrderData } from './IWebShopOnlineProps';
import Orders from './Orders/Orders';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';


export interface IWebShopOnlineState {
  items: IProductList[];
  orderItems: IOrders[];
  registeredOrders: IOrderData[];
  Id: string;
  Title: string;
  Price: string;
  Category: string;
  ImageUrl: string;
  mouseOver: boolean;
  showModal: boolean;
  totalItem: number;
}

export default class WebShopOnline extends React.Component<IWebShopOnlineProps, IWebShopOnlineState> {
  constructor(props: IWebShopOnlineProps) {
    super(props);
    this.state = {
      items: this.props.products,
      mouseOver: false,
      showModal: false,
      Id: '',
      Title: '',
      Price: '',
      Category: '',
      ImageUrl: '',
      totalItem: 0,
      orderItems: [],
      registeredOrders: [],
    };
    this.addItems = this.addItems.bind(this);
    // this.CloseModalHandler = this.CloseModalHandler.bind(this);
    // this.SaveOrder = this.SaveOrder.bind(this);
    this.CancelOrderHandler = this.CancelOrderHandler.bind(this);
    this.ProceedToCheckout = this.ProceedToCheckout.bind(this);
    // this.onChangePage = this.onChangePage.bind(this);
  }
  //METHODS
  private addItems(Id: string, Title: string, Price: string, Category: string, ImageUrl: string) {
    this.setState(prevState => ({
      orderItems: [...prevState.orderItems, {
        Key: new Date().toJSON(),
        Id: Id,
        Title: Title,
        Price: Price,
        Category: Category,
        ImageUrl: ImageUrl,
      }]
    }));console.log(this.state.orderItems);
  }

  private CancelOrderHandler(index: number, e) {
    const myList = [...this.state.orderItems];
    myList.splice(index, 1);
    this.setState({ orderItems: myList });
    console.log("Clicked", index);
    console.log("NewItemOrder", this.state.orderItems);
  }

  private ProceedToCheckout(title: string, user: number, date: string) {
    this.props.saveOrderData(title, user, date);
    setTimeout(() => {
      this.props.getOrderData().then((result) => {
        console.log("result", result);
        this.setState({ registeredOrders: result });
      });
    }, 1000);
    setTimeout(() => {
      let lastItem = this.state.registeredOrders[this.state.registeredOrders.length - 1];
      this.state.orderItems.forEach(element => {
        this.props.saveOrderRowData(lastItem.Id, element.Id);
      });
      this.setState({ orderItems: [] });
    }, 2000);
  }



  public render(): React.ReactElement<IWebShopOnlineProps> {
    let items = [];
    items = this.state.items.map((item) => {
      return (
        <div className={styles.tile} key={item.Id}>
          <div className={styles.ProductItem} >
            <img className={styles.Images}
              src={item.ECWS_x002e_ImageUrl.Url}
              alt={item.ECWS_x002e_ImageUrl.Description}
            />         
            <div className={styles.ProductInfo}>
              <div>{item.Title}</div>
              <div className={styles.Price}>{item.ECWS_x002e_Price} kr</div>
              <button className={styles.AddItemButton}
                onClick={this.addItems.bind(this,
                  item.Id,
                  item.Title,
                  item.ECWS_x002e_Price,
                  item.ECWS_x002e_Category,
                  item.ECWS_x002e_ImageUrl.Url,
                )}
              >Add to Cart</button>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className={styles.webShopOnline}>
        <div className={styles.container}>
          <div className={styles.row}>
            <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large}>
              <PivotItem headerText="WebShop" itemIcon="Globe">
                <Label>
                  <h3 style={{ textAlign:'center'}}>Hitta reservdelar & tillbehör till din mobil</h3>
                  <hr />
                </Label>
                <div className={styles.tiles}>
                  {items} 
                </div>
              </PivotItem>
              <PivotItem itemIcon="ShoppingCart" itemCount={this.state.orderItems.length} >
                <Label>
                <h3 style={{ textAlign: 'center' }}>Hitta reservdelar & tillbehör till din mobil</h3>
                  <hr />
                </Label>
                <Orders listOrders={this.state.orderItems}
                  cancelOrder={this.CancelOrderHandler.bind(this)}
                  totalItems={this.state.orderItems.length}
                  checkout={this.ProceedToCheckout.bind(this)}/>
              </PivotItem>
            </Pivot>
          </div>
        </div>
      </div>
    );
  }
}
