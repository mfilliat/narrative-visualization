import { Component, OnInit } from '@angular/core';
import { parse } from 'papaparse';
import * as d3 from 'd3';

import { DataStrings } from '../interfaces/DataStrings';
import { Data } from '../interfaces/Data';
import { GoodData } from '../interfaces/GoodData';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-interactive-slideshow-vertical',
  templateUrl: './interactive-slideshow-vertical.component.html',
  styleUrls: ['./interactive-slideshow-vertical.component.scss']
})
export class InteractiveSlideshowVerticalComponent implements OnInit {

  parseOptions = {
    header: true
  };

  nyResults = { data: []};
  nyBadData: Data[];
  nyData: GoodData[] = [];
  nyWeekData: GoodData[];
  nyCurrWeek: number;
  nyChartData: number [];
  nyCurrChartData: number [];
  nyChartDate: string;
  nyChartInfo: string;

  caResults = { data: []};
  caBadData: Data[];
  caData: GoodData[] = [];
  caWeekData: GoodData[];
  caCurrWeek: number;
  caChartData: number [];
  caCurrChartData: number [];
  caChartDate: string;
  caChartInfo: string;

  txResults = { data: []};
  txBadData: Data[];
  txData: GoodData[] = [];
  txWeekData: GoodData[];
  txCurrWeek: number;
  txChartData: number [];
  txCurrChartData: number [];
  txChartDate: string;
  txChartInfo: string;

  flResults = { data: []};
  flBadData: Data[];
  flData: GoodData[] = [];
  flWeekData: GoodData[];
  flCurrWeek: number;
  flChartData: number [];
  flCurrChartData: number [];
  flChartDate: string;
  flChartInfo: string;

  ilResults = { data: []};
  ilBadData: Data[];
  ilData: GoodData[] = [];
  ilWeekData: GoodData[];
  ilCurrWeek: number;
  ilChartData: number [];
  ilCurrChartData: number [];
  ilChartDate: string;
  ilChartInfo: string;

  wiResults = { data: []};
  wiBadData: Data[];
  wiData: GoodData[] = [];
  wiWeekData: GoodData[];
  wiCurrWeek: number;
  wiChartData: number [];
  wiCurrChartData: number [];
  wiChartDate: string;
  wiChartInfo: string;

