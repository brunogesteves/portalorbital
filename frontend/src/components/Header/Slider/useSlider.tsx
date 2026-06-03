import { api } from '@/utils/api';
import { PostProps } from '@/utils/types';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';


interface ArrowProps {
  onClick?: () => void;
}


export function useSlider() {
  const [Slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    async function getSlides() {
     try {
         await api.get('/posts/all').then((res) => { 
        setSlides(res.data)
      });
     } catch (error) {
        
     }
    }
    getSlides();
  }, []);

    const typedSlides = Slides as unknown as PostProps[];


  const NextArrow = (props: ArrowProps)=> {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors px-2 flex items-center justify-center z-10 cursor-pointer"
        aria-label="Próximo"
      >
        <FiChevronRight size={48} />
      </button>
    );
  };
  
  const PrevArrow = (props: ArrowProps) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors px-2 flex items-center justify-center z-10 cursor-pointer"
        aria-label="Anterior"
      >
        <FiChevronLeft size={48} />
      </button>
    );
  };
  
  const MobileNextArrow = (props: ArrowProps) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer z-10 hover:bg-white/40 transition-colors"
        aria-label="Próximo Slide"
      >
        <FiChevronRight className="text-sm" />
      </button>
    );
  };
  
  const MobilePrevArrow = (props: ArrowProps) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer z-10 hover:bg-white/40 transition-colors"
        aria-label="Slide Anterior"
      >
        <FiChevronLeft className="text-sm" />
      </button>
    );
  };


  const settings = {
    dots: true,
    infinite: typedSlides.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: typedSlides.length > 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const mobileSettings = {
    dots: true,
    infinite: typedSlides.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: typedSlides.length > 1,
    nextArrow: <MobileNextArrow />,
    prevArrow: <MobilePrevArrow />,
  };

  return {
    data: {
      Slides,
      settings,
      mobileSettings,
      typedSlides
    },
  };
}
