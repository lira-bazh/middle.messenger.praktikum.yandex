import { store } from '@/shared/framework';
import { changeProfileAvatar } from '@/shared/api';

export const changeUserAvatar = (file: File): void => {
  changeProfileAvatar<string>(file)
    .then(data => {
      store.dispatch({
        type: 'CHANGE_PROFILE_IMG',
        data,
      });
    })
    .catch(error => console.error(error));
};
