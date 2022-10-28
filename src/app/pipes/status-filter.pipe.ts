import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {



  transform(items: any[], currentStatusId?: any) {

    if (!items) {
      return [];
    }

    if (!currentStatusId) {
      return items;
    }

    return items.filter((data) => {
      return data.status.id === currentStatusId;
    })

  }
}
