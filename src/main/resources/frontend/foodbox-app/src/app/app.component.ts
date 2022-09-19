import {Component, OnInit} from '@angular/core';
import {NotificationService} from "./notification/notification.service";
import {AccountService} from "./services/account.service";


@Component({
    selector: 'ks-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    pageTitle = 'Kitchen Story';

    activeTab = 'search';

    constructor(private accountService: AccountService) {
    }

    search(activeTab: string) {
        this.activeTab = activeTab;
    }

    result(activeTab: string) {
        this.activeTab = activeTab;
    }

    ngOnInit(): void {
    }
}
