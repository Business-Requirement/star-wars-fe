# About this

This component is a wrapper over Swiper js library to easy use in React app

# How to use

1. Install Swiper library using bellow npm command

   ```
   npm install swiper
   npm install @types/swiper
   ```

2. Copy source code  
   Copy this hold folder to your source folder. Or you can copy only `Swiper.tsx` and `Swiper.scss` files.

3. Component Props

   - `options`: Optional - `SwiperOptions` (read more at: https://swiperjs.com/api/#parameters)
   - `swiperRef`: Optional - `React.MutableRefObject<Swiper | undefined>` swiper instance setter function, usually use with `const swiper = useRef<Swiper>()`
   - `className`: Optional - `string`;

4. Notice
   - Each Swiper component come with style files itself so in case you need to use these component you need to import this in `Swiper.scss` file.
   - `SwiperSliderMemo` wrapper with React.memo only re-redner incase `options` change or `child count` change.

# Example

Example use of Coverflow effect can be find in test folder

# References

- https://swiperjs.com/api
- https://swiperjs.com/get-started/
