import { Model } from 'src/models/Model';
import { Settings } from 'src/@types';

export class SettingsModel extends Model {
  static tableName = 'user_settings';
  static context: SettingsModel;

  public static getByUserId(user_id: number) {
    return this.findOneBy<
      {
        user_id: number;
      },
      Settings
    >({ user_id });
  }
}
