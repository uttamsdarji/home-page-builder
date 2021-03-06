import photoBlogImage from './assets/photoBlogImage.png';
import coverImage from './assets/coverImage.png';
import photo1 from './assets/photo1.png';
import photo2 from './assets/photo2.png';
import photo3 from './assets/photo3.png';
import photo4 from './assets/photo4.png';
import photo5 from './assets/photo5.png';
import photo6 from './assets/photo6.png';
import photo7 from './assets/photo7.png';
import photo8 from './assets/photo8.png';
import photo9 from './assets/photo9.png';
import userImage from './assets/userImage.png'
import PhotoBlog from './PhotoBlog';

export const photoBlogBasicData = {
  id: 'photoBlog',
  name: 'Photo Blog',
  description: 'A striking and impactful free one-page photography website template. If you would like to distinguish yourself from the masses, you better take a peek at this remarkable template',
  thumbnail: photoBlogImage,
  component: PhotoBlog
}

export const photoBlogDetailData = {
  id: 'photoBlog',
  name: 'Photo Blog',
  photos: {
    coverImage: {image: coverImage, file: null},
    userImage: {image: userImage, file: null},
    otherPhotos: [
      {image: photo1, file: null},
      {image: photo2, file: null},
      {image: photo3, file: null},
      {image: photo4, file: null},
      {image: photo5, file: null},
      {image: photo6, file: null},
      {image: photo7, file: null},
      {image: photo8, file: null},
      {image: photo9, file: null}
    ]
  },
  textFields: {
    navBrand: 'Your Name',
    welcomeTitle: 'Welcome',
    welcomeText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore animi accusantium voluptatum saepe. Natus nihil, facere corporis numquam, architecto dolorum.',
    bioTitle: "Hi I'm Jed",
    bioDetails: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor aperiam a velit. Harum eligendi quod reiciendis quos ullam libero est dolor, corporis dolores assumenda, delectus, quidem voluptatibus dolorum temporibus enim!"
  }
}