import { IconBuildingWarehouse } from '@tabler/icons-react';
import { ThemeToggleBtn } from './ThemeToggleBtn';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn'
import useAppStore from '../store/mainStore';
const NavBar: React.FC = () => {
  const {isLoggedIn} = useAppStore();
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800 h-[10%]">
      <div className="flex items-center gap-2">
        <IconBuildingWarehouse stroke={3} />
        <h1 className="text-base font-bold md:text-2xl">Eventory</h1>
      </div>
      <div className='flex items-center gap-2'>
        <ThemeToggleBtn/>
        {
            !isLoggedIn ? <LoginBtn/> : <LogoutBtn/>
        }
      </div>

    </nav>
  );
};

export default NavBar;