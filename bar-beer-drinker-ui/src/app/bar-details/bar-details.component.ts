import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, BarMenuItem } from '../bars.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { HtmlAstPath } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';



@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barName: string;
  barDetails: Bar;
  menu: BarMenuItem[];

  filterOptions: SelectItem[] =[
    {
      'label': 'Lowest price',
      'value': 'low price'
    },
    {
      'label': 'Highest price',
      'value': 'high price'
    }
  ];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) { 
    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');

      barService.getMenu(this.barName).subscribe(
        data => {
          this.menu = data;
        }
      );
      barService.getBar(this.barName).subscribe(
        data => {
          this.barDetails = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) { 
            alert ('Bar not found');
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occurred on the server.')
          }
        }
      );
    });
  }


  sortBy(selectedOption: string) {
    if (selectedOption === 'low price') {
      this.menu.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (selectedOption === 'high price') {
      this.menu.sort((a, b) => {
        return b.price - a.price;
      });
    }
  }

  ngOnInit() {
  }

}
