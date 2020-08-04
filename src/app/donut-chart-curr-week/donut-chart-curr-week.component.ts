import { Component, OnInit, ElementRef, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';

import * as d3 from 'd3';

export class DonutChartDatum {
    code: string;
    displayValue: string;
    count: number;
}


@Component({
    selector: 'donut-chart-curr',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './donut-chart-curr-week.component.html',
    styleUrls: ['./donut-chart-curr-week.component.scss']
})
export class DonutChartCurrWeekComponent implements OnInit, OnChanges {

    @Input() data: number[];
    hostElement; // Native element hosting the SVG container
    svg; // Top level SVG element
    g; // SVG Group element
    arc; // D3 Arc generator
    innerRadius; // Inner radius of donut chart
    radius; // Outer radius of donut chart
    slices; // Donut chart slice elements
    labels; // SVG data label elements
    totalLabel; // SVG label for total
    rawData; // Raw chart values array
    total: number; // Total of chart values
    colorScale; // D3 color provider
    pieData: any; // Arc segment parameters for current data set
    pieDataPrevious: any; // Arc segment parameters for previous data set - used for transitions
    colors = d3.scaleOrdinal(d3.schemeCategory10);

    // Pie function - transforms raw data to arc segment parameters
    pie = d3.pie()
        .startAngle(-0.5 * Math.PI)
        .endAngle(0.5 * Math.PI)
        .sort(null)
        .value((d: number) => d);

    constructor(private elRef: ElementRef) {
        this.hostElement = this.elRef.nativeElement;
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data) {
            this.createChart(changes.data.currentValue);
        }
    }

    private createChart(data: number[]) {

        this.processPieData(data);

        this.removeExistingChartFromParent();

        this.setChartDimensions();

        this.setColorScale();

        this.addGraphicsElement();

        this.setupArcGenerator();

        this.addSlicesToTheDonut();

        this.addLabelsToTheDonut();

        this.addDonutTotalLabel();

        this.addTitle();
    }


    private setChartDimensions() {
        const viewBoxHeight = 120;
        const viewBoxWidth = 200;
        this.svg = d3.select(this.hostElement).append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
    }

    private addGraphicsElement() {
        this.g = this.svg.append('g')
            .attr('transform', 'translate(100,100)');
    }

    private setColorScale() {
        // this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        this.colorScale = d3.scaleOrdinal().domain(['0', '1']).range(['#ffff00', '#ff0000']);
        // Below is an example of using custom colors
        // this.colorScale = d3.scaleOrdinal().domain([0,1,2,3]).range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']);
    }

    private processPieData(data, initial = true) {
        this.rawData = [data[1], data[2]];
        this.total = data[0];

        this.pieData = this.pie(this.rawData);
        if (initial) {
            this.pieDataPrevious = this.pieData;
        }
    }


    private setupArcGenerator() {
        this.innerRadius = 50;
        this.radius = 80;
        this.arc = d3.arc()
            .innerRadius(this.innerRadius)
            .outerRadius(this.radius);
    }

    private addSlicesToTheDonut() {
        this.slices = this.g.selectAll('allSlices')
            .data(this.pieData)
            .enter()
            .append('path')
            .attr('d', this.arc)
            .attr('fill', (datum, index) => {
                return this.colorScale(`${index}`);
            })
            .style('opacity', 1);
    }

    private addDonutTotalLabel() {
        this.totalLabel = this.svg
            .append('text')
            .text('Cases: ' + this.numberWithCommas(this.total))
            .attr('id', 'total')
            .attr('x', 100)
            .attr('y', 80)
            .style('font-size', '10px')
            .style('text-anchor', 'middle');
    }

    private addTitle() {
      this.svg
        .append('text')
        .text('Current Week')
        .attr('id', 'title')
        .attr('x', 100)
        .attr('y', 12)
        .style('font-size', '8px')
        .style('text-anchor', 'middle');
    }

    private addLegend() {
      const legendG = this.svg.selectAll('.legend') // note appending it to mySvg and not svg to make positioning easier
        .data(['Hospitalizations', 'Deaths'])
        .enter().append('g')
        .attr('transform', (d, i) => {
          return 'translate(' + (10) + ',' + (i * 10) + ')'; // place each legend on the right and bump each one down 15 pixels
        })
        .attr('class', 'legend');

      legendG.append('rect') // make a matching color rect
        .attr('width', 3)
        .attr('height', 3)
        .attr('fill', (d, i) => {
          return this.colorScale(i);
        });

      legendG.append('text') // add the text
        .text(function(d){
          return d;
        })
        .style('font-size', 4)
        .attr('y', 3)
        .attr('x', 5);
    }

    // Creates an "interpolator" for animated transition for arc slices
    //   given previous and new arc shapes,
    //   generates a series of arc shapes (be)tween start and end state
    arcTween = (datum, index) => {
        const interpolation = d3.interpolate(this.pieDataPrevious[index], datum);
        this.pieDataPrevious[index] = interpolation(0);
        return (t) => {
            return this.arc(interpolation(t));
        };
    }

    // Creates an "interpolator" for animated transition for arc labels
    //   given previous and new label positions,
    //   generates a series of arc states (be)tween start and end state
    labelTween = (datum, index) => {
        const interpolation = d3.interpolate(this.pieDataPrevious[index], datum);
        this.pieDataPrevious[index] = interpolation(0);
        return (t) => {
            return 'translate(' + this.arc.centroid(interpolation(t)) + ')';
        };
    }

    public updateChart(data: number[]) {
        if (!this.svg) {
            this.createChart(data);
            return;
        }

        this.processPieData(data, false);

        this.updateSlices();

        this.updateLabels();

    }

    private updateSlices() {
        this.slices = this.slices.data(this.pieData);
        this.slices.transition().duration(750).attrTween('d', this.arcTween);
    }

    private updateLabels() {
        this.totalLabel.text('Cases: ' + this.numberWithCommas(this.total));
        this.labels.data(this.pieData);
        this.labels.each((datum, index, n) => {
            d3.select(n[index]).text(this.numberWithCommas(this.labelValueFn(this.rawData[index])));
        });
        this.labels.transition().duration(750).attrTween('transform', this.labelTween);
    }

    private updateTotal() {
        this.totalLabel.text('Cases: ' + this.numberWithCommas(this.total));
    }

    private removeExistingChartFromParent() {
        // !!!!Caution!!!
        // Make sure not to do;
        //     d3.select('svg').remove();
        // That will clear all other SVG elements in the DOM
        d3.select(this.hostElement).select('svg').remove();
    }

    private addLabelsToTheDonut() {
        this.labels = this.g
            .selectAll('allLabels')
            .data(this.pieData)
            .enter()
            .append('text')
            .text(this.labelValueGetter)
            .attr('transform', (datum, index) => {
                return 'translate(' + this.arc.centroid(datum) + ')';
            })
            .style('font-size', '8px')
            .style('text-anchor', 'middle');

    }

    private labelValueGetter = (datum, index) => {
        return this.numberWithCommas(this.labelValueFn(this.rawData[index]));
    }

    private labelValueFn(val) {
        const pct = Math.floor(val * 100 / this.total);
        return (pct < 4) ? '' : '' + val;
    }

    private numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
