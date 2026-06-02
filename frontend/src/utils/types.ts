export interface SliderProps {
  device: "desktop" | "mobile";
}


export interface CategoryProps {
  id: string;
  name: string;

}


export interface PostProps {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
}