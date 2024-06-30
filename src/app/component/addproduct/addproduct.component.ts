import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../_service/product.service';

import { product } from '../../_model/product.model';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent {
  _response: any;
  title = 'Add product';
  editcode = '';
  isedit = false;
  editdata!: product;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private service: ProductService,
    private act: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editcode = this.act.snapshot.paramMap.get('code') as string;
    if (this.editcode != '' && this.editcode != null) {
      this.isedit = true;
      this.title = 'Edit product';
      this._addproductform.controls['code'].disable();
      this._addproductform.controls['code'].setValidators(null);
      this.service.Getbycode(this.editcode).subscribe((item) => {
        this.editdata = item;
        this._addproductform.setValue({
          code: this.editdata.code,
          name: this.editdata.name,
          price: this.editdata.price,
          description: this.editdata.description,
        });
      });
    }
  }

  _addproductform = this.builder.group({
    code: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    price: this.builder.control(0, Validators.required),
    description: this.builder.control('', Validators.required),
  });

  proceedadd() {
    if (this._addproductform.valid) {
      let _obj: product = {
        code: this._addproductform.value.code as string,
        name: this._addproductform.value.name as string,
        price: this._addproductform.value.price as number,
        description: this._addproductform.value.description as string,
      };

      if (!this.isedit) {
        this.service.AddProduct(_obj).subscribe((item) => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/product');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        });
      } else {
        _obj.code = this.editcode;
        this.service.Updateproduct(_obj).subscribe((item) => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/product');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        });
      }
    }
  }
}

//   constructor(
//     private builder: FormBuilder,
//     private service: ProductService,
//     private _toast: ToastrService
//   ) {}

//   _response: any;

//   _addproductform = this.builder.group({
//     code: this.builder.control('', Validators.required),
//     name: this.builder.control('', Validators.required),
//     price: this.builder.control(0, Validators.required),
//     description: this.builder.control('', Validators.required),
//   });

//   proceedadd() {
//     debugger;
//     if (this._addproductform.valid) {
//       let _obj: product = {
//         code: this._addproductform.value.code as string,
//         name: this._addproductform.value.name as string,
//         price: this._addproductform.value.price as number,
//         description: this._addproductform.value.description as string,
//       };
//       this.service.AddProduct(_obj).subscribe((item) => {
//         this._response = item;
//         console.log(this._response);
//         if (this._response.result == 'pass') {
//           // this._snack.open('Product added successfully', 'Add Product', {
//           //   duration: 2000
//           // });
//           this._toast.success('Product added successfully', 'Add Product');
//         } else {
//           // this._snack.open('Failed due to : ' + this._response.message, 'Add Product', {
//           //   duration: 2000
//           // });
//           this._toast.error(
//             'Failed due to : ' + this._response.message,
//             'Add Product'
//           );
//         }
//       });
//     }
//   }
// }