  HOSPITALIZATIONS_DIVIDER = 7;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string): void {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

  ngOnInit(): void {

    // d3.select('#svgOne').append('rect') // make a matching color rect
    //   .attr('width', 3)
    //   .attr('height', 3)
    //   .attr('fill', '#ffff00');
    //
    // d3.select('#svgTwo').append('rect')
    //   .attr('width', 3)
    //   .attr('height', 3)
    //   .attr('fill', '#ff0000');

    const dataStrings = new DataStrings();

    this.nyResults = parse(dataStrings.newYorkDataString, this.parseOptions);
    this.nyBadData = this.nyResults.data;
    this.nyData = this.convertToGoodData(this.nyBadData);
    this.nyWeekData = this.calculateAllWeeks(this.nyData);
    // tslint:disable-next-line:max-line-length
    this.nyChartData = [this.nyWeekData[0].cases, Math.floor(this.nyWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.nyWeekData[0].deaths];
    this.nyChartDate = this.nyWeekData[0].date;
    // tslint:disable-next-line:max-line-length
    this.nyCurrChartData = [this.nyWeekData[0].cases, Math.floor(this.nyWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.nyWeekData[0].deaths];

    this.caResults = parse(dataStrings.califDataString, this.parseOptions);
    this.caBadData = this.caResults.data;
    this.caData = this.convertToGoodData(this.caBadData);
    this.caWeekData = this.calculateAllWeeks(this.caData);
    // tslint:disable-next-line:max-line-length
    this.caChartData = [this.caWeekData[0].cases, Math.floor(this.caWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.caWeekData[0].deaths];
    this.caChartDate = this.caWeekData[0].date;
    // tslint:disable-next-line:max-line-length
    this.caCurrChartData = [this.caWeekData[0].cases, Math.floor(this.caWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.caWeekData[0].deaths];

    this.flResults = parse(dataStrings.floridaDataString, this.parseOptions);
    this.flBadData = this.flResults.data;
    this.flData = this.convertToGoodData(this.flBadData);
    this.flWeekData = this.calculateAllWeeks(this.flData);
    // tslint:disable-next-line:max-line-length
    this.flChartData = [this.flWeekData[0].cases, Math.floor(this.flWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.flWeekData[0].deaths];
    this.flChartDate = this.flWeekData[0].date;
    // tslint:disable-next-line:max-line-length
    this.flCurrChartData = [this.flWeekData[0].cases, Math.floor(this.flWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.flWeekData[0].deaths];

    this.txResults = parse(dataStrings.texasDataString, this.parseOptions);
    this.txBadData = this.txResults.data;
    this.txData = this.convertToGoodData(this.txBadData);
    this.txWeekData = this.calculateAllWeeks(this.txData);
    // tslint:disable-next-line:max-line-length
    this.txChartData = [this.txWeekData[0].cases, Math.floor(this.txWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.txWeekData[0].deaths];
    this.txChartDate = this.txWeekData[0].date;
    // tslint:disable-next-line:max-line-length
    this.txCurrChartData = [this.txWeekData[0].cases, Math.floor(this.txWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.txWeekData[0].deaths];

    this.ilResults = parse(dataStrings.ilDataString, this.parseOptions);
    this.ilBadData = this.ilResults.data;
    console.log(this.ilBadData);
    this.ilData = this.convertToGoodData(this.ilBadData);
    this.ilWeekData = this.calculateAllWeeks(this.ilData);
    // tslint:disable-next-line:max-line-length
    this.ilChartData = [this.ilWeekData[0].cases, Math.floor(this.ilWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.ilWeekData[0].deaths];
    this.ilChartDate = this.ilWeekData[0].date;
    // tslint:disable-next-line:max-line-length
    this.ilCurrChartData = [this.ilWeekData[0].cases, Math.floor(this.ilWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.ilWeekData[0].deaths];

    this.wiResults = parse(dataStrings.wiDataString, this.parseOptions);
    this.wiBadData = this.wiResults.data;
    console.log(this.wiBadData);
    this.wiData = this.convertToGoodData(this.wiBadData);
    this.wiWeekData = this.calculateAllWeeks(this.wiData);
    // tslint:disable-next-line:max-line-length
    this.wiChartData = [this.wiWeekData[0].cases, Math.floor(this.wiWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.wiWeekData[0].deaths];
    this.wiChartDate = this.wiWeekData[0].date;
    // tslint:disable-next-line:max-line-length
    this.wiCurrChartData = [this.wiWeekData[0].cases, Math.floor(this.wiWeekData[0].cases / this.HOSPITALIZATIONS_DIVIDER), this.wiWeekData[0].deaths];


    console.log(this.nyData);
    console.log(this.caData);
    console.log(this.nyWeekData);
    console.log(this.caWeekData);
    console.log(this.flData);
    console.log(this.txData);
    console.log(this.flWeekData);
    console.log(this.txWeekData);
    console.log(this.ilData);
    console.log(this.wiData);
    console.log(this.ilWeekData);
    console.log(this.wiWeekData);
  }

  private convertToGoodData(data: Data[]): GoodData [] {
    const returnData: GoodData [] = [];
    data.forEach((value, index) => {
      const goodRow: GoodData = {date: undefined, deaths: undefined, cases: undefined, fips: undefined, state: undefined};

      if (index === 0)
      {
        if (value.date !== undefined && value.cases !== undefined && value.deaths !== undefined) {
          const splitDate: string [] = value.date.split('/');
          goodRow.date = splitDate[0] + '/' + splitDate[1];
          // tslint:disable-next-line:radix
          goodRow.cases = parseInt(value.cases);
          // tslint:disable-next-line:radix
          goodRow.deaths = parseInt(value.deaths);
        }

      } else {
        if (value.date !== undefined && value.cases !== undefined && value.deaths !== undefined) {
          const splitDate: string [] = value.date.split('/');
          goodRow.date = splitDate[0] + '/' + splitDate[1];
          // tslint:disable-next-line:radix
          goodRow.cases = parseInt(value.cases) - parseInt(data[index - 1].cases);
          // tslint:disable-next-line:radix
          goodRow.deaths = parseInt(value.deaths) - parseInt(data[index - 1].deaths);
        }
      }

      returnData.push(goodRow);
    });
    // for (const row of data) {
    //   const goodRow: GoodData = {date: undefined, deaths: undefined, cases: undefined, fips: undefined, state: undefined};
    //   goodRow.date = row.date;
    //   // tslint:disable-next-line:radix
    //   goodRow.cases = parseInt(row.cases);
    //   // tslint:disable-next-line:radix
    //   goodRow.deaths = parseInt(row.deaths);
    //
    //   returnData.push(goodRow);
    // }

    return returnData;
  }

  private calculateAllWeeks(data: GoodData[]): GoodData [] {
    const allWeeks: GoodData [] = [];
    for (let j = 0; j < (data.length / 7) - 1; j++) {
      const currWeek: GoodData[] = [];
      for (let i = 0; i <= 6; i++)
      {
        currWeek.push(data[(j * 7) + i]);
      }

      allWeeks.push(this.calculateWeekData(currWeek));
    }

    return allWeeks;
  }

  private calculateWeekData(data: GoodData[]): GoodData {
    let count = 0;

    const currWeek: GoodData = {date: undefined, deaths: undefined, cases: undefined, fips: undefined, state: undefined};

    currWeek.date = data[0].date;
    currWeek.cases = data[0].cases;
    currWeek.deaths = data[0].deaths;

    count++;

    while (count <= 5) {
      currWeek.cases = currWeek.cases + data[count].cases;
      currWeek.deaths = currWeek.deaths + data[count].deaths;

      count++;
    }

    currWeek.cases = currWeek.cases + data[count].cases;
    currWeek.deaths = currWeek.deaths + data[count].deaths;
    currWeek.date += ' - ' + data[count].date;

    return currWeek;
  }

  califSetInterval(timeout: number, message: string): void {
    const interval = setInterval(() => {
      this.caCurrWeek  = this.caCurrWeek  + 1;
      this.caChartDate = this.caWeekData[this.caCurrWeek].date;
      this.caChartData =
        [this.caChartData[0] + this.caWeekData[this.caCurrWeek].cases,
          this.caChartData[1] + Math.floor(this.caWeekData[this.caCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.caChartData[2] + this.caWeekData[this.caCurrWeek].deaths];
      this.caCurrChartData =
        [this.caWeekData[this.caCurrWeek].cases,
          Math.floor(this.caWeekData[this.caCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.caWeekData[this.caCurrWeek].deaths];

    }, 2000);

    // after 8 seconds stop
    setTimeout(() => {
      this.caChartInfo = message;
      clearInterval(interval);
    }, timeout);
  }

  califStart(): void {
    if (this.caCurrWeek) {
      return;
    }

    this.caCurrWeek = 0;
    this.califSetInterval(14000, 'A statewide safer-at-home order went into effect March 19th.');
  }

  califContinue(): void {
    console.log('ca continue ' + this.caCurrWeek);
    this.caChartInfo = undefined;
    if (this.caCurrWeek < 8) {
      this.califSetInterval(14000, 'The safer-at-home order remained in full effect until May 4th.');
    } else {
      this.califSetInterval(24000, undefined);
    }
  }

  nySetInterval(timeout: number, message: string): void {
    const interval = setInterval(() => {
      this.nyCurrWeek  = this.nyCurrWeek  + 1;
      this.nyChartDate = this.nyWeekData[this.nyCurrWeek].date;
      this.nyChartData =
        [this.nyChartData[0] + this.nyWeekData[this.nyCurrWeek].cases,
          this.nyChartData[1] + Math.floor(this.nyWeekData[this.nyCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.nyChartData[2] + this.nyWeekData[this.nyCurrWeek].deaths];
      this.nyCurrChartData =
        [this.nyWeekData[this.nyCurrWeek].cases,
          Math.floor(this.nyWeekData[this.nyCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.nyWeekData[this.nyCurrWeek].deaths];

    }, 2000);

    // after 8 seconds stop
    setTimeout(() => {
      this.nyChartInfo = message;
      clearInterval(interval);
    }, timeout);
  }

  nyStart(): void {
    if (this.nyCurrWeek) {
      return;
    }

    this.nyCurrWeek = 0;
    this.nySetInterval(6000, 'A statewide safer-at-home order went into effect March 22nd.');
  }

  nyContinue(): void {
    console.log('ny continue ' + this.nyCurrWeek);
    this.nyChartInfo = undefined;
    if (this.nyCurrWeek < 5) {
      this.nySetInterval(14000, 'The safer-at-home order remained in full effect until May 15th.');
    } else {
      this.nySetInterval(24000, undefined);
    }
  }

  txSetInterval(timeout: number, message: string): void {
    const interval = setInterval(() => {
      this.txCurrWeek  = this.txCurrWeek  + 1;
      this.txChartDate = this.txWeekData[this.txCurrWeek].date;
      this.txChartData =
        [this.txChartData[0] + this.txWeekData[this.txCurrWeek].cases,
          this.txChartData[1] + Math.floor(this.txWeekData[this.txCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.txChartData[2] + this.txWeekData[this.txCurrWeek].deaths];
      this.txCurrChartData =
        [this.txWeekData[this.txCurrWeek].cases,
          Math.floor(this.txWeekData[this.txCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.txWeekData[this.txCurrWeek].deaths];

    }, 2000);

    // after 8 seconds stop
    setTimeout(() => {
      this.txChartInfo = message;
      clearInterval(interval);
    }, timeout);
  }

  txStart(): void {
    if (this.txCurrWeek) {
      return;
    }

    this.txCurrWeek = 0;
    this.txSetInterval(12000, 'A statewide safer-at-home order went into effect March 26th.');
  }

  txContinue(): void {
    console.log('tx continue ' + this.txCurrWeek);
    this.txChartInfo = undefined;
    if (this.txCurrWeek < 8) {
      this.txSetInterval(10000, 'The safer-at-home order remained in full effect until May 1st.');
    } else {
      this.txSetInterval(24000, undefined);
    }
  }

  flSetInterval(timeout: number, message: string): void {
    const interval = setInterval(() => {
      this.flCurrWeek  = this.flCurrWeek  + 1;
      this.flChartDate = this.flWeekData[this.flCurrWeek].date;
      this.flChartData =
        [this.flChartData[0] + this.flWeekData[this.flCurrWeek].cases,
          this.flChartData[1] + Math.floor(this.flWeekData[this.flCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.flChartData[2] + this.flWeekData[this.flCurrWeek].deaths];
      this.flCurrChartData =
        [this.flWeekData[this.flCurrWeek].cases,
          Math.floor(this.flWeekData[this.flCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.flWeekData[this.flCurrWeek].deaths];

    }, 2000);

    // after 8 seconds stop
    setTimeout(() => {
      this.flChartInfo = message;
      clearInterval(interval);
    }, timeout);
  }

  flStart(): void {
    if (this.flCurrWeek) {
      return;
    }

    this.flCurrWeek = 0;
    this.flSetInterval(8000, 'A statewide safer-at-home order went into effect April 1st.');
  }

  flContinue(): void {
    console.log('fl continue ' + this.flCurrWeek);
    this.flChartInfo = undefined;
    if (this.flCurrWeek < 8) {
      this.flSetInterval(8000, 'The safer-at-home order remained in full effect until May 1st.');
    } else {
      this.flSetInterval(26000, undefined);
    }
  }

  ilSetInterval(timeout: number, message: string): void {
    const interval = setInterval(() => {
      this.ilCurrWeek  = this.ilCurrWeek  + 1;
      this.ilChartDate = this.ilWeekData[this.ilCurrWeek].date;
      this.ilChartData =
        [this.ilChartData[0] + this.ilWeekData[this.ilCurrWeek].cases,
          this.ilChartData[1] + Math.floor(this.ilWeekData[this.ilCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.ilChartData[2] + this.ilWeekData[this.ilCurrWeek].deaths];
      if (this.ilWeekData[this.ilCurrWeek].cases > 0) {
        this.ilCurrChartData =
          [this.ilWeekData[this.ilCurrWeek].cases,
            Math.floor(this.ilWeekData[this.ilCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
            this.ilWeekData[this.ilCurrWeek].deaths];
      }
    }, 2000);

    // after 8 seconds stop
    setTimeout(() => {
      this.ilChartInfo = message;
      clearInterval(interval);
    }, timeout);
  }

  ilStart(): void {
    if (this.ilCurrWeek) {
      return;
    }

    this.ilCurrWeek = 0;
    this.ilSetInterval(16000, 'A statewide safer-at-home order went into effect March 21st.');
  }

  ilContinue(): void {
    console.log('il continue ' + this.ilCurrWeek);
    this.ilChartInfo = undefined;
    if (this.ilCurrWeek < 9) {
      this.ilSetInterval(20000, 'The safer-at-home order remained in full effect until May 29th.');
    } else {
      this.ilSetInterval(26000, undefined);
    }
  }

  wiSetInterval(timeout: number, message: string): void {
    const interval = setInterval(() => {
      this.wiCurrWeek  = this.wiCurrWeek  + 1;
      this.wiChartDate = this.wiWeekData[this.wiCurrWeek].date;
      this.wiChartData =
        [this.wiChartData[0] + this.wiWeekData[this.wiCurrWeek].cases,
          this.wiChartData[1] + Math.floor(this.wiWeekData[this.wiCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
          this.wiChartData[2] + this.wiWeekData[this.wiCurrWeek].deaths];
      if (this.wiWeekData[this.wiCurrWeek].cases > 0) {
        this.wiCurrChartData =
          [this.wiWeekData[this.wiCurrWeek].cases,
            Math.floor(this.wiWeekData[this.wiCurrWeek].cases / this.HOSPITALIZATIONS_DIVIDER),
            this.wiWeekData[this.wiCurrWeek].deaths];
      }

    }, 2000);

    // after 8 seconds stop
    setTimeout(() => {
      this.wiChartInfo = message;
      clearInterval(interval);
    }, timeout);
  }

  wiStart(): void {
    if (this.wiCurrWeek) {
      return;
    }

    this.wiCurrWeek = 0;
    this.wiSetInterval(12000, 'A statewide safer-at-home order went into effect March 23rd.');
  }

  wiContinue(): void {
    console.log('wi continue ' + this.wiCurrWeek);
    this.wiChartInfo = undefined;
    if (this.wiCurrWeek < 8) {
      this.wiSetInterval(6000, 'On May 13th, the Wisconsin Supreme Court struck down Governor Evers \'Safer-At-Home\' orders as unconstitutional.');
    } else {
      this.wiSetInterval(32000, undefined);
    }
  }
}
