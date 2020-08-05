import { IPropertyBase } from './../app/model/ipropertybase';
import { Property } from './../app/model/property';
import { IProperty } from './../app/model/iproperty';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertyArray => {
        return propertyArray.find(p => p.Id === id);
      })
    )
  }

  getAllProperties(SellRent?: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const localProperties = JSON.parse(localStorage.getItem('newProp'));
        const propertiesArray: Array<IProperty> = [];

        if (localProperties) {
          for (const id in localProperties) {
            if (SellRent) {
              if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
                propertiesArray.push(localProperties[id]);
              }
            } else {
              propertiesArray.push(localProperties[id]);
            }
          }
        }

        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          } else {
            propertiesArray.push(data[id]);
          }
        }

        return propertiesArray;
      })
    );
  }

  addProperty(property: Property) {
    let newProp = [property];

    //add new property in arr if newProp alreay exits in local storage
    if (localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      return +localStorage.getItem('PID') + 1;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
