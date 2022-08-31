import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WindowRef } from '@spartacus/core';
import { ICON_TYPE } from 'projects/storefrontlib/cms-components';
import { FilesFormValidators } from 'projects/storefrontlib/shared/services';
import { Observable } from 'rxjs';
import { MessageEvent, MessagingConfigs } from './messaging.model';

@Component({
  selector: 'cx-messaging',
  templateUrl: './messaging.component.html',
})
export class MessagingComponent implements OnInit, AfterViewInit {
  @Input() messageEvents$: Observable<Array<MessageEvent>>;
  @Input() scrollToInput?: boolean = true;
  @Input() messagingConfigs?: MessagingConfigs;

  @Output()
  send = new EventEmitter<{ files: FileList | undefined; message: string }>();

  iconTypes = ICON_TYPE;
  form: FormGroup;

  MAX_INPUT_CHARACTERS: number = 2000;
  MAX_SIZE: number = 10;
  MAX_ENTRIES: number = 1;
  dateFormat: string = 'MMMM d, YYYY h:mm aa';

  get inputCharacterLeft(): number {
    return (
      (this.messagingConfigs?.charactersLimit || this.MAX_INPUT_CHARACTERS) -
      this.form.get('message')?.value.length
    );
  }

  get maxSize(): number {
    return (
      this.messagingConfigs?.attachmentRestrictions?.maxSize || this.MAX_SIZE
    );
  }

  get maxEntries(): number {
    return (
      this.messagingConfigs?.attachmentRestrictions?.maxEntries ||
      this.MAX_ENTRIES
    );
  }

  constructor(
    protected windowRef: WindowRef,
    protected filesFormValidators: FilesFormValidators
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    if (this.scrollToInput) {
      const element = this.windowRef.document.getElementById('cx-messages');
      element?.scroll({
        top: element?.scrollHeight,
        behavior: 'auto',
      });
      setTimeout(() => {
        this.windowRef.document
          .getElementById('cx-message-footer')
          ?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 500);
    }
  }

  onSend() {
    if (this.form.valid) {
      this.send.emit({
        files: this.form.get('file')?.value,
        message: this.form.get('message')?.value,
      });
    }
  }

  protected buildForm() {
    const form = new FormGroup({});
    form.setControl(
      'message',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(
          this.messagingConfigs?.charactersLimit || this.MAX_INPUT_CHARACTERS
        ),
      ])
    );
    form.setControl(
      'file',
      new FormControl('', [
        this.filesFormValidators.maxSize(this.maxSize),
        this.filesFormValidators.maxEntries(this.maxEntries),
      ])
    );
    this.form = form;
  }

  focusNextChild(event: UIEvent): void {
    event.preventDefault();

    const [results, focusedIndex] = [
      this.getResultElements(),
      this.getFocusedIndex(),
    ];

    if (results.length) {
      if (focusedIndex >= results.length - 1) {
        results[0].focus();
      } else {
        results[focusedIndex + 1].focus();
      }
    }
  }

  focusPreviousChild(event: UIEvent): void {
    event.preventDefault();

    const [results, focusedIndex] = [
      this.getResultElements(),
      this.getFocusedIndex(),
    ];

    if (results.length) {
      if (focusedIndex < 1) {
        results[results.length - 1].focus();
      } else {
        results[focusedIndex - 1].focus();
      }
    }
  }

  private getResultElements(): HTMLElement[] {
    return Array.from(
      this.windowRef.document.querySelectorAll('.cx-message-card > div > div')
    );
  }

  private getFocusedIndex(): number {
    return this.getResultElements().indexOf(this.getFocusedElement());
  }

  private getFocusedElement(): HTMLElement {
    return <HTMLElement>this.windowRef.document.activeElement;
  }
}