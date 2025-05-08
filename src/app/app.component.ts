import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public data: any[] = [];
  public fullList: any[] = [];
  public loading = false;
  public recordCount = 1;
  public loadedCount = 0;
  public patchValues = true;

  public form: FormGroup = new FormGroup({
    multiSelect1: new FormControl([]),
    multiSelect2: new FormControl([]),
    multiSelect3: new FormControl([]),
    multiSelect4: new FormControl([]),
    multiSelect5: new FormControl([]),
    multiSelect6: new FormControl([]),
  });

  ngOnInit(): void {
    this.fullList = Array.from({ length: 10000 }, (_, i) => ({
      text: `Item ${i + 1}`,
      value: i + 1
    }));
    this.loadDropdowns();
  }

  public loadDropdowns(): void {
    this.loading = true;
    this.form.reset();

    setTimeout(() => {
      this.loadedCount = Math.min(this.recordCount, this.fullList.length);
      this.data = this.fullList.slice(0, this.loadedCount);

      if (this.patchValues) {
        const allValues = this.data.map(item => item.value);
        for (let i = 1; i <= 6; i++) {
          this.form.get(`multiSelect${i}`)?.patchValue(allValues);
        }
      }

      this.loading = false;
    }, 200);
  }

  public onFilterChange(query: string): void {
    this.loading = true;
    setTimeout(() => {
      const filtered = this.fullList.filter(item =>
        item.text.toLowerCase().includes(query.toLowerCase())
      );
      this.data = filtered;
      this.loading = false;
    }, 300);
  }
}