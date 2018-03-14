import { Component, OnInit } from '@angular/core';
import { UserHandlerService } from '@coreServices/user-handler.service';
import { UserLocalService } from '@featureModules/user/user-local.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserHandlerService, private userLocalService: UserLocalService) { }

  ngOnInit() {
  }

}
