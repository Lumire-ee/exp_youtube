import { CircleUserRound, House, UserPlus } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Aside() {
  const [activeButton, setActiveButton] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'myPage') {
      navigate('/my-page');
    } else if (button === 'home') {
      navigate('/');
    } else if (button === 'subscribe') {
      navigate('/subscriptions'); // ?
    }
  };

  return (
    <aside className="sticky top-16 z-40 flex h-[calc(100vh-4rem)] w-20 flex-col items-center space-y-3 py-2">
      <button
        onClick={() => handleButtonClick('home')}
        className={`flex size-14 flex-col items-center justify-center rounded-lg hover:bg-grayLightest`}
      >
        <House
          size={24}
          className={`${
            activeButton === 'home' ? 'text-black' : 'text-grayDark'
          }`}
        />
        <span
          className={`mt-1 text-xSmall font-bold ${
            activeButton === 'home' ? 'text-black' : 'text-grayDark'
          }`}
        >
          홈
        </span>
      </button>

      <button
        onClick={() => handleButtonClick('subscribe')}
        className={`flex size-14 flex-col items-center justify-center rounded-lg hover:bg-grayLightest`}
      >
        <UserPlus
          size={24}
          className={`${
            activeButton === 'subscribe' ? 'text-black' : 'text-grayDark'
          }`}
        />
        <span
          className={`mt-1 text-xSmall font-bold ${
            activeButton === 'subscribe' ? 'text-black' : 'text-grayDark'
          }`}
        >
          구독
        </span>
      </button>

      <button
        onClick={() => handleButtonClick('myPage')}
        className={`flex size-14 flex-col items-center justify-center rounded-lg hover:bg-grayLightest`}
      >
        <CircleUserRound
          size={24}
          className={`${
            activeButton === 'myPage' ? 'text-black' : 'text-grayDark'
          }`}
        />

        <span
          className={`mt-1 text-xSmall font-bold ${
            activeButton === 'myPage' ? 'text-black' : 'text-grayDark'
          }`}
        >
          내 페이지
        </span>
      </button>
    </aside>
  );
}

export default Aside;
