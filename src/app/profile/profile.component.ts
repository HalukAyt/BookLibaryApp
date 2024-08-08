// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../components/login/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ProfileService } from '../profile.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements OnInit {
//   profileForm!: FormGroup;
//   isEditMode: boolean = false;
//   constructor(
//     private fb: FormBuilder,
//     private profileService: ProfileService, // ProfileService'i ekleyin
//     private snackBar: MatSnackBar,
//     private authService: AuthService
//   ) {}
//   avatarUrl: string = '' ;
//   userName: string = '';
//   fullName: string = '';
//   email: string = '';

//   ngOnInit(): void {
//     this.getUser();
    
//      this.profileForm = this.fb.group({
//       userName: [{value: 'john_doe', disabled: true}, Validators.required],
//       fullName: [{value: 'John Doe', disabled: true}, Validators.required],
//       email: [{value: 'john@example.com', disabled: true}, [Validators.required, Validators.email]],
//       password: [{value: '', disabled: true}, [Validators.required, Validators.minLength(8)]],
//       gender: [{value: 'male', disabled: true}, Validators.required]
//     });
//   }

//   getUser() {
//     this.authService.getById().subscribe({
//       next: (response) => {
    
//         this.userName = response.userName;
//         this.fullName = response.fullName;
//         this.email = response.email;
//         this.avatarUrl = response.avatarUrl;
        
//       },
//       error: (error) => {
//         console.log("Kullanıcı getirilemedi", error);
//       }
//     });
//   }


//   toggleEditMode() {
//     this.isEditMode = !this.isEditMode;
//     if (this.isEditMode) {
//       this.profileForm.enable();  // Tüm alanları düzenlenebilir hale getirir
//     } else {
//       this.profileForm.disable();  // Tüm alanları tekrar pasif hale getirir
//     }
//   }
//   saveProfile() {
//     if (this.profileForm.valid) {
//       const updatedProfile = this.profileForm.value;

//       this.profileService.updateProfile(updatedProfile).subscribe({
//         next: () => {
//           this.snackBar.open('Profil başarıyla güncellendi', 'Kapat', { duration: 3000 });
//           this.toggleEditMode();  // Düzenleme modunu kapatır
//         },
//         error: () => {
//           this.snackBar.open('Profil güncellenemedi', 'Kapat', { duration: 3000 });
//         }
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../components/login/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isEditMode: boolean = false;
  avatarUrl: string = '';
  userName: string = '';
  fullName: string = '';
  email: string = '';
  gender: string ="";
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.initializeForm();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      userName: [{ value: this.userName, disabled: true }, Validators.required],
      fullName: [{ value: this.fullName, disabled: true }, Validators.required],
      email: [{ value: this.email, disabled: true }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]],
      gender: [{ value: '', disabled: true }, Validators.required]
    });
  }

  getUser(): void {
    this.authService.getById().subscribe({
      next: (response) => {
        this.userName = response.userName;
        this.fullName = response.fullName;
        this.email = response.email;
        this.avatarUrl = response.avatarUrl;
        this.gender = response.gender;

        this.profileForm.patchValue({
          userName: this.userName,
          fullName: this.fullName,
          email: this.email,
          gender: this.gender // Cinsiyet bilgisini de set ediyoruz
        });
      },
      error: (error) => {
        console.error("Kullanıcı getirilemedi", error);
      }
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.profileForm.enable(); // Tüm alanları düzenlenebilir hale getirir
    } else {
      this.profileForm.disable(); // Tüm alanları tekrar pasif hale getirir
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.getRawValue(); // Formdaki tüm değerleri alır

      this.profileService.updateProfile(updatedProfile).subscribe({
        next: () => {
          this.snackBar.open('Profil başarıyla güncellendi', 'Kapat', { duration: 3000 });
          this.toggleEditMode(); // Düzenleme modunu kapatır
        },
        error: () => {
          this.snackBar.open('Profil güncellenemedi', 'Kapat', { duration: 3000 });
        }
      });
    }
  }
}
