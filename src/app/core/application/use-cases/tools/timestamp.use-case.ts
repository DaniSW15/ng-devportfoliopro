import { inject, Injectable } from '@angular/core';
import { IToolsRepository } from '@core/domain/repositories/tools.repositories.interface';
import {
  TimestampCurrentResponse,
  TimestampToDateRequest,
  TimestampToDateResponse,
  DateToTimestampRequest,
  DateToTimestampResponse
} from '@core/interfaces/tools.interface';

@Injectable({
  providedIn: 'root',
})
export class TimestampUseCase {
  private readonly repository = inject(IToolsRepository);

  getCurrent(): Promise<TimestampCurrentResponse> {
    return this.repository.getCurrentTimestamp();
  }

  toDate(request: TimestampToDateRequest): Promise<TimestampToDateResponse> {
    return this.repository.convertTimestampToDate(request);
  }

  toTimestamp(request: DateToTimestampRequest): Promise<DateToTimestampResponse> {
    return this.repository.convertDateToTimestamp(request);
  }
}
