import { AppConfig } from '@app/config';

export class ORDER_ROUTES {
  static TAGS = 'Order APIs';
  static _PREFIX = 'orders';
  // supporter
  static GeneratePath(path: string = undefined) {
    let destinationPath = `${AppConfig.apiConfig.prefix}${ORDER_ROUTES._PREFIX}`;
    if (path) {
      destinationPath += `/${path}`;
    }
    return destinationPath;
  }
  //
  static GET_ALL = this.GeneratePath();
  static DETAIL = this.GeneratePath(':id/detail');
  static CREATE = this.GeneratePath('create');
  static CANCEL = this.GeneratePath(':id/cancel');
  static CHECK_STATUS = this.GeneratePath(':id/check-status');
}
