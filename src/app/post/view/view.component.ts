import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
// import { DialogService } from '../service/dialog.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent implements OnInit {
  query_params_subscriber$ = new Subscription();

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.query_params_subscriber$ = this.route.queryParams.subscribe(
      (params) => {
        if (params['feedback'] === '1') {
          this.openDialog();
        }
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      // height: '400px',
      width: '800px',
      data: {
        title: 'Show Dialog',
        scrollToSection: 'paragraphTwo',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy(): void {
    this.query_params_subscriber$.unsubscribe();
  }
}
