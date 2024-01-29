import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  @ViewChild('paragraphOne') paragraphOne!: ElementRef;
  @ViewChild('paragraphTwo') paragraphTwo!: ElementRef;
  @ViewChild('paragraphThree') paragraphThree!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
    }
  ) {}

  ngOnInit(): void {
    // Using button
    // this.route.params.subscribe((params) => {
    //   const sectionId = params['section'];
    //   if (sectionId) {
    //     this.scrollToSection(sectionId);
    //   }
    // });

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        // Handle the fragment as needed
        console.log(`Fragment changed: ${fragment}`);
      }
    });
  }

  // Using button
  // scrollToSection(sectionId: string): void {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //       inline: 'nearest',
  //     });
  //   }
  // }

  scrollToParagraph(paragraphId: string): void {
    let targetParagraph: HTMLElement;
    switch (paragraphId) {
      case 'paragraphOne':
        targetParagraph = this.paragraphOne.nativeElement;
        break;
      case 'paragraphTwo':
        targetParagraph = this.paragraphTwo.nativeElement;
        break;
      case 'paragraphThree':
        targetParagraph = this.paragraphThree.nativeElement;
        break;
      default:
        return;
    }

    targetParagraph.scrollIntoView({ behavior: 'smooth' });
  }

  dialogClose() {
    this.dialogRef.close();
  }
}
