/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '700px',
      md: '1098px',
      lg: '1425px',
      xl: '1750px',
      '2xl': '2077px',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif'],
      },
      fontSize: {
        tiny: '8px',
        xSmall: '10px',
        small: '12px',
        medium: '14px',
        large: '17px',
        xLarge: '20px',
        xxLarge: '24px',
      },
      colors: {
        black: '#000000',
        red: '#FF0000', // 강조(구독 버튼)
        grayDark: '#606060', // 일반 텍스트
        bluePrimary: '#3366cc', // 기본 링크
        lightBlue: '#E8F0FE', // 호버 효과
        grayLight: '#f0f0f0',
        grayLighter: '#e5e5e5',
        grayLightest: '#f2f2f2',
        darkGray: '#282828', // 텍스트 강조
        blueDeep: '#085ed4', // 추가 강조 (링크)
        green: '#34A853', // 성공 메시지, 확인 알림
      },
      borderRadius: {
        small: '4px',
        medium: '8px',
        large: '12px',
      },
    },
  },
  plugins: [],
};
