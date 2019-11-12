import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { IAppState } from 'src/app/store/app.store';
import { getCartTotalPrice } from 'src/app/store/selectors/cart.selector';
import { ConfirmOrder } from 'src/app/store/actions/cart.actions';

declare let paypal: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.html',
  styleUrls: ['./paypal-checkout.scss']
})

export class PaypalCheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  constructor(private store: Store<IAppState>) { }

  public cartTotalPriceSub: Subscription;
  public totalPrice: number;

  public ngOnInit(): void {
    this.cartTotalPriceSub = this.store.select(getCartTotalPrice)
      .subscribe(price => this.totalPrice = price);

    paypal
      .Buttons({
        style: {
          layout: 'horizontal'
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.totalPrice
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          this.store.dispatch(new ConfirmOrder());
          alert('Payment successful!');
          // TODO: Add toastr notification
        },
        onError: err => {
          alert('Something went wrong, please try again');
          // TODO: Add toastr notification
        }
      })
      .render(this.paypalElement.nativeElement);
  }

  public ngOnDestroy(): void { }
}

