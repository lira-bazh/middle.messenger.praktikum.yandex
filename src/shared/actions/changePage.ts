import { Router } from '@/shared/framework';
import { ROOT_TAG } from '@/constants';
import { EPages } from '@/types';

export const changePage = (page: EPages): void => {
  const router = new Router(ROOT_TAG);
  router.go(page);
};