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
  static GET_ALL = ORDER_ROUTES.GeneratePath();
  static DETAIL = ORDER_ROUTES.GeneratePath(':id/detail');
  static CREATE = ORDER_ROUTES.GeneratePath('create');
  static CANCEL = ORDER_ROUTES.GeneratePath(':id/cancel');
  static CHECK_STATUS = ORDER_ROUTES.GeneratePath(':id/check-status');
}
