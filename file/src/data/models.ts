import { Model } from './models';
import modelImage150 from '../assets/model-1.50.png';
import modelImage100 from '../assets/model-1.00.png';
import modelImage700 from '../assets/model-7.00.png';
import modelImage600 from '../assets/model-6.00.png';
import modelImage400 from '../assets/model-4.00.png';
import modelImage500 from '../assets/model-5.00.png';
import modelImage200 from '../assets/model-2.00.png';

export const models: Model[] = [
  {
    id: '1',
    title: 'User Model',
    description: 'Custom 3D model submission.',
    price: 1.50,
    image: modelImage150
  },
  {
    id: '2',
    title: 'New Model',
    description: 'Custom 3D model submission.',
    price: 1.00,
    image: modelImage100
  },
  {
    id: '3',
    title: 'New Model',
    description: 'Custom 3D model submission.',
    price: 7.00,
    image: modelImage700
  },
  {
    id: '4',
    title: 'New Model',
    description: 'Custom 3D model submission.',
    price: 6.00,
    image: modelImage600
  },
  {
    id: '5',
    title: 'New Model',
    description: 'Custom 3D model submission.',
    price: 4.00,
    image: modelImage400
  },
  {
    id: '6',
    title: 'New Model',
    description: 'Custom 3D model submission.',
    price: 5.00,
    image: modelImage500
  },
  {
    id: '7',
    title: 'New Model',
    description: 'Custom 3D model submission.',
    price: 2.00,
    image: modelImage200
  }
];
