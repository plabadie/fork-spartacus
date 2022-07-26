import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-ticket-details',
  templateUrl: './customer-ticket-details.component.html',
})
export class CustomerTicketDetailsComponent implements OnInit {
  constructor(protected translation: TranslationService) {}

  ticketDetails$ = of({
    associatedTo: {
      code: '00000001',
      modifiedAt: '2022-06-28T00:00:00+0000',
      type: 'Cart',
    },
    availableStatusTransitions: [
      {
        id: 'CLOSED',
        name: 'Closed',
      },
    ],
    createdAt: '2022-06-22T14:37:15+0000',
    id: '00000001',
    modifiedAt: '2022-06-22T20:25:02+0000',
    status: {
      id: 'OPEN',
      name: 'Open',
    },
    subject: 'test ticket again',
    ticketCategory: {
      id: 'COMPLAINT',
      name: 'Complaint',
    },
    ticketEvents: [
      {
        author: 'Mark Rivers',
        createdAt: '2022-06-22T20:25:02+0000',
        message: 'This is the way',
      },
      {
        author: 'Mark Rivers',
        createdAt: '2022-06-22T14:37:15+0000',
        message: 'A message to consider',
      },
    ],
  });

  ngOnInit(): void {}

  prepareCardContent(
    entity: string,
    titleTranslation: string
  ): Observable<Card> {
    return this.translation.translate(titleTranslation).pipe(
      filter(() => Boolean(entity)),
      map((textTitle) => ({
        title: textTitle,
        text: [entity],
        textColor: this.getStatusColor(entity),
      }))
    );
  }

  getStatusColor(status: string): string {
    return status === 'Open' ? '#38871F' : status === 'Close' ? '#6C7079' : '';
  }
}