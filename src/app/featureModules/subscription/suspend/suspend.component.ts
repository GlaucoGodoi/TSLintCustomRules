import { Component, OnInit } from '@angular/core';
import { UserLocalService } from '@featureModules/user/user-local.service';

@Component({
  selector: 'app-suspend',
  templateUrl: './suspend.component.html',
  styleUrls: ['./suspend.component.css']
})
export class SuspendComponent implements OnInit {

  constructor(private userLocal: UserLocalService) { }

  ngOnInit() {
  }

}
