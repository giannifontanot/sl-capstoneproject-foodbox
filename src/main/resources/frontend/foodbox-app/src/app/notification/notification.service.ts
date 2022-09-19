import {Injectable} from '@angular/core';
import {NotificationMessage, NotificationType} from './notification.message';
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";

@Injectable({

    providedIn: 'root'
})
export class NotificationService {

    notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

    constructor(private toastrService: ToastrService) {


        this.notificationSubject.subscribe(message => {
                switch (message.type) {
                    case NotificationType.success:
                        this.toastrService.success(message.text);
                        break;
                    case NotificationType.error:
                        this.toastrService.error(message.text);
                        break;
                    case NotificationType.warning:
                        this.toastrService.warning(message.text);
                        break;
                    case NotificationType.info:
                        this.toastrService.info(message.text);
                        break;
                }
            }
        );


    }

    sendMessage(message: NotificationMessage): void {
        this.notificationSubject.next(message);


    }
}
