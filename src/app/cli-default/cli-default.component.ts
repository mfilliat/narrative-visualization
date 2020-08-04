import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-default',
  templateUrl: './cli-default.component.html',
  styleUrls: ['./cli-default.component.scss']
})
export class CliDefaultComponent implements OnInit {

  title = 'narrative-visualization';

  constructor() { }

  ngOnInit(): void {
  }

}
