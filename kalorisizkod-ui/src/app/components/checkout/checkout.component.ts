import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KalorisizKodFormService } from '../../services/kalorisiz-kod-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { KalorisizKodValidators } from '../../validators/kalorisiz-kod-validators';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  checkoutFormGroup: FormGroup | undefined;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  constructor(private formBuilder: FormBuilder, 
    private kalorisizKodFormService: KalorisizKodFormService,
    private cartService: CartService,
  private checkoutService: CheckoutService,
  private router: Router){}

  ngOnInit(){

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2), KalorisizKodValidators.notOnlyWhitespace]],
        lastName: ['', [Validators.required, Validators.minLength(2), KalorisizKodValidators.notOnlyWhitespace]],
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
      }),
      shippingAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(2), KalorisizKodValidators.notOnlyWhitespace]],
        city: ['', [Validators.required, Validators.minLength(2), KalorisizKodValidators.notOnlyWhitespace]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.minLength(2), KalorisizKodValidators.notOnlyWhitespace]],
      }),
      billingAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(2), KalorisizKodValidators.notOnlyWhitespace]],
        city: ['', [Validators.required, Validators.minLength(2), KalorisizKodValidators.notOnlyWhitespace]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.minLength(2), KalorisizKodValidators.notOnlyWhitespace]],
        }),
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: ['', [Validators.required, Validators.minLength(2), KalorisizKodValidators.notOnlyWhitespace]],
        cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
        securityCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth() + 1;

    this.kalorisizKodFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.kalorisizKodFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

    this.kalorisizKodFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  get firstName() { return this.checkoutFormGroup?.get('customer.firstName');}
  get lastName() { return this.checkoutFormGroup?.get('customer.lastName');}
  get email() { return this.checkoutFormGroup?.get('customer.email');}
  
  get shippingAddressStreet() { return this.checkoutFormGroup?.get('shippingAddress.street');}
  get shippingAddressCity() { return this.checkoutFormGroup?.get('shippingAddress.city');}
  get shippingAddressState() { return this.checkoutFormGroup?.get('shippingAddress.state');}
  get shippingAddressZipCode() { return this.checkoutFormGroup?.get('shippingAddress.zipCode');}
  get shippingAddressCountry() { return this.checkoutFormGroup?.get('shippingAddress.country');}

  get billingAddressStreet() { return this.checkoutFormGroup?.get('billingAddress.street');}
  get billingAddressCity() { return this.checkoutFormGroup?.get('billingAddress.city');}
  get billingAddressState() { return this.checkoutFormGroup?.get('billingAddress.state');}
  get billingAddressZipCode() { return this.checkoutFormGroup?.get('billingAddress.zipCode');}
  get billingAddressCountry() { return this.checkoutFormGroup?.get('billingAddress.country');}

  get creditCardType() { return this.checkoutFormGroup?.get('creditCard.cardType');}
  get creditCardNameOnCard() { return this.checkoutFormGroup?.get('creditCard.nameOnCard');}
  get creditCardNumber() { return this.checkoutFormGroup?.get('creditCard.cardNumber');}
  get creditCardSecurityCode() { return this.checkoutFormGroup?.get('creditCard.securityCode');}

  reviewCartDetails(){
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }
  onSubmit() {
    console.log("Butona basildi");

    if(this.checkoutFormGroup?.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    let purchase = new Purchase();

    purchase.customer = this.checkoutFormGroup?.controls['customer'].value;

    purchase.shippingAddress = this.checkoutFormGroup?.controls['shippingAddress'].value;

    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));

    if(purchase.shippingAddress){
      purchase.shippingAddress.state = shippingState.name;
      purchase.shippingAddress.country = shippingCountry.name;
    }

    purchase.billingAddress = this.checkoutFormGroup?.controls['billingAddress'].value;

    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress?.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress?.country));

    if(purchase.billingAddress){
      purchase.billingAddress.state = billingState.name;
      purchase.billingAddress.country = billingCountry.name;
    }

    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          alert(`Siparişiniz alınmıştır.\nSipariş takip numarası: ${response.orderTrackingNumber}`);
        
          this.resetCart();
        },
        error: err => {
          alert(`Bir hata mevcut: ${err.message}`);
        }
    })
    console.log(this.checkoutFormGroup?.get('customer')?.value);
  }

  resetCart(){
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup?.reset();

    this.router.navigateByUrl("/products");
  }

  copyShippingAddressToBillingAddress(event: any){

    if(event.target.checked){
      this.checkoutFormGroup?.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup?.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {

    const creditCardFormGrup = this.checkoutFormGroup?.get('creditCard');

    const currentYear: number = new Date().getFullYear();

    const selectedYear: number = Number(creditCardFormGrup?.value.expirationYear);

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.kalorisizKodFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }

  getStates(formGroupName: string){

    const formGrup = this.checkoutFormGroup?.get(formGroupName);


    if(formGrup){
      
    const countryCode = formGrup.value.country.code;
    const countryName = formGrup.value.country.name;

    this.kalorisizKodFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else {
          this.billingAddressStates = data;
        }
        formGrup.get('state')?.setValue(data[0]);
      }
    );
  }
  }

}
