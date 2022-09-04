import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
    selector: 'ks-change',
    templateUrl: './change.component.html',
    styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

    loginGroup = this.formBuilder.group({
        idx: '1',
        usernamex: 'admin',
        oldPassword: 'admin',
        newPassword: '',
        newPassword2: ''
    })


    constructor(private formBuilder: UntypedFormBuilder,
                private loginService: LoginService,
                private router: Router) {
    }

    ngOnInit(): void {
    }


    onSubmit(): void {

        if (this.loginGroup.value.newPassword !== this.loginGroup.value.newPassword2) {
            alert("New Password does not match. Please try again.")
        } else {
            this.loginService.changePassword(this.loginGroup.value).subscribe({
                next: (data: any) => {
                    const parsed = JSON.parse(JSON.stringify(data))
                    let retVal = parsed.return
                    console.log(">>> " + retVal)
                    if (retVal === ("OK")) {
                        alert("Password successfully changed")
                        this.router.navigate(["/inventory"])
                    }
                },
                error: err => {
                    console.error(">>> " + err)
                    alert("error: >>>" + err);
                }
            })
        }
    }
}
