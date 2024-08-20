import React, { Component } from 'react';
import styles from './Child.module.css';

export default class Child extends Component {
  handleRemove = () => {
    this.props.removeProduct(this.props.iphone.id);
  }

  handleIncrement = () => {
    this.props.incrementCount(this.props.iphone.id);
  }

  handleDecrement = () => {
    this.props.decrementCount(this.props.iphone.id);
  }

  render() {
    const { iphone } = this.props;
    return (
      <div className={`card ${styles.childCard} m-3`}>
        {iphone.onSale && <span className="badge bg-success">On Sale</span>}
        <img src={iphone.imageUrl} className="card-img-top" alt={iphone.model} />
        <div className="card-body">
          <h5 className="card-title">{iphone.model}</h5>
          <p className="card-text">Price: ${iphone.price}</p>
          <p className="card-text">Count: {iphone.count}</p>
          <button className="btn btn-danger" onClick={this.handleRemove}>Remove</button>
          <button className="btn btn-primary ms-2" onClick={this.handleIncrement}>+</button>
          <button className="btn btn-warning ms-2" onClick={this.handleDecrement}>-</button>
        </div>
      </div>
    );
  }
}
