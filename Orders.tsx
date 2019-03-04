import * as React from 'react';
import styles from './Orders.module.scss';
import { IOrders } from '../IWebShopOnlineProps';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface IOrderState {
    listOrders: IOrders[];
    showRegisterOrder: boolean;
    orderSavedmodal: boolean;
    Title: string;
    User: string;
    Date: string;
}

export interface IOrderProps {
    listOrders: IOrders[];
    cancelOrder: (index: number, e) => void;
    checkout: (title: string, user: string, date: string) => void;
    totalItems: number;
}

export default class Orders extends React.Component<IOrderProps, IOrderState> {
    constructor(props: IOrderProps) {
        super(props);
        this.state = {
            listOrders: this.props.listOrders,
            showRegisterOrder: false,
            Title: 'Order',
            User: '9',
            Date: new Date().toISOString(),
            orderSavedmodal: false
        };
        // this.CancelOrderClicked = this.CancelOrderClicked.bind(this);
        this.RegisterOrder = this.RegisterOrder.bind(this);
        this.modalClosed = this.modalClosed.bind(this);
        this.SaveRegisteredOrder = this.SaveRegisteredOrder.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this._validateNumber = this._validateNumber.bind(this);
    }

    private RegisterOrder() {
        this.setState({ showRegisterOrder: !this.state.showRegisterOrder });
    }
    private modalClosed() {
        this.setState({ showRegisterOrder: !this.state.showRegisterOrder });
    }

    private SaveRegisteredOrder() {
        this.setState({ showRegisterOrder: !this.state.showRegisterOrder });
        this.props.checkout(this.state.Title, this.state.User, this.state.Date);
        this.setState({ orderSavedmodal: true });

        setTimeout(() => {
            this.setState({ orderSavedmodal: false });
        }, 2000);
    }

    private onChangeTitle(e) {
        return this.setState({ Title: e });
    }

    private onChangeUser(e) {
        return this.setState({ User: e });
    }

    private _validateNumber(User: string): string {
        return isNaN(Number(User)) ? `The value should be a number, actual is ${User}.` : '';
    }


    public render(): React.ReactElement<IOrderProps> {
        let ids = new Date().toJSON;
        let orders = [];
        orders = this.props.listOrders.map((item, index) => {
            return (
                <div className={styles.OrderItem} key={item.Key + ids + item.Id}>
                    <button className={styles.CancelOrder} onClick={this.props.cancelOrder.bind(this, index)}>Remove</button>
                    <li className={styles.Card} >
                        <div className={styles.CardItem}>
                            <img
                                className={styles.CardImage} src={item.ImageUrl}
                                alt="Pic" />
                        </div>
                        <div className={styles.CardItem}>
                            <div className={styles.CardInfo}>
                                <h3>{item.Title}</h3>
                                <p>{item.Price} kr</p>
                            </div>
                        </div>
                    </li>
                </div>
            );
        });

        return (
            <div className={styles.Orders}>
                {this.state.orderSavedmodal ?
                    <div>
                        <div className={styles.Backdrop}></div>
                        <div className={styles.Modal}>
                            <h3>Thank you for shopping with us!</h3>
                            <h4>We hope that you like them!</h4>
                        </div>
                    </div> : null
                }
                {this.state.showRegisterOrder ?
                    <div>
                        <div className={styles.Backdrop} onClick={this.modalClosed.bind(this)}></div>
                        <div className={styles.Modal}>
                            <h3>Register an Order</h3>
                            <form className={styles.addForm}>
                                <TextField
                                    label="Title"
                                    name="Title"
                                    autoComplete="on"
                                    value={this.state.Title}
                                    onChanged={this.onChangeTitle}
                                /><br />
                                <TextField
                                    label="User"
                                    name="User"
                                    autoComplete="on"
                                    value={this.state.User}
                                    onChanged={this.onChangeUser}
                                    onGetErrorMessage={this._validateNumber}
                                />
                            </form>
                            <div className={styles.AddItemButton}>
                                <button onClick={this.modalClosed}>Cancel</button>
                                <button onClick={this.SaveRegisteredOrder}>Submit</button>
                            </div>
                        </div>
                    </div> : null}
                <ul className={styles.Cards}>
                    {orders}
                </ul>
                {this.props.totalItems >= 1 ?
                    <div className={styles.OrderButtons}>
                        <button onClick={this.RegisterOrder}>Proceed to Checkout</button>
                    </div> :
                    <div className={styles.EmptyOrder} >
                        Basket is Empty! Please add an order on the main menu.
                    </div>
                }
            </div>
        );
    }
}
