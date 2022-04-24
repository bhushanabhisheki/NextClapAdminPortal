import { Injectable } from '@angular/core';
import { image } from 'ngx-editor/schema/nodes';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getDisplayedImage(imageUrl: string, gender: string): string {
    let userImg: string = '../../../assets/profileimage/profile_male.png';

    if (imageUrl != null) userImg = 'http://localhost:4000' + imageUrl;
    else if (gender === 'Female')
      userImg = '../../../assets/profileimage/profile_female.png';
    return userImg;
  }
}
