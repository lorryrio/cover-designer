import xiandaiyanqing from './configs/xiandaiyanqing';
import gudaiyanqing from './configs/gudaiyanqing';
import dushi from './configs/dushi';
import xuanhuan from './configs/xuanhuan';
import nanpin from './configs/nanpin';
import nvpin from './configs/nvpin';

// 书封配置
const config = [
  // 现代言情 id-13
  xiandaiyanqing,
  // 古代言情 id-17
  gudaiyanqing,
  // 都市  id-5
  dushi,
  // 玄幻  id-3
  xuanhuan,
  // 男频其他 id-1111
  nanpin,
  // 女频其他 id-2222
  nvpin,
];

// 滤镜列表
const filter = [
  'origin',
  '_1977',
  'aden',
  'amaro',
  'brannan',
  'brooklyn',
  'clarendon',
  'gingham',
  'hudson',
  'inkwell',
  'kelvin',
  'lark',
  'lofi',
  'mayfair',
  'moon',
  'nashville',
  'perpetua',
  'reyes',
  'rise',
  'slumber',
  'stinson',
  'toaster',
  'valencia',
  'walden',
  'willow',
  'xpro2',
];

const baseUrl = 'https://29397479-1732053286884989.test.functioncompute.com';

export { config, filter, baseUrl };
