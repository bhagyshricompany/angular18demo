import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { product } from '../_model/product.model';
import { menupermission } from '../_model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl;

  _addproducform = signal<product>({
    code: '',
    name: '',
    price: 0,
    description: '',
  });
  _productname = signal('');

  AddProduct(_data: product) {
    debugger;
    console.log(_data);
    return this.http.post(this.baseUrl + 'Product/addproduct', _data);
  }

  Getallproducts() {
    return this.http.get<product[]>(this.baseUrl + 'Product/getallproducts');
  }

  Getmenupermission(role: string, menuname: string) {
    return this.http.get<menupermission>(
      this.baseUrl +
        'UserRole/GetMenupermissionbyrole?userrole=' +
        role +
        '&menucode=' +
        menuname
    );
  }
  
  Getbycode(code:string) {
    return this.http.get<product>(this.baseUrl + 'Product/Getbycode?code='+code);
  }


  Updateproduct(_data: product) {
    debugger;
    return this.http.put(
      this.baseUrl + 'Product/Update?code=' + _data.code,
      _data
    );
  }
  Deleteproduct(code: string) {
    return this.http.delete(this.baseUrl + 'Product/Remove?code=' + code);
  }
  // EditProduct(_data: product) {
  //   return this.http.post(this.baseUrl + 'Product/Updateproduct', _data);
  // }

  // deleteProduct(_data: product) {
  //   return this.http.post(this.baseUrl + 'Product/Deleteproduct', _data);
  // }
}
