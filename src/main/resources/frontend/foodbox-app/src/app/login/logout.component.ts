import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ks-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //wait 3 sec
  setTimeout(() => {
      window.location.href="http://foodbox.s3.us-west-2.amazonaws.com/index.html";
    }, 1000);
  }

}
