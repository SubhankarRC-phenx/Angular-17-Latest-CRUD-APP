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
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  value = 'Clear me';
  @ViewChild('paragraphOne') paragraphOne!: ElementRef;
  @ViewChild('paragraphTwo') paragraphTwo!: ElementRef;
  @ViewChild('paragraphThree') paragraphThree!: ElementRef;

  fname: string = '';
  father_fname: string = '';

  newEmployeeForm = new FormGroup({
    full_name: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*'),
    ]),
    father_name: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*'),
    ]),
    alias_name: new FormControl(''),
  });

  constructor(
    private activate_route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
    }
  ) {}

  ngOnInit(): void {
    // Using button
    this.activate_route.params.subscribe((params) => {
      const sectionId = params['section'];
      if (sectionId) {
        this.scrollToSection(sectionId);
      }
    });

    this.activate_route.fragment.subscribe((fragment) => {
      if (fragment) {
        // Handle the fragment as needed
        console.log(`Fragment changed: ${fragment}`);
      }
    });
  }

  // Using button
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  createAlias(): void {
    const emp_name = this.newEmployeeForm.controls.full_name.value
      ? this.newEmployeeForm.controls.full_name.value
      : '';
    let full_name: string[] = emp_name.trim().split(' ');
    if (
      full_name[0].toLowerCase().includes('mr') ||
      full_name[0].toLowerCase().includes('ms') ||
      full_name[0].toLowerCase().includes('md')
    ) {
      if (full_name[0].length <= 4) {
        if (full_name.length >= 2) this.fname = full_name[1];
      } else this.fname = full_name[0];
    } else {
      this.fname = full_name[0];
    }

    var father_name = [];
    if (this.newEmployeeForm.controls.father_name.value) {
      const emp_father_name = this.newEmployeeForm.controls.father_name.value
        ? this.newEmployeeForm.controls.father_name.value
        : '';
      father_name = emp_father_name.trim().split(' ');
      if (
        father_name[0].toLowerCase().includes('mr') ||
        father_name[0].toLowerCase().includes('ms') ||
        father_name[0].toLowerCase().includes('late') ||
        father_name[0].toLowerCase().includes('md')
      ) {
        if (father_name[0].length <= 4) {
          if (father_name.length >= 2) this.father_fname = father_name[1];
        } else this.father_fname = father_name[0];
      } else {
        this.father_fname = father_name[0];
      }
    }

    this.newEmployeeForm.patchValue({
      alias_name:
        this.fname +
        '-' +
        this.father_fname +
        '-' +
        full_name[full_name.length - 1],
    });
    // console.log(name, this.newEmployeeForm.get('father_name').value)
  }

  // scrollToParagraph(paragraphId: string): void {
  //   let targetParagraph: HTMLElement;
  //   switch (paragraphId) {
  //     case 'paragraphOne':
  //       targetParagraph = this.paragraphOne.nativeElement;
  //       break;
  //     case 'paragraphTwo':
  //       targetParagraph = this.paragraphTwo.nativeElement;
  //       break;
  //     case 'paragraphThree':
  //       targetParagraph = this.paragraphThree.nativeElement;
  //       break;
  //     default:
  //       return;
  //   }

  //   targetParagraph.scrollIntoView({ behavior: 'smooth' });
  // }

  onNewEmployeeSubmit() {}

  dialogClose() {
    this.dialogRef.close();
  }
}
