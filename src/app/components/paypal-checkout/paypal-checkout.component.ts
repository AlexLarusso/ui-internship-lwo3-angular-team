import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare let paypal;

@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.html',
  styleUrls: ['./paypal-checkout.scss']
})

export class PaypalCheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  product = {
    price: 777.77
  };

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}
